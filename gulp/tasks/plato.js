/**
 * Created by dachao.chen on 5/31/2016.
 */
'use strict';

var gulp = require('gulp'),
    plato = require('plato'),
    shell = require('shelljs'),
    gulpLoadPlugins = require('gulp-load-plugins');

var $ = gulpLoadPlugins(),
    config = require('../config')();


module.exports = function () {
    // shell.exec('plato -r -d report  -t "gulp demo"  app');
    shell.exec('node plato');
};