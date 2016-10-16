/**
 * Created by dachao.chen on 5/31/2016.
 */
'use strict';

var gulp = require('gulp'),
    del = require('del'),
    vinylPaths = require('vinyl-paths'),
    gulpLoadPlugins = require('gulp-load-plugins');

var $ = gulpLoadPlugins(),
    config = require('../config')();

module.exports = function () {
    return new Promise(function (resolve, reject) {
        var vp = vinylPaths();
        
        gulp.src(config.scripts.src)
            .pipe(vp)
            .pipe(gulp.dest(config.distDir))
            .on('end', function () {
                del(vp.paths).then(resolve).catch(reject);
            });
    });
};