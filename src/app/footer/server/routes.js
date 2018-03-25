'use strict';

var _ = require('underscore');
var filesystem = require('investlist/lib/fs');
var sanitizer = require('investlist/lib/sanitizer');
var apiResponse = require('investlist/lib/apiResponse');
var handlers = require('investlist/handlers');
var auth = require('investlist/lib/auth');
var multer = require('multer');
var upload = multer({
  dest: '/www/investlist/uploads/'
});

var routes = [{
  method: 'GET',
  path: '/api/amiok',
  config: {
    handler: function(request, reply) {
      apiResponse(null, {
        ok: true
      }, request, reply);
    }
  }
}, {
  method: 'POST',
  path: '/api/auth/login',
  auth: 'session',
  config: {
    handler: handlers.api.auth.login,
  }
}, {
  method: 'POST',
  path: '/api/auth/register',
  auth: 'session',
  config: {
    handler: handlers.api.auth.register
  }
}, {
  method: 'GET',
  path: '/api/auth/session',
  config: {
    handler: handlers.api.auth.session
  }
}, {
  method: 'POST',
  path: '/api/auth/logout',
  config: {
    handler: handlers.api.auth.logout
  }
}, {
  method: 'POST',
  path: '/api/auth/linkedin',
  auth: 'session',
  config: {
    handler: handlers.api.auth.linkedin
  }
}, {
  method: 'GET',
  path: '/api/linkedin',
  auth: 'session',
  config: {
    handler: handlers.api.auth.onLinkedin
  }
}, {
  method: 'POST',
  path: '/api/auth/profile/image',
  auth: 'authenticated',
  config: {
    handler: handlers.api.auth.profileImage
  },
  middleware: upload.single('file')
}, {
  method: 'POST',
  path: '/api/auth/status',
  auth: 'admin',
  config: {
    handler: handlers.api.auth.setStatus
  }
}, {
  method: 'POST',
  path: '/api/auth/reset-password',
  auth: 'session',
  config: {
    handler: handlers.api.auth.resetPassword
  }
}, {
  method: 'POST',
  path: '/api/auth/validate-reset-password-token',
  auth: 'session',
  config: {
    handler: handlers.api.auth.validatePasswordResetToken
  }
}, {
  method: 'PUT',
  path: '/api/auth/update-password',
  auth: 'session',
  config: {
    handler: handlers.api.auth.updatePassword
  }
}, {
  method: 'PUT',
  path: '/api/auth/set-password',
  auth: 'authenticated',
  config: {
    handler: handlers.api.auth.setPasswordForUser
  }
}, {
  method: 'POST',
  path: '/api/auth/masquerade',
  auth: 'admin',
  config: {
    handler: handlers.api.auth.masquerade
  }
}, {
  method: 'PUT',
  path: '/api/user',
  auth: 'authenticated',
  config: {
    handler: handlers.api.auth.updateUser
  }
}, {
  method: 'PUT',
  path: '/api/auth/complete',
  auth: 'session',
  config: {
    handler: handlers.api.auth.completeUser
  }
}, {
  method: 'POST',
  path: '/api/auth/merge',
  auth: 'admin',
  config: {
    handler: handlers.api.auth.merge
  }
}, {
  method: 'GET',
  path: '/api/linkedin/search',
  auth: 'authenticated',
  config: {
    handler: handlers.api.company.search
  }
}, {
  method: 'GET',
  path: '/api/recommendation/:userId',
  auth: 'authenticated',
  config: {
    handler: handlers.api.recommend.getRecommendations
  }
}, {
  method: 'POST',
  path: '/api/recommendation',
  auth: 'authenticated',
  config: {
    handler: handlers.api.recommend.saveRecommendations
  }
}, {
  method: 'PUT',
  path: '/api/recommendation',
  auth: 'authenticated',
  config: {
    handler: handlers.api.recommend.updateRecommendations
  }
}, {
  method: 'PUT',
  path: '/api/pitch',
  auth: 'authenticated',
  config: {
    handler: handlers.api.company.update
  }
}, {
  method: 'DELETE',
  path: '/api/recommendation/:id',
  auth: 'authenticated',
  config: {
    handler: handlers.api.recommend.removeRecommendation
  }
}, {
  method: 'POST',
  path: '/api/follow',
  auth: 'authenticated',
  config: {
    handler: handlers.api.follow.create
  }
}, {
  method: 'DELETE',
  path: '/api/follow',
  auth: 'authenticated',
  config: {
    handler: handlers.api.follow.destroy
  }
}, {
  method: 'GET',
  path: '/api/notification',
  auth: 'authenticated',
  config: {
    handler: handlers.api.notification.get
  }
}, {
  method: 'POST',
  path: '/api/templates/build',
  auth: 'admin',
  config: {
    handler: handlers.fs.templates
  }
}, {
  method: 'POST',
  path: '/api/page/build',
  auth: 'admin',
  config: {
    handler: handlers.fs.pages
  }
}, {
  method: 'GET',
  path: '/api/report',
  auth: 'admin',
  config: {
    handler: handlers.api.report.get
  }
}];

