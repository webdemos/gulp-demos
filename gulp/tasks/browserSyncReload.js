/**
 * Created by dachao.chen on 5/31/2016.
 */
'use strict';

require('colors');
var gulp = require('gulp'),
    gulpLoadPlugins = require('gulp-load-plugins'),
    bs = require('browser-sync').get('bs');

var $ = gulpLoadPlugins(),
    active = bs.active,
    reload = bs.reload,
    config = require('../config')();

module.exports = function () {
    $.if(active, reload({ stream: true }));
};
