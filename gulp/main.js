/**
 * Created by dachao.chen on 7/17/2016.
 */
'use strict';

var gulp = require('gulp');
var path = require('path');
var es = require('event-stream');
var merge2 = require('merge2');
var inspect  = require('util').inspect;
var bs = require('browser-sync').create('bs');
var runSequence = require('run-sequence');
var gulpLoadPlugins = require('gulp-load-plugins');

var $ = gulpLoadPlugins(),
    conf = require ('./conf'),
    config = require('./config')(),
    active = bs.active,
    reload = bs.reload;

function isFixed(file) {
    // Has ESLint fixed the file contents?
    return file.eslint && file.eslint.fixed;
}

// tasks
var task1 = require('./tasks/task1');
var task2 = require('./tasks/task2');
var task3 = require('./tasks/task3');
var replacePipe = require('./tasks/replace');

var browserSyncInit = require('./tasks/browserSync');
var browserSyncReloadPipe = require('./tasks/browserSyncReload');

var zipPipe = require('./tasks/zip');
var buildPipe = require('./tasks/build');
var cacheClearPipe = require('./tasks/cacheClear');
var cacheTemplatesPipe = require('./tasks/cacheTemplates');
var cleanPipe = require('./tasks/clean');
var otherPipe = require('./tasks/other');
var fontsPipe = require('./tasks/fonts');
var CSSCombPipe = require('./tasks/CSSComb');
var defaultPipe = require('./tasks/default');
var deletePipe = require('./tasks/delete');
var deleteOnEndPipe = require('./tasks/deleteOnEnd');
var lint = require('./tasks/eslint');
var greetingsPipe = require('./tasks/greetings');
var imageminPipe = require('./tasks/imagemin');
var injectCSSPipe = require('./tasks/injectCSS');
var injectJSPipe = require('./tasks/injectJS');
var lintCSSPipe = require('./tasks/lintCSS');
var lintHTMLPipe = require('./tasks/lintHTML');
var lintJSPipe = require('./tasks/lintJS');
var logPathPipe = require('./tasks/logPath');
var miniBowerCSSPipe = require('./tasks/miniBowerCSS');
var miniBowerJSPipe = require('./tasks/miniBowerJS');
var miniCSSPipe = require('./tasks/miniCSS');
var miniHTMLPipe = require('./tasks/miniHTML');
var miniJSPipe = require('./tasks/miniJS');
var openReportPlatoPipe = require('./tasks/openReportPlato');
var pageresPipe = require('./tasks/pageres');
var platoPipe = require('./tasks/plato');
var printPipe = require('./tasks/print');
var revCollectorPipe = require('./tasks/revCollector');
var revCollectorCSSPipe = require('./tasks/revCollectorCSS');
var revCollectorUyesPipe = require('./tasks/revCollectorUyes');
var revCSSPipe = require('./tasks/revCSS');
var revFontPipe = require('./tasks/revFont');
var revImgPipe = require('./tasks/revImg');
var revJSPipe = require('./tasks/revJS');
var sassPipe = require('./tasks/sass');
var runTestPipe = require('./tasks/runTest');
var userefPipe = require('./tasks/useref');
var wiredepPipe = require('./tasks/wiredep');
var htmlPipe = require('./tasks/html');
var injectPipe = require('./tasks/inject');


// path.join(conf.paths.src, '/*.html'
// gulp.start('build');
// console.log(gulp.start)
// console.log(path.join('app', '/html/**/*.html'))

// done
gulp.task('fonts', fontsPipe);
// done
gulp.task('zip', zipPipe);

gulp.task('inject:css', injectCSSPipe);
gulp.task('inject:js', injectJSPipe);

gulp.task('sass', sassPipe);

gulp.task('eslint', function () {
    
    var index = path.join(conf.paths.src, "index.js");
    var jsSource = path.join(conf.paths.src, "js/**/*.js");

    return gulp.src([index, jsSource], {base: './app'})
        .pipe(lint())
        .pipe($.if(isFixed, gulp.dest(conf.paths.tmp)));   // TODO: change to original source
});

gulp.task('browsersync-reload', browserSyncReloadPipe);

gulp.task('html', htmlPipe);

