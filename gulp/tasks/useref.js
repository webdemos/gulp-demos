/**
 * Created by dachao.chen on 5/31/2016.
 */
'use strict';

var gulp = require('gulp');
var uglify = require('gulp-uglify');
var cleanCss = require('gulp-clean-css');
var gulpIf = require('gulp-if');
var useref = require('gulp-useref');
var config = require('../config')();


module.exports = function () {
    return gulp.src(config.templates.src)
        .pipe(useref())
        // Minifies only if it's a JavaScript file
        .pipe(gulpIf('*.js', uglify()))
        .pipe(gulpIf('*.css', cleanCss()))
        .pipe(gulp.dest(config.templates.dest));
};