/**
 * Created by dachao.chen on 5/31/2016.
 */
'use strict';

var gulp = require('gulp'),
    del = require('del'),
    vinylPaths = require('vinyl-paths'),
    gulpLoadPlugins = require('gulp-load-plugins');

var $ = gulpLoadPlugins(),
    config = require('../config')();

// delete stream files in pipeline
module.exports = function () {
    return gulp.src(config.scripts.src)
    	.pipe($.stripDebug())
        .pipe(vinylPaths(del))
        .pipe(gulp.dest(config.distDir));
};
