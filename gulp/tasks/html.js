/**
 * Created by dachao.chen on 5/31/2016.
 */
'use strict';

var gulp = require('gulp'),
    path = require('path'),
    gulpLoadPlugins = require('gulp-load-plugins');

var $ = gulpLoadPlugins({
        pattern: ['gulp-*', 'main-bower-files', 'uglify-save-license', 'del']
    }),
    conf = require('../conf');

/**
 */
module.exports = function () {
    
    var partialsInjectFile = gulp.src(path.join(conf.paths.tmp, '/partials/templateCacheHtml.js'), {read: false});
    var partialsInjectOptions = {
        starttag: '<!-- inject:partials -->',
        ignorePath: path.join(conf.paths.tmp, '/partials'),
        addRootSlash: false
    };
    
    var htmlFilter = $.filter('*.html', {restore: true});
    var jsFilter = $.filter('**/*.js', {restore: true});
    var cssFilter = $.filter('**/*.css', {restore: true});
    
    return gulp.src(path.join(conf.paths.tmp, '/serve/*.html'))
        .pipe(gulp.inject(partialsInjectFile, partialsInjectOptions))
        .pipe($.useref())
        .pipe(jsFilter)
        .pipe($.sourcemaps.init())
        .pipe($.uglify({ preserveComments: $.uglifySaveLicense })).on('error', conf.errorHandler('Uglify'))
        .pipe($.rev())
        .pipe($.sourcemaps.write('.'))
        .pipe(jsFilter.restore)
        .pipe(cssFilter)
        .pipe($.replace('../../bower_components/bootstrap-sass/assets/fonts/bootstrap/', '../fonts/'))
        .pipe($.cssnano())
        .pipe($.rev())
        // .pipe($.sourcemaps.write('maps'))
        .pipe(cssFilter.restore)
        .pipe($.revReplace())
        .pipe(htmlFilter)
        .pipe($.htmlmin({
            removeEmptyAttributes: true,
            removeAttributeQuotes: true,
            collapseBooleanAttributes: true,
            collapseWhitespace: true
        }))
        .pipe(htmlFilter.restore)
        .pipe(gulp.dest(path.join(conf.paths.dist, '/')))
        .pipe($.size({ title: path.join(conf.paths.dist, '/'), showFiles: true }));
};


