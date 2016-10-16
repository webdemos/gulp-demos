/**
 * Created by dachao.chen on 5/31/2016.
 */
'use strict';

var gulp = require('gulp');
var es = require('event-stream');
var merge2 = require('merge2');
var through = require('through2');
var combiner = require('stream-combiner2');
var inspect  = require('util').inspect;
var gulpLoadPlugins = require('gulp-load-plugins');

var $ = gulpLoadPlugins();
var config = require('../config')();


var task1 = require('./task1');
var task2 = require('./task2');

var miniCSS = require('./miniCSS');
var sass = require('./sass');

module.exports = function () {
    
    // var stream = merge2(task1(),task2());
    // var stream = merge2(sass(), miniCSS());
    // console.log(stream);
    // stream.add();
    // return stream;
    
    
    return gulp.src(config.alljs)
        .pipe(combiner.obj($.eslint(), $.eslint.format()))
        // .pipe(through.obj(function (data, enc, next) {
        //     console.log(enc);
        //     next();
        // }))
        .pipe(gulp.dest(config.buildDir));
    
    // console.log(gulp)
    // var tasks = gulp.tasks;
    // for (var taskName in tasks) {
    //     if (tasks.hasOwnProperty(taskName) && taskName === 'task2') {
    //         var task = tasks[taskName];
    //         // recursive run
    //         var res = task.fn();
    //         console.log(merge2(res))
    //     }
    // }
};

