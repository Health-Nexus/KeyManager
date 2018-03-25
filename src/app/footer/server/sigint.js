'use strict';

var async = require('async');
var logger = require('investlist/lib/logger');

var tasks = [];

function addTask(fn) {
  tasks.push(fn);
}

module.exports = {
  addTask: addTask
};

process.on('SIGINT', function(sig) {
  async.parallel(tasks, function(err) {
    if (err) {
      logger.error(err);
    }
    var shutdownType = err ? 1 : 0;
    logger.info('SIGINT Shutdown', shutdownType);
    process.exit(shutdownType);
  });
});
