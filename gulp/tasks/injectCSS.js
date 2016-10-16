/**
 * Created by dachao.chen on 5/31/2016.
 */
'use strict';

var gulp = require('gulp'),
    gulpLoadPlugins = require('gulp-load-plugins');

var $ = gulpLoadPlugins(),
    config = require('../config')();

/**
 * inject custom css
 * @returns {*}
 */
module.exports = function () {
    return gulp.src(config.index)
        .pipe($.inject( // inject custom css
            gulp.src(config.css, {read: false}),
            {relative: true}
        ))
        .pipe(gulp.dest(config.clientApp));
};