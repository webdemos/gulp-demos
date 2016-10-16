/**
 * Created by dachao.chen on 5/31/2016.
 */
'use strict';

var gulp = require('gulp'),
    bower = require('main-bower-files'),
    wiredep = require('wiredep').stream,
    es = require('event-stream'),
    gulpLoadPlugins = require('gulp-load-plugins');

var $ = gulpLoadPlugins(),
    config = require('../config')();


var gulpInjectVersioningTranform = function (filepath, i, length, sourceFile, targetFile) {
    var extname = path.extname(filepath);
    if (extname === '.js' || extname === '.css') {
        filepath += '?v=' + version;
        return $.inject.transform.apply($.inject.transform, [filepath, i, length, sourceFile, targetFile]);
    } else {
        return $.inject.transform.apply($.inject.transform, arguments);
    }
};

/**
 * inject bower js css
 * @returns {*}
 */
module.exports = function () {
    // solutions 1
    var options = config.getWiredepDefaultOptions();
    
    return gulp.src(config.index)
        .pipe(wiredep(options))    // inject bower dep
        .pipe(gulp.dest(config.clientApp));
    
    // // solutions 2
    // return gulp.src(config.index)
    //     .pipe($.inject(
    //         gulp.src(bower({ paths: './', read: false})),
    //         { name: 'bower', relative: true }
    //     ))
    //      // should use es.merge here
    //     .pipe($.inject(
    //         gulp.src(config.alljs, {read: false}),
    //         {relative: true}
    //     ))
    //     .pipe($.inject(
    //         gulp.src(config.css, {read: false}),
    //         {relative: true}
    //         // {relative: true, transform: gulpInjectVersioningTranform}
    //     ))
    //     .pipe(gulp.dest(config.clientApp));
};