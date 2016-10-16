/**
 * Created by dachao.chen on 5/31/2016.
 */
'use strict';

var gulp = require('gulp'),
    gulpLoadPlugins = require('gulp-load-plugins');

var $ = gulpLoadPlugins(),
    config = require('../config')();

module.exports = function () {
    return gulp.src(config.alljs, {base: 'app'})
        .pipe($.rev())
        .pipe(gulp.dest(config.buildDir))
        .pipe($.rev.manifest())
        // TODO: config.scripts.rev to config.rev.scripts
        .pipe(gulp.dest(config.scripts.rev));
    
    // return gulp.src(config.alljs)
    //     .pipe($.sourcemaps.init())
    //     .pipe($.concat({path: 'bundle.js', cwd: ''}))
    //     .pipe($.rev())
    //     .pipe($.sourcemaps.write('.'))
    //     .pipe(gulp.dest(config.buildDir));
};
