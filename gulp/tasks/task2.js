/**
 * Created by dachao.chen on 5/31/2016.
 */
'use strict';

var gulp = require('gulp');
var gulpLoadPlugins = require('gulp-load-plugins');

var $ = gulpLoadPlugins();
var config = require('../config')();

module.exports = function () {
    console.log(2)
    return gulp.src('./file.txt', {read: true})
        // .pipe($.changed('./dist/file.txt'))
        .pipe($.replace('bar', 'foo'))
        .pipe(gulp.dest('./dist/'));
};