gulp.task('inject', injectPipe);

gulp.task('wiredep', wiredepPipe);

gulp.task('wireall', function (done) {
    runSequence('wiredep', 'inject:js', 'inject:css', done);
});

// in progress
gulp.task('imagemin', imageminPipe);

gulp.task('watch', ['sass'], function () {
    gulp.watch([
        path.join(conf.paths.src, 'html/**/*.html'),
        path.join(conf.paths.src, 'index.html'),
        path.join(conf.paths.src, 'css/**/*.css'),
        path.join(conf.paths.src, 'js/**/*.js'),
        path.join(conf.paths.src, 'app.js'),
        path.join(conf.paths.src, 'img/**/*.+(png|jpg|gif|svg)'),
        path.join(conf.paths.src, 'fonts/**/*.+(eot|svg|ttf|woff|woff2|otf)')
    ]).on('change', function (event) {
        // event.type = 'changed', 'deleted', 'added'
        reload(event.path);
    });
    
    gulp.watch(path.join(conf.paths.src, 'scss/**/*.+(scss|sass)'), ['sass']);
    gulp.watch([
        path.join(conf.paths.src, 'js/**/*.js'),
        path.join(conf.paths.src, 'app.js')
    ], function (event) {
        if (event.type === 'changed') {
            lint(event.path);
        }
    });
    // gulp.watch(path.join(conf.paths.src, 'fonts/**/*.+(eot|svg|ttf|woff|woff2|otf)'), function (event) {
    //     gulp.start('fonts');
    // });
    
    // detect install or uninstall dependencies changes from bower, and change relate task
    gulp.watch('bower.json', ['wiredep', 'fonts']);
});

// done
gulp.task('serve', ['watch'], function () {
    browserSyncInit([path.join(conf.paths.tmp + '/serve'), conf.paths.src]);
});

gulp.task('serve:dist', ['build'], function () {
    browserSyncInit(conf.paths.dist);
});

gulp.task('serve:e2e', ['inject'], function () {
    browserSyncInit([path.join(conf.paths.tmp + '/serve'), conf.paths.src], []);
});

gulp.task('serve:e2e-dist', ['build'], function () {
    browserSyncInit(conf.paths.dist, []);
});

gulp.task('lint:css', lintCSSPipe);
gulp.task('csscomb', CSSCombPipe);
gulp.task('lint:html', lintHTMLPipe);
gulp.task('lint:js', lintJSPipe);

gulp.task('log:path', logPathPipe);

gulp.task('mini:bower:css', miniBowerCSSPipe);
gulp.task('mini:bower:js', miniBowerJSPipe);
gulp.task('mini:css', miniCSSPipe);
gulp.task('mini:html', miniHTMLPipe);
gulp.task('mini:js', miniJSPipe);

gulp.task('open:report:plato', openReportPlatoPipe);
gulp.task('pageres', pageresPipe);
gulp.task('plato', platoPipe);

gulp.task('print', printPipe);

gulp.task('tests:ut', function (done) {
    runTestPipe(true, done);
});

gulp.task('tests:ut:auto', function (done) {
    runTestPipe(false, done);
});

gulp.task('build', buildPipe);
gulp.task('cache:clear', cacheClearPipe);
gulp.task('cache:templates', cacheTemplatesPipe);
gulp.task('clean', cleanPipe);

gulp.task('default',defaultPipe);
gulp.task('delete', deletePipe);
gulp.task('delete:end', deleteOnEndPipe);


// task test
gulp.task('other', otherPipe);
gulp.task('greetings', greetingsPipe);
gulp.task('task1', task1);
gulp.task('task2', task2);
gulp.task('task3', task3);
gulp.task('replace', replacePipe);

// TODO: make them work
gulp.task('rev:collector', revCollectorPipe);
gulp.task('rev:collector:css', revCollectorCSSPipe);
gulp.task('rev:collector:uyes', revCollectorUyesPipe);
gulp.task('rev:css', revCSSPipe);
gulp.task('rev:font', revFontPipe);
gulp.task('rev:img', revImgPipe);
gulp.task('rev:js', revJSPipe);
gulp.task('useref', userefPipe);

