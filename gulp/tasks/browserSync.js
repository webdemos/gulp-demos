/**
 * Created by dachao.chen on 5/31/2016.
 */
'use strict';

var gulp = require('gulp'),
    url = require('url'),
    util = require('util'),
    colors = require('colors'),
    spa = require('browser-sync-spa'),
    bs = require('browser-sync').get('bs'),
    proxyMiddleware = require('http-proxy-middleware');;
    
var config = require('../config')(),
    conf = require('../conf');

bs.use(spa({
    selector: '[ng-app]' // Only needed for angular apps
}));

module.exports = function (baseDir, browser) {
    browser = browser === undefined ? 'default' : browser;
    
    // if baseDir is dist or tmp, we don't need to route cos have already minified libs
    var routes = null;
    if(baseDir === conf.paths.src || (util.isArray(baseDir) && baseDir.indexOf(conf.paths.src) !== -1)) {
        routes = {
            '/bower_components': 'bower_components'
        };
    }
    
    var server = {
        baseDir: baseDir,
        directory: true,
        routes: routes
    };
    
    var config = {
        notify: true,
        host: 'localhost',
        port: 9001,
        ui: {
            port: 9002
        },
        startPath: '/index.html',
        server: server,
        browser: browser
    };
    
    
    /*
     * You can add a proxy to your backend by uncommenting the line below.
     * You just have to configure a context which will we redirected and the target url.
     * Example: $http.get('/users') requests will be automatically proxified.
     *
     * For more details and option, https://github.com/chimurai/http-proxy-middleware/blob/v0.9.0/README.md
     */
    // server.middleware = proxyMiddleware('/users', {target: 'http://jsonplaceholder.typicode.com', changeOrigin: true});
    
    bs.instance = bs.init(config, function (err, bs) {
        console.log(bs.active)
    });
};