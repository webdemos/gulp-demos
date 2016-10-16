/**
 * Created by dachao.chen on 5/31/2016.
 */
'use strict';

var gulp = require('gulp'),
    fs = require('fs'),
    runSequence = require('run-sequence'),
    argv = require('yargs').argv,
    open = require('open'),
    gulpLoadPlugins = require('gulp-load-plugins');

var $ = gulpLoadPlugins(),
    config = require('../config')();

function runPlato() {
    runSequence('plato');
}

function isUpdate() {
    // var updateIndex = process.argv.indexOf('--update');
    // return process.argv[updateIndex + 1];
    return argv.update;
}

function updatePlato() {
    console.log('updatePlato');
    runPlato();
}

module.exports = function () {
    var file = __dirname + '/../../' + config.scripts.plato + 'index.html';
    
    if (!fs.existsSync(file)) {
        console.error('Run plato task first');
        runPlato();
    }
    
    isUpdate() === 'true' ? updatePlato() : function () {};
    
    open(file, 'chrome');
};