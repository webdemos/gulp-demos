/**
 * Created by dachao.chen on 5/31/2016.
 */
'use strict';

var gulp = require('gulp'),
    bower = require('main-bower-files'),
    gulpLoadPlugins = require('gulp-load-plugins');

var $ = gulpLoadPlugins(),
    config = require('../config')();

/**
 * Minify bower libs
 *
 * bower get all bower dependencies
 * gulp-filter filter js files
 * minify with uglify
 * concat to bower.min.js
 * chmod
 */
module.exports = function () {
   return gulp.src(bower( {paths: './'}))
       .pipe($.filter('**/*.js'))
       .pipe($.uglify())
       .pipe($.concat('bower.min.js'))
       .pipe($.chmod(666))
       .pipe(gulp.dest(config.buildDir));
};
