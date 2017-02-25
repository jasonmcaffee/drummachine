'use strict';

/**
 * Starts the hapi server, registering all routes found in the /lib/routes folder.
 */
let startServer = (() => {
  var _ref = _asyncToGenerator(function* () {
    try {
      // Create a server with a host and port
      const server = new _hapi2.default.Server({
        connections: {
          routes: {
            files: {
              relativeTo: Path.join(__dirname, '../public')
            }
          }
        }
      });
      yield validateConfig(_config.config);
      server.connection({ port: _config.config.server.port });
      yield registerPlugins(server);
      yield loadAndRegisterRouteModules(server);

      logger.log(`starting service with configuration: ${JSON.stringify(_config.config, null, 2)}`);

      yield server.start();

      logger.log('Server running at:', server.info.uri);
    } catch (err) {
      logger.error(`error: ${err.stack}`);
    }
  });

  return function startServer() {
    return _ref.apply(this, arguments);
  };
})();

/**
 * Creates a node cluster so that each cpu core can be used.
 */


/**
 * Validates that appropriate environment variables were passed in. (
 * @param configuration - config object typically found in config/config
 */
let validateConfig = (() => {
  var _ref2 = _asyncToGenerator(function* (configuration) {
    let joiValidatePromisified = bluebird.promisify(_joi2.default.validate);
    try {
      yield joiValidatePromisified(configuration, _config2.configSchema);
    } catch (e) {
      logger.error(`Server config is not valid: ${e.message}`);
    }
  });

  return function validateConfig(_x) {
    return _ref2.apply(this, arguments);
  };
})();

/**
 * Registers all needed hapi plugins (Swagger, Vision, etc)
 * @param server - hapi server instance which will have plugins registered
 */


let registerPlugins = (() => {
  var _ref3 = _asyncToGenerator(function* (server) {
    let pluginModules = yield loadProjectPluginModules();
    let serverRegisterPromisified = bluebird.promisify(server.register.bind(server));
    return serverRegisterPromisified([_inert2.default, // Static file and directory handlers plugin for hapi.js.
    _vision2.default, // Templates rendering plugin support for hapi.js.
    {
      register: _hapiSwaggered2.default,
      options: {
        tags: {
          api: 'description'
        },
        info: {
          title: _package2.default.name,
          description: _package2.default.description,
          version: _package2.default.version
        }
      }
    }, {
      register: _hapiSwaggeredUi2.default,
      options: {
        title: _package2.default.name,
        path: '/docs',

        authorization: { // see above
          field: 'apiKey',
          scope: 'query', // header works as well
          // valuePrefix: 'bearer '// prefix incase
          defaultValue: 'demoKey',
          placeholder: 'Enter your apiKey here'
        },
        swaggerOptions: {} // see above
      }
    }].concat(pluginModules));
  });

  return function registerPlugins(_x2) {
    return _ref3.apply(this, arguments);
  };
})();

/**
 * Loads our custom plugins (such as logRequests) from the plugin dir.
 * @returns {*|Array}
 */


let loadProjectPluginModules = (() => {
  var _ref4 = _asyncToGenerator(function* () {
    let pluginFilePaths = yield glob('./plugins/**/*.js', { cwd: './build' });
    let pluginModules = pluginFilePaths.map(function (filePath) {
      let pluginModule = require(filePath); //eslint-disable-line
      return pluginModule;
    });
    return pluginModules;
  });

  return function loadProjectPluginModules() {
    return _ref4.apply(this, arguments);
  };
})();

/**
 * Finds all routes in the compiled lib/routes directory and registers them with the hapi server.
 * Route modules are expected to export default { method: 'GET', path: ...}
 * Assigns auth='jwt' for all routes, unless BYPASS_USER_AUTH is 'true' (for local dev)
 */


let loadAndRegisterRouteModules = (() => {
  var _ref5 = _asyncToGenerator(function* (server) {
    // find all route file paths
    let routeFilePaths = yield glob('./routes/**/*.js', { cwd: './build' });
    logger.log(`route files found: ${JSON.stringify(routeFilePaths, null, 2)}`);

    // load module from each file path
    let routeModules = routeFilePaths.map(function (filePath) {
      // since we can't use import anywhere but at the top, use require, and grab the .default property (ie the module)
      let routeModule = require(filePath); // eslint-disable-line

      let originalHandler = routeModule.default.config.handler;
      if (typeof routeModule.default.config.handler === 'function') {
        routeModule.default.config.handler = handlerWrapper(originalHandler);
      }
      return routeModule.default;
    });

    server.route(routeModules);
  });

  return function loadAndRegisterRouteModules(_x3) {
    return _ref5.apply(this, arguments);
  };
})();

/**
 * Wrap all handlers with this function so we don't have to do a try catch block in every handler.
 * @param originalHandler
 * @returns {function(*=, *=)}
 */


var _bluebird = require('bluebird');

var bluebird = _interopRequireWildcard(_bluebird);

var _hapi = require('hapi');

var _hapi2 = _interopRequireDefault(_hapi);

var _inert = require('inert');

var _inert2 = _interopRequireDefault(_inert);

var _vision = require('vision');

var _vision2 = _interopRequireDefault(_vision);

var _hapiSwaggered = require('hapi-swaggered');

var _hapiSwaggered2 = _interopRequireDefault(_hapiSwaggered);

var _hapiSwaggeredUi = require('hapi-swaggered-ui');

var _hapiSwaggeredUi2 = _interopRequireDefault(_hapiSwaggeredUi);

var _package = require('../package');

var _package2 = _interopRequireDefault(_package);

var _boom = require('boom');

var Boom = _interopRequireWildcard(_boom);

var _joi = require('joi');

var _joi2 = _interopRequireDefault(_joi);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _hapiAuthJwt = require('hapi-auth-jwt2');

var hapiJWT = _interopRequireWildcard(_hapiAuthJwt);

var _config = require('./config/config');

var _config2 = require('./schemas/config/config');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new bluebird.default(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return bluebird.default.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

/* eslint no-process-env: "off" */
/* eslint no-sync: "off" */
/* eslint global-require: "off" */

// allow imports/requires to use non-relative paths to load other modules.
// e.g. instead of require('../../services/health') we can use require('services/health')
process.env.NODE_PATH = __dirname;
require('module').Module._initPaths();
console.log('NODE_PATH is ' + process.env.NODE_PATH);

const glob = bluebird.default.promisify(require('glob'));

let Path = require('path');
let logger = console;function startServerCluster() {
  const cluster = require('cluster');
  const numCPUs = 1; // require('os').cpus().length;
  logger.info(`creating a server cluster for ${numCPUs} cpus`);
  if (cluster.isMaster) {
    // Fork workers.
    for (var i = 0; i < numCPUs; i++) {
      cluster.fork();
    }

    cluster.on('exit', (worker, code, signal) => {
      logger.log(`worker ${worker.process.pid} died`);
    });
  } else {
    startServer();
  }
}function handlerWrapper(originalHandler) {
  return (() => {
    var _ref6 = _asyncToGenerator(function* (req, reply) {
      try {
        let result = yield originalHandler(req, reply);
        return result;
      } catch (e) {
        let error = e instanceof Error ? e : new Error(e);
        logger.error(`Error was encountered: ${e.stack}`);
        return reply(Boom.wrap(error, 500, 'uncaught exception in handler function'));
      }
    });

    return function (_x4, _x5) {
      return _ref6.apply(this, arguments);
    };
  })();
}

// start the server
// startServer();
startServerCluster();
//# sourceMappingURL=app.js.map