addRoutes({
  path: '/api/user',
  model: 'User',
  POST: function(request, reply) {
    sanitizer.payload(request.body);
    auth.register({
      data: request.body,
      admin: true
    }, function(error, response) {
      apiResponse(error, response, request, reply);
    });
  },
  onPrePUT: function onUserPut(request, reply) {
    request.query.select = '+linkedIn.oauth';
    try {
      request.body.oauth = undefined;
      delete request.body.oauth;
    } catch (e) {
      // console.error('e', e);
      // do nothing.
    }
  },
  onPreGET: function onUserGET(request, reply) {
    auth.user.userQuery(request.query);
  },
  authGET: 'session'
});

addRoutes({
  path: '/api/company',
  model: 'Company',
  authGET: 'session'
});

addRoutes({
  path: '/api/module',
  model: 'Module',
  authGET: 'admin',
  authPOST: 'admin',
  authPUT: 'admin',
  authDELETE: 'admin',
  onPostPUT: buildHtml,
  onPostPOST: buildHtml
});

addRoutes({
  path: '/api/i18n',
  model: 'I18n',
  authGET: 'session',
  authPOST: 'admin',
  authPUT: 'admin',
  authDELETE: 'admin',
  onPostPUT: buildHtml,
  onPostPOST: buildHtml
});

addRoutes({
  path: '/api/page',
  model: 'Page',
  authGET: 'admin',
  authPOST: 'admin',
  authPUT: 'admin',
  authDELETE: 'admin',
  onPostPUT: buildPages,
  onPostPOST: buildPages
});

function buildHtml(request, reply) {
  filesystem.html(reply);
}

function buildPages(request, reply) {
  filesystem.pages(reply);
}

function addRoutes(args) {
  routes.push({
    method: 'GET',
    path: args.path + '/:id?',
    auth: args.authGET || 'authenticated',
    config: {
      handler: args.GET || function(request, reply) {
        if (request.params.id && args.getById) {
          args.getById(request, reply);
        } else {
          handlers.crud.get(args, request, reply);
        }
      }
    }
  });
  routes.push({
    method: 'POST',
    path: args.path,
    auth: args.authPOST || 'authenticated',
    config: {
      handler: args.POST || _.bind(handlers.crud.post, this, args)
    }
  });
  routes.push({
    method: 'PUT',
    path: args.path + '/:id',
    auth: args.authPUT || 'authenticated',
    config: {
      handler: args.PUT || function(request, reply) {
          handlers.crud.put(args, request, reply);
      }
    }
  });
  routes.push({
    method: 'DELETE',
    path: args.path + '/:id',
    auth: args.authDELETE || 'authenticated',
    config: {
      handler: args.DELETE || _.bind(handlers.crud.del, this, args)
    }
  });
}


module.exports = routes;
