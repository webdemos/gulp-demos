/**
 * Created by dachao.chen on 5/31/2016.
 */
'use strict';

var gulp = require('gulp'),
    runSequence = require('run-sequence'),
    gulpLoadPlugins = require('gulp-load-plugins');

var $ = gulpLoadPlugins(),
    log = $.util.log;

module.exports = function (done) {
    log('Building files', $.util.colors.magenta('123'));
    // run tasks one by one
    // runSequence('clean:dist', 'sass', 'useref', 'imagemin', 'copy:fonts', done);
    
    // run tasks simultaneously, all tasks should be run before greetings is run
    // runSequence(['clean:dist', 'sass', 'useref', 'imagemin', 'copy:fonts'], 'greetings', done);
    
    // run clean:dist first
    runSequence('clean:dist', ['sass', 'useref', 'imagemin', 'copy:fonts'], done);
};
