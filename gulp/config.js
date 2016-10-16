/**
 * Created by dachao.chen on 5/31/2016.
 */
'use strict';

module.exports = function config() {

    var client = './',
        server = './',
        clientApp = client + 'app/',    // TODO: rm sourceDir
        serverApp = server + 'app/',
        tempDir = client + '.temp/',
        buildDir = client + 'build/',
        distDir = client + 'dist/',
        testDir = client + 'tests/',
        gulpDir = client + 'gulp/',
        reportDir = client + 'report/',

        revDir = client + 'rev/',
        revSrc = revDir + '**/*.json',

        snapshot = 'snapshot/',
        jsDir = 'js/',
        plato = 'plato/',
        jsSrc = '**/*.js',
        htmlDir = 'html/',
        htmlSrc = '**/*.html',
        imgDir = 'img/',
        imgSrc = '**/*.+(png|jpg|gif|svg)',
        fontDir = 'fonts/',
        fontSrc = '**/*.+(eot|svg|ttf|woff|woff2|otf)',
        scssDir = '+(scss|sass)/',
        scssSrc = '**/*.+(scss|sass)',
        cssDir = 'css/',
        cssSrc = '**/*.css',

     /*
     *	Bower and NPM locations
     */
        bower = {
            bowerJson: require('../bower.json'),
            directory: './bower_components/',   // the directory of your bower components
            ignorePath: '../..', // or /^(\.\.\/)+/,
            dependencies: true,
            devDependencies: true
        },
        nodeModules = 'node_modules';


    var config = {

        browserPort: 3000,
        UIPort: 3001,

        client: client,
        
        clientApp: clientApp,
    
        tempDir: tempDir,

        buildDir: buildDir,

        distDir: distDir,

        testDir: testDir,

        reportDir: reportDir,
    
        snapshot: buildDir + snapshot,

        revDir: revDir,

        revSrc: revSrc,
    
        // TODO: restructure config like below
        build: {
        
        },
        
        dist: {
        
        },
        
        rev: {
        
        },

        alljs: [
            clientApp + jsDir + jsSrc,
            clientApp + 'app.js'
        ],

        css: clientApp + cssDir + cssSrc,
        
        
        index: clientApp + 'index.html',

        bower: bower,


        scripts: {
            src: clientApp + jsDir + jsSrc,
            entry: clientApp + 'app.js',
            dest: buildDir + jsDir,
            test: testDir + jsSrc,
            gulp: gulpDir + jsSrc,
            bundle: clientApp,
            rev: revDir + jsDir,
            lint: reportDir + jsDir,
            plato: reportDir + plato,
            all: function () {
                return [this.src, this.entry]
            }
        },

        templates: {
            src: clientApp + htmlDir + htmlSrc,
            dest: buildDir + htmlDir,
            rev: revDir + htmlDir,
            entry: clientApp + 'index.html'
        },

        images: {
            src: clientApp + imgDir + imgSrc,
            dest: buildDir + imgDir,
            rev: revDir + imgDir
        },

        fonts: {
            src: clientApp + fontDir + fontSrc,
            dest: buildDir + fontDir,
            rev: revDir + fontDir
        },

        styles: {
            scss: {
                src: clientApp + scssDir + scssSrc,
                dest: clientApp + cssDir,
                rev: revDir + cssDir
            },
            css: {
                src: clientApp + cssDir + cssSrc,
                dest: buildDir + cssDir,
                entry: 'app.css',
                rev: revDir + cssDir
            }
        },

        // Browser definitions for autoprefixer
        AUTOPREFIXER_BROWSERS: [
            'last 3 versions',
            '> 1%',
            'bb >= 10',
            'Android 2.3',
            'Android >= 4',
            'Chrome >= 20',
            'Firefox >= 24', // Firefox 24 is the latest ESR
            'Explorer >= 8',
            'ios >= 6',
            'Opera >= 12',
            'Safari >= 6'
        ],

        assetExtensions: [
            'js',
            'css',
            'png',
            'jpe?g',
            'gif',
            'svg',
            'eot',
            'otf',
            'ttc',
            'ttf',
            'woff2?'
        ]


    };

    config.getWiredepDefaultOptions = function () {
        var options = {
            // want to get a bower json property
            bowerJson: config.bower.bowerJson,
            // want to get a property for the directory
            directory: config.bower.directory,
            // ignore path
            ignorePath: config.bower.ignorePath,
            dependencies: config.bower.dependencies,
            devDependencies: config.bower.devDependencies,
        };

        return options;
    };

    return config;
};