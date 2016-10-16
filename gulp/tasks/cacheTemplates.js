/**
 * Created by dachao.chen on 5/31/2016.
 */
'use strict';

var gulp = require('gulp'),
    path = require('path'),
    gulpLoadPlugins = require('gulp-load-plugins');

var $ = gulpLoadPlugins(),
    config = require('../config')(),
    conf = require('../conf');

/**
 */
module.exports = function () {
    return gulp.src([
            path.join(conf.paths.src, '/html/**/*.html'),
            path.join(conf.paths.tmp, '/serve/app/**/*.html')
        ])
        // TODO: htmlmin
        .pipe($.htmlmin({
            removeEmptyAttributes: true,
            removeAttributeQuotes: true,
            collapseBooleanAttributes: true,
            collapseWhitespace: true
        }))
        .pipe($.angularTemplatecache('templateCacheHtml.js', {
            module: 'gulpAngular',
            root: 'app/html/'
        }))
        .pipe(gulp.dest(path.join(conf.paths.tmp, '/partials/')));
};


