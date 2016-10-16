/**
 * Created by dachao.chen on 5/31/2016.
 */
'use strict';

var gulp = require('gulp'),
    gulpLoadPlugins = require('gulp-load-plugins');

var $ = gulpLoadPlugins(),
    config = require('../config')();

module.exports = function () {
    return gulp.src(config.styles.css.src)
        .pipe($.autoprefixer({
            browsers: config.AUTOPREFIXER_BROWSERS,
            cascade: false,
            remove: false
        }))
        .pipe($.csscomb())
        .pipe(gulp.dest(config.styles.css.dest));
};