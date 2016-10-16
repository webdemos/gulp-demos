/**
 * Created by dachao.chen on 5/31/2016.
 */
'use strict';

var gulp = require('gulp'),
    Pageres = require('pageres'),
    gulpLoadPlugins = require('gulp-load-plugins');

var $ = gulpLoadPlugins(),
    config = require('../config')();

/**
 * Run test once and exit

    snapshot
 */
module.exports = function () {
    var pageres = new Pageres({delay: 2})
        .src('yeoman.io', ['480x320', '1024x768', 'iphone 5s'], {crop: true})
        .src('todomvc.com', ['1280x1024', '1920x1080'])
        .src('data:text/html;base64,PGgxPkZPTzwvaDE+', ['1024x768'])
        .dest(config.buildDir.snapshot)
        .run()
        .then(function () {
            console.log('done')
        });
};
