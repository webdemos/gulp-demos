/**
 * Created by dachao.chen on 5/31/2016.
 */
'use strict';

var gulp = require('gulp'),
    path = require('path'),
    gulpLoadPlugins = require('gulp-load-plugins');;

var $ = gulpLoadPlugins({
        pattern: ['gulp-*', 'gulp.*', 'main-bower-files']
    }),
	config = require('../config')(),
    conf = require('../conf');

/**
 * copy bower and custom fonts
 * @returns {*}
 */
module.exports = function () {
    return gulp.src(
            $.mainBowerFiles('**/*.{eot,svg,ttf,woff,woff2,otf}', function (err) { })
            .concat(config.fonts.src), {base: './'})
        // .pipe($.flatten())
        .pipe(gulp.dest(path.join(conf.paths.dist, '/fonts/')));
};