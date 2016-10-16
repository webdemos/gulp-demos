// /**
//  * Created by dachao.chen on 5/31/2016.
//  */
// 'use strict';
//
// var fs = require('fs');
// var onlyScripts = require('./util/script-filter');
//
// var TASKS = fs.readdirSync('./gulp/tasks/').filter(onlyScripts);
//
// TASKS.forEach(function (task) {
//     require('./tasks/' + task);
// });

require('./main');
