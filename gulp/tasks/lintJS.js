/**
 * Created by dachao.chen on 5/31/2016.
 */
'use strict';

var gulp = require('gulp'),
    stylish = require('jshint-stylish'),
    gulpLoadPlugins = require('gulp-load-plugins');

var $ = gulpLoadPlugins(),
    config = require('../config')();

module.exports = function () {
    return gulp.src(config.scripts.src)
        .pipe($.jshint({
            'undef': true,
            'unused': true
        }))
        .pipe($.jshint.reporter(stylish))   // highlight warnings
        .pipe($.jshint.reporter('gulp-jshint-html-reporter', {
            filename: config.scripts.lint + 'jshint-report.html',
            createMissingFolders: true
        }))
    // .pipe($.jshint.reporter('fail'));
};