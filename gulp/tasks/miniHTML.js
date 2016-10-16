/**
 * Created by dachao.chen on 5/31/2016.
 */
'use strict';

var gulp = require('gulp');
var gulpLoadPlugins = require('gulp-load-plugins');

var $ = gulpLoadPlugins();
var config = require('../config')();


module.exports = function () {
    return gulp.src([config.revSrc, config.templates.src, config.templates.entry])
        .pipe($.changed(config.templates.dest))
        .pipe($.revCollector())
        // TODO: merge with miniHtml
        .pipe($.htmlmin({
            removeEmptyAttributes: true,
            removeAttributeQuotes: true,
            collapseBooleanAttributes: true,
            collapseWhitespace: true,
            conservativeCollapse: true,
            minifyCSS: true,
            minifyJS: true,
        }))
        .pipe(gulp.dest(config.templates.dest));
};