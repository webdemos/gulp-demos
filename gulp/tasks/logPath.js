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
    return gulp.src(config.scripts.src)
        .pipe($.stripDebug())
        .pipe(vinylPaths(function (paths) {
            console.log('Paths: ', paths);
            return Promise.resolve();
        }))
};
