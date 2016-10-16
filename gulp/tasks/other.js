/**
 * Created by dachao.chen on 5/31/2016.
 */
'use strict';

var gulp = require('gulp'),
    path = require('path'),
    gulpLoadPlugins = require('gulp-load-plugins');

var $ = gulpLoadPlugins(),
    conf = require('../conf');

module.exports = function () {
    var fileFilter = $.filter(function (file) {
        return file.stat.isFile();
    });
    
    return gulp.src([
            path.join(conf.paths.src, '/**/*'),
            path.join('!' + conf.paths.src, '/**/*.{html,css,css.map,js,scss}')
        ])
        .pipe(fileFilter)
        .pipe(gulp.dest(path.join(conf.paths.dist, '/')));
};