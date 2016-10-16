/**
 * Created by dachao.chen on 5/31/2016.
 */
'use strict';

var gulp = require('gulp'),
    gulpLoadPlugins = require('gulp-load-plugins');

var loadPluginOptions = {
    DEBUG: true, // when set to true, the plugin will log info to console. Useful for bug reporting and issue debugging
    pattern: ['gulp-*', 'gulp.*'], // the glob(s) to search for
    config: './../../package.json', // where to find the plugins, by default searched up from process.cwd()
    scope: ['dependencies', 'devDependencies', 'peerDependencies'], // which keys in the config to look within
    replaceString: /^gulp(-|\.)/, // what to remove from the name of the module when adding it to the context
    camelize: true, // if true, transforms hyphenated plugins names to camel case
    lazy: true // whether the plugins should be lazy loaded on demand
    // rename: {}, // a mapping of plugins to rename
    // renameFn: function (name) { // a function to handle the renaming of plugins (the default works)
    // }
};

var $ = gulpLoadPlugins(),
    config = require('../config')();

/**
 * JS Minification & Concatenate
 *
 * concat all js to index.js
 * and then minify index.js
 * and rename to index.min.js to dist folder
 *
 * with rivision
 */
module.exports = function () {
    return gulp.src(config.scripts.src)
        .pipe($.sourcemaps.init({loadMaps: true}))
        .pipe($.changed(config.scripts.dest, {
            hasChanged: config.scripts.dest.compareLastModifiedTime,
            extension: '.js'
        }))
        .pipe($.plumber())    // Prevent pipe breaking caused by errors from gulp plugins
        .pipe($.concat('index.js'))
        .pipe(gulp.dest(config.scripts.bundle))   // save .js to disk
        .pipe($.stripDebug())   // strip console and debugger statements
        .pipe(global.isProd ? $.uglify({preserveComments: 'license'}) : $.util.noop())
        // .pipe($.if(global.isProd, $.rename(function (path) {
        //     path.extname + '.min.js';   // add suffix .min.js after uglify
        // })))  // or
        .pipe($.if(global.isProd, $.rename({suffix: '.min'})))
        .pipe($.rev())    // revision should not use with $.change
        .pipe($.sourcemaps.write('.'))
        .pipe(gulp.dest(config.scripts.dest))   // save .min.js
        .pipe($.rev.manifest())
        .pipe(gulp.dest(config.scripts.rev));
};
