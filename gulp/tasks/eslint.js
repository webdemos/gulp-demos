/**
 * Created by dachao.chen on 5/31/2016.
 */
'use strict';

var gulp = require('gulp'),
    bs = require('browser-sync').get('bs'),
    through = require('through2'),
    merge2 = require('merge2'),
    combiner = require('stream-combiner2'),
    gulpLoadPlugins = require('gulp-load-plugins');

var $ = gulpLoadPlugins(),
    config = require('../config')(),
    reload = bs.reload;

var onError = function (err) {
    $.util.beep();
    console.log(err);
};

// receive source stream process it then return
function lint(options) {
    
    var defaultOptions = {
            fix: true,
            rules: {
                'strict': 2
            },
            globals: [
                'angular',
                'jQuery',
                '$'
            ],
            envs: [
                'browser'
            ]
        };
    
    // var through3 = through.obj();
    // through3.push(3);
    // var mergeStream = merge2(through1, [through2, through3], through4, [through5, through6]);
    // mergeStream
    //     .add(read1, [read2, through3], through4),
    //     .on('data', function (chunk) {}),
    //     .on('error', function () {}),
    //     .on('end', function () {});
        
    return combiner.obj(
        $.plumber({
            errorHandler: onError
        }), // prevents gulp.watch from crashing
        reload({stream: true, once: true}),
        $.eslint(options || defaultOptions),
        $.eslint.format(),
        $.if(!bs.active, $.eslint.failAfterError())
        // $.eslint.failOnError() // if we use plumber there is no need to use failOnError any more, because if won't stop if any error happens
    );
    
}

module.exports = lint;
