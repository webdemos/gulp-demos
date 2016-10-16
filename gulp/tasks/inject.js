/**
 * Created by dachao.chen on 5/31/2016.
 */
'use strict';

var gulp = require('gulp'),
    path = require('path'),
    _ = require('lodash'),
    wiredep = require('wiredep').stream,
    gulpLoadPlugins = require('gulp-load-plugins');

var $ = gulpLoadPlugins(),
    conf = require('../conf');

/**
 * inject custom css
 * @returns {*}
 */
module.exports = function () {
    
    var injectStyles = gulp.src([
        path.join(conf.paths.tmp, '/serve/app/**/*.css'),
        path.join('!' + conf.paths.tmp, '/serve/app/vendor.css')
    ], { read: false });
    
    var injectScripts = gulp.src([
        path.join(conf.paths.tmp, '/serve/app/**/*.js')
    ], { read: false });
    
    var injectOptions = {
        ignorePath: [conf.paths.src, path.join(conf.paths.tmp, '/serve')],
        addRootSlash: false
    };
    
    return gulp.src(path.join(conf.paths.src, '/*.html'))
        .pipe($.inject(injectStyles, injectOptions))
        .pipe($.inject(injectScripts, injectOptions))
        .pipe(wiredep(_.extend({}, conf.wiredep)))
        .pipe(gulp.dest(path.join(conf.paths.tmp, '/serve')));
};