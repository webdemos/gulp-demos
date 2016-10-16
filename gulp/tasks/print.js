/**
 * Created by dachao.chen on 5/31/2016.
 */
'use strict';

var gulp = require('gulp'),
    colors = require('colors'),
    gulpLoadPlugins = require('gulp-load-plugins');

var $ = gulpLoadPlugins(),
    log = $.util.log,
    config = require('../config')();

// for debug, print path
module.exports = function () {
    log('printing path');
    return gulp.src(config.images.src)
        .pipe($.print())  // print default path
        .pipe($.print(function (filepath) {   // print custom path
            return 'custom built path: ' + filepath;
        }));
};
