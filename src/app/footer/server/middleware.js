'use strict';

var sessionCookie = require('investlist/lib/sessionCookie');
var auth = require('investlist/lib/auth');

module.exports = {
  verifyUser: verifyUser,
  isAuthenticated: isAuthenticated,
  isAdmin: isAdmin
};
function verifyUser(type, request, reply, next) {
  if (type === 'authenticated') {
    return isAuthenticated(request, reply, next);
  }
  if (type === 'admin') {
    return isAdmin(request, reply, next);
  }
  return hasSession(request, reply, next);
}

function hasSession(request, reply, next) {
  auth.getSession({
    session: sessionCookie(request)
  }, function(err, json) {
    if (err) {
      logger.error('[error]hasSession', err);
    }
    if (json) {
      return next();
    }
    reply.status(401).end();
  });
}

function isAuthenticated(request, reply, next) {
  auth.getSession({
    session: sessionCookie(request)
  }, function(err, json) {
    if (err) {
      logger.error('[error]isAuthenticated', err);
    }
    var user = json && json.user;
    if (user) {
      return next();
    }
    reply.status(401).end();
  });
}

function isAdmin(request, reply, next) {
  auth.getSession({
    session: sessionCookie(request)
  }, function(err, json) {
    if (err) {
      logger.error('[error]isAdmin', err);
    }
    var user = json && json.user;
    if (user && user.status.admin === 'approved') {
      return next();
    }
    reply.status(401).end();
  });
}
