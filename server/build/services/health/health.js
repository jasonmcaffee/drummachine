'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.service = undefined;

var _config = require('config/config');

var _os = require('os');

var os = _interopRequireWildcard(_os);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

/**
 * Service responsible for gathering server and subsystem health/status.
 * e.g. ensuring we can connect to couchbase and various other dbs.
 * @type {{health, couchbaseStatus, serverStatus, osStatus}}
 */
let service = exports.service = {

  /**
   * Returns summary of system health, including db connectivity, os info, etc.
   * @returns {Promise.<{systemOverallStatus: *, serverStatus: *, osStatus: *}>}
   */
  getHealth: (() => {
    var _ref = _asyncToGenerator(function* () {
      let serverStatus = this.serverStatus;
      let osStatus = this.osStatus;
      let subsystemStatuses = [serverStatus, osStatus];

      // iterate over each status and if one is not ok, the overall status will not be ok.
      let systemOverallStatus = subsystemStatuses.reduce(function (previous, current) {
        return {
          ok: previous.ok && current.ok
        };
      });

      let status = {
        systemOverallStatus,
        serverStatus,
        osStatus
      };

      return status;
    });

    return function getHealth() {
      return _ref.apply(this, arguments);
    };
  })(),

  /**
   * returns server status along with config
   * @returns {{ok, config: *}}
   */
  get serverStatus() {
    return {
      get ok() {
        return true;
      },
      config: _config.config
    };
  },

  /**
   * returns os info available to node's os module.
   * @returns {{ok: boolean, hostname: *, type, platform: *, arch: *, release: *, uptime: *, loadavg: *, totalmem: *, freemem: *, cpus: *, networkInterfaces: *}}
   */
  get osStatus() {
    return {
      ok: true,
      hostname: os.hostname(),
      type: os.type(),
      platform: os.platform(),
      arch: os.arch(),
      release: os.release(),
      uptime: os.uptime(),
      loadavg: os.loadavg(),
      totalmem: os.totalmem(),
      freemem: os.freemem(),
      cpus: os.cpus(),
      networkInterfaces: os.networkInterfaces()
    };
  }
};
//# sourceMappingURL=health.js.map