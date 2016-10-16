/**
 * Created by dachao.chen on 5/31/2016.
 */
'use strict';

var gulp = require('gulp'),
    gulpLoadPlugins = require('gulp-load-plugins');

var $ = gulpLoadPlugins(),
    config = require('../config')();

//CSS里更新引入文件版本号
module.exports = function () {
    return gulp.src([config.revSrc, config.styles.scss.src])
        .pipe($.revCollector())
        .pipe(gulp.dest(config.styles.css.rev));
};