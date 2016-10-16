/**
 * Created by dachao.chen on 5/31/2016.
 */
'use strict';

var gulp = require('gulp'),
    gulpLoadPlugins = require('gulp-load-plugins');

var $ = gulpLoadPlugins(),
    config = require('../config')();

function changePath(basePath){
    var nowCssSrc = [];
    for (var i = 0; i < config.styles.css.src.length; i++) {
        nowCssSrc.push(config.styles.css.rev + '/' + config.styles.css.src[i]);
    }
    return nowCssSrc;
}


module.exports = function () {
    return gulp.src(config.styles.css.src)
        .pipe($.if(global.isProd, $.cleanCss({
            compatibility: 'ie7'
        })))
        .pipe($.if(global.isProd, $.cleanCss({debug: true}, function (details) {
            console.log(details.name + ': ' + details.stats.originalSize);
            console.log(details.name + ': ' + details.stats.minifiedSize);
        })))
        .pipe($.rev())
        .pipe($.notify('Hello World!'))
        .pipe($.if(global.isProd, $.changed(config.styles.css.dest)))
        .pipe($.autoprefixer({
            browsers: config.AUTOPREFIXER_BROWSERS,
            cascade: false,
            remove: false
        }))
        .pipe(gulp.dest(config.styles.css.dest))
        .pipe($.rev.manifest())
        .pipe(gulp.dest(config.styles.css.rev));
};
