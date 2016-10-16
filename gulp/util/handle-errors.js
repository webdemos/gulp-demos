/**
 * Created by dachao.chen on 5/31/2016.
 */
'use strict';

var notify = require('gulp-notify');
var gulpLoadPlugins = require('gulp-load-plugins');

var $ = gulpLoadPlugins();

function onError(error) {

    if (!global.isProd) {

        var args = Array.prototype.slice.call(arguments);

        $.util.beep();

        // Send error to notification center with gulp-notify
        notify.onError({
            title: 'Compile Error',
            message: '<%= error.message %>'
        }).apply(this, args);

        // Keep gulp from hanging on this task
        this.emit('end');

    } else {
        // Log the error and stop the process
        // to prevent broken code from building
        console.log(error);
        process.exit(1);
    }
}

module.exports = onError;