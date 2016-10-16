/**
 * Created by dachao.chen on 5/31/2016.
 */
'use strict';

var gulp = require('gulp'),
    gulpLoadPlugins = require('gulp-load-plugins');

var $ = gulpLoadPlugins(),
    config = require('../config')();

module.exports = function () {
    return gulp.src(config.fonts.src)
        .pipe($.rev())
        .pipe(gulp.dest(config.fonts.dest))
        .pipe($.rev.manifest())
        .pipe(gulp.dest(config.fonts.rev));
};
