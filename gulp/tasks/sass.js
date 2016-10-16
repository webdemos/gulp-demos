/**
 * Created by dachao.chen on 5/31/2016.
 */
'use strict';

var gulp = require('gulp');
var gulpLoadPlugins = require('gulp-load-plugins');
var bs = require('browser-sync').get('bs');

var $ = gulpLoadPlugins();
var active = bs.active;
var reload = bs.reload;
var config = require('../config')();
var handleErrors = require('../util/handle-errors');

// Compile CSS from Sass files
module.exports = function () {
    return gulp.src(config.styles.scss.src)
        .pipe($.sourcemaps.init()) // Process the original sources
        .pipe($.plumber({errorHandler: handleErrors}))
        .pipe($.sass({
            sourceComments: global.isProd ? false : 'map',
            sourceMap: global.isProd ? false : 'sass',
            outputStyle: global.isProd ? 'compressed' : 'nested'
        }))
        .on('error', handleErrors)
        .pipe($.autoprefixer(config.AUTOPREFIXER_BROWSERS))
        .pipe($.rename(config.styles.css.entry))
        .pipe($.sourcemaps.write('.'))   // Add map to modified source.
        .pipe(gulp.dest(config.styles.scss.dest))
        // .pipe($.uncss({ // This task is not safe, should be careful with it
        //     html: ['./app/index.html', './app/index-async.html', config.templates.src]
        // }))
        .pipe($.cleanCss({compatibility: 'ie8'}))
        .pipe(gulp.dest(config.styles.css.dest))
        .pipe(bs.stream({
            match: '**/*.css'
        }));
};
