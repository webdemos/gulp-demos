var plato = require('plato');

var config = require('./gulp/config')();

var files = config.alljs;

var outputDir = config.scripts.plato;

var options = {
    title: 'gulp demo'
};

var callback = function (report) {
    // console.log(report);
};

plato.inspect(files, outputDir, options, callback);
