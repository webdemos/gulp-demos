/**
 * Created by dachao.chen on 5/31/2016.
 */
'use strict';

var gulp = require('gulp'),
    path = require('path'),
    gulpLoadPlugins = require('gulp-load-plugins');

var $ = gulpLoadPlugins({
        pattern: ['gulp-*', 'gulp.*', 'main-bower-files', 'del']
    }),
    log = $.util.log,
    config = require('../config')(),
    conf = require('../conf');


module.exports = function () {
    // return del([
    //     'dist/report.csv',
    //     // here we use a globbing pattern to match everything inside the `mobile` folder
    //     'dist/mobile/**/*',
    //     // we don't want to clean this file though so we negate the pattern
    //     '!dist/mobile/deploy.json'
    // ]);
    
    // return del([config.buildDir]);
    // return del.sync(config.buildDir);
    
    return $.del.sync([
        path.join(conf.paths.dist, '/'),
        path.join(conf.paths.tmp, '/')
    ]);
};