/**
 * Created by dachao.chen on 5/31/2016.
 */
'use strict';

var gulp = require('gulp'),
    stylish = require('htmlhint-stylish'),
    gulpLoadPlugins = require('gulp-load-plugins');

var $ = gulpLoadPlugins(),
    config = require('../config')();


module.exports = function () {
    return gulp.src([config.templates.src, config.templates.entry])
        // .pipe($.htmlhint('.htmlhintrc'))
        .pipe($.htmlhint({
            "tag-pair": true,
            // "doctype-first": false
        }))
        .pipe($.htmlhint.reporter(stylish))
    // .pipe($.htmlhint.failReporter({
    //     supress: true
    // })); // if you want to your task to fail on error(s)
};