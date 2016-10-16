/**
 * Created by dachao.chen on 5/31/2016.
 */
'use strict';

var gulp = require('gulp'),
    stylish = require('jshint-stylish'),
    vinylPaths = require('vinyl-paths'),
    gulpLoadPlugins = require('gulp-load-plugins');

var $ = gulpLoadPlugins(),
    config = require('../config')();

module.exports = function () {
    return gulp.src('app/**/*')
        .pipe($.zip('archive.zip', {compress: true}))
        .pipe(gulp.dest(config.distDir))
};
