/**
 * Created by dachao.chen on 5/31/2016.
 */
'use strict';

var gulp = require('gulp'),
    gulpLoadPlugins = require('gulp-load-plugins');

var $ = gulpLoadPlugins(),
    config = require('../config')();

module.exports = function () {
    return gulp.src([config.revSrc, config.templates.src, config.templates.entry])
        .pipe($.revCollector({
            replaceReved: true,
            dirReplacements: {
                'css': config.styles.css.dest,
                'js': config.scripts.dest
            }
        }))
        .pipe($.htmlmin({
            collapseWhitespace: true,
            conservativeCollapse: true,
            minifyCSS: true,
            minifyJS: true,
        }))
        .pipe(gulp.dest(config.templates.dest));
};
