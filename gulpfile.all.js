/**
 * Created by dachao.chen on 5/4/2016.
 */

// separate later

require('shelljs/global');

var gulp = require('gulp'),
    fs = require('fs'),
    gulpIgnore = require('gulp-ignore'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    useref = require('gulp-useref'),
    gulpif = require('gulp-if'),
    sourcemaps = require('gulp-sourcemaps'),
    rev = require('gulp-rev'),
    browserSync = require('browser-sync'),
    lazypipe = require('lazypipe'),
    header = require('gulp-header'),
    less = require('gulp-less'),
    sass = require('gulp-sass'),
    babel = require('gulp-babel'),
    jshint = require('gulp-jshint'),
    cleanCss = require('gulp-clean-css'),
    minifyHtml = require('gulp-minify-html');

// Get version using NodeJs file system
var getVersion = function () {
    return fs.readFileSync('Version');
};

// Get copyright using NodeJs file system
var getCopyRight = function () {
    return fs.readFileSync('CopyRight');
};

/**
 * Run this task with `gulp` directly
 */
gulp.task('default', ['watch'], function () {
    console.log('hello world default');
});

/**
 * Tasks automation, watch files changed and call relevant tasks
 */
gulp.task('watch', function () {
    gulp.watch('app/**/*', ['src']);
});

gulp.task('src', function (done) {
    console.log('gulp watch log info: app directory changed');
});

/**
 * Auto reload page, TODO:
 */
gulp.task('browser-sync', function () {
    browserSync({
        server: {
            baseDir: './'
        }
    })
});

/**
 * Compress all , TODO:
 */
gulp.task('compress', function () {
    gulp.src('app/*.js')
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(uglify()) //compress
        .pipe(rename(function (path) {
            path.extname = '.min.js';
        }))
        .pipe(rev())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('dist/dist'));
});

/**
 * Shell command, cp directory
 */
gulp.task('shell:cp', function () {
    cp('-Rf', 'app', 'toc/cp-app');
    console.log('hello world compressed');
});

/**
 * Create sourcemaps and revision
 */
gulp.task('sourcemaps:revision', function () {
    gulp.src('app/**/*.js')
        .pipe(sourcemaps.init())
        .pipe(rev())
        .pipe(concat('index.min.js'))   // concat all the files from src to index.min.js
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('dist/sourcemaps'))
});

/**
 * Parse build blocks in HTML files to replaceTask references to
 * non-optimized scripts or stylesheets with useref
 *
 * Lazy pipe
 * gulp-if conditionally handle specific types of assets
 */
gulp.task('html:optimize', function () {
    // exclude bower_components folder
    gulp.src(['app/**/*.html', '!app/bower_components/**'])
        .pipe(useref(
            { searchPath: '.tmp'},
            lazypipe().pipe(sourcemaps.init, { loadMaps: true})
        ))
        .pipe(gulpif('*.js', uglify()))
        .pipe(gulpif('*.css', cleanCss()))
        .pipe(sourcemaps.write('maps'))
        .pipe(gulp.dest('dist/html/optimize'));
});

/**
 * HTML Minification
 */
gulp.task('html:minify', function () {
    gulp.src('app/**/*.html')
        .pipe(gulpIgnore.exclude('*/bower_components/*'))
        .pipe(minifyHtml())
        .pipe(gulp.dest('dist/minify/html'));
});

/**
 * CSS Minification
 */
gulp.task('css:minify', function () {
    gulp.src('app/**/*.css')
        .pipe(cleanCss())
        .pipe(gulp.dest('dist/minify/css'));
});

/**
 * JS Minification
 */
gulp.task('js:minify', function () {
    gulp.src('app/**/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('dist/minify/js'));
});

/**
 * Concat
 */
gulp.task('js:concat', function () {
    gulp.src('app/**/*.js')
    // .pipe(uglify()) //compress
        .pipe(concat('index.min.js'))   // concat and rename it
        .pipe(gulp.dest('dist/concat'));
});

/**
 * Minify & Rename, rename app.js to app.rename.min.js
 */
gulp.task('js:rename', function () {
    gulp.src('app/*.js')
    // .pipe(uglify()) //compress
        .pipe(rename(function (path) {
            path.extname = '.rename.min.js';
        }))
        .pipe(gulp.dest('dist/rename'));
});

/**
 * Less Compilation
 */
gulp.task('less:compile', function () {
    gulp.src('app/**/*.less')
        .pipe(less())
        .pipe(gulp.dest('dist/compile/less'));
});

/**
 * Sass Compilation
 */
gulp.task('sass:compile', function () {
    gulp.src('app/**/*.sass')
        .pipe(sass())
        .pipe(gulp.dest('dist/compile/sass'));
});

/**
 * ECMAScript 6 Compilation
 */
gulp.task('es6:compile', function () {
    gulp.src('app/**/*.es6.js')
        .pipe(babel())
        .pipe(gulp.dest('dist/compile/babel'));
});

/**
 * JavaScript Linting
 */
gulp.task('jshint', function () {
    gulp.src('app/**/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter());
});

/**
 * Add copyright
 */
gulp.task('concat:copyright', function () {
    gulp.src('app/**/*.js')
        .pipe(concat('concat-copyright.js'))
        .pipe(header(getCopyRight()))
        .pipe(gulp.dest('dist/concat/copyright'));
});

/**
 * Add copyright with version
 */
gulp.task('concat:copyright:version', function () {
    gulp.src('app/**/*.js')
        .pipe(concat('concat-copyright.js'))
        .pipe(header(getCopyRight(), {version: getVersion()}))
        .pipe(gulp.dest('dist/concat/copyright-version'));
});

/**
 * bundle all the task in automation one
 */
gulp.task('bundle', function () {
    // TODO:
});

