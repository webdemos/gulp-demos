/**
 * Created by dachao.chen on 5/31/2016.
 */
'use strict';

var gulp = require('gulp'),
    gulpLoadPlugins = require('gulp-load-plugins');

var $ = gulpLoadPlugins(),
    config = require('../config')();

module.exports = function () {
    return gulp.src(['./file.txt'])
        // .pipe($.changed('./dist/file.txt'))
        .pipe($.replace('bar', 'foo'))
        .pipe(gulp.dest('./dist/'));
};