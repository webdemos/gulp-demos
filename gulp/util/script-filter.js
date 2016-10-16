/**
 * Created by dachao.chen on 5/31/2016.
 */
'use strict';

var path = require('path');

// Filters out non .coffee and .js files. Prevents
// accidental inclusion of possible hidden files
module.exports = function (name) {
    return /(\.(js|coffee)$)/i.test(path.extname(name));
};