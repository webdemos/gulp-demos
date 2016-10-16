/**
 * Created by dachao.chen on 5/31/2016.
 */
'use strict';

var gulp = require('gulp'),
    Server = require('karma').Server,
    gulpLoadPlugins = require('gulp-load-plugins');

var $ = gulpLoadPlugins(),
    config = require('../config')();

module.exports = function (singleRun, done) {
    var server = new Server({
        configFile: __dirname + '/../../karma.conf.js',
        singleRun: singleRun,
        autoWatch: !singleRun
    }, function (karmaResult) {
        done(karmaResult ? new Error("Failed " + karmaResult + " tests.") : null);
    });
    
    server.start();
};