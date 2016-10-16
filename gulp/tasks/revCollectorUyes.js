/**
 * Created by dachao.chen on 5/31/2016.
 */
'use strict';

var gulp = require('gulp'),
    gulpLoadPlugins = require('gulp-load-plugins');

var $ = gulpLoadPlugins(),
    config = require('../config')();

// TODO: revision
module.exports = function () {
    // json map and html
    return gulp.src([config.revSrc, config.templates.src, config.templates.entry])
        .pipe($.revCollectorUyes({
            replaceReved: true,
            dirReplacements: {
                // 'css': config.styles.css.dest,
                // 'js': config.scripts.dest
            }
        }))
        .pipe($.htmlmin({
            collapseWhitespace: true,
            conservativeCollapse: true,
            minifyCSS: true,
            minifyJS: true,
        }))
        .pipe(gulp.dest(config.templates.dest));
    
    // .pipe(gulp.dest(config.styles.css.dest))
    // .pipe($.rev())
    // .pipe(gulp.dest(config.styles.css.dest))
    // .pipe($.rev.manifest({
    //     path: config.buildDir + 'manifest.json'
    // },{
    //     base: config.styles.css.dest,
    //     merge: true
    // }))
    // .pipe(gulp.dest(config.styles.css.dest));
};