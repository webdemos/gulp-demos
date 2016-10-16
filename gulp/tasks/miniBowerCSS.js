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
 * bower get all bower dependencies
 * gulp-filter filter css files
 * minify with uglify
 * concat to bower.min.css
 * chmod
 */
module.exports = function () {
    return gulp.src(bower( {paths: './'}))
        .pipe($.filter('**/*.css'))
        .pipe($.cleanCss({
            compatibility: 'ie7'
        }))
        .pipe($.concat('bower.min.css'))
        .pipe($.chmod(666))
        .pipe($.size({
            title: 'minify bower css',
            // gzip: true
        }))
        .pipe(gulp.dest(config.buildDir));
};
