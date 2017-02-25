'use strict';

Object.defineProperty(exports, "__esModule", {
      value: true
});
exports.healthResponse = exports.systemOverallStatus = exports.osStatus = exports.serverStatus = undefined;

var _joi = require('joi');

var _joi2 = _interopRequireDefault(_joi);

var _config = require('schemas/config/config');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let serverStatus = exports.serverStatus = _joi2.default.object().required().keys({
      ok: _joi2.default.boolean().required().description('true if server and all subsystems are functioning, false otherwise').example(true),
      config: _config.configSchema
}).meta({ className: 'serverStatus' }); // so hapi swagger shows non-auto-generated model name.


let osStatus = exports.osStatus = _joi2.default.object().required().keys({
      ok: _joi2.default.boolean().required().description('true if server and all subsystems are functioning, false otherwise').example(true),

      hostname: _joi2.default.string().required().description('name of the host the service is running on').example('Jasons-Macbook.local'),

      type: _joi2.default.string().required().description('type of os').example('Darwin'),

      platform: _joi2.default.string().required().description('name of the os platform').example('darwin'),

      arch: _joi2.default.string().required().description('cpu architecture').example('x64'),

      release: _joi2.default.string().required().description('os release version').example('15.6.0'),

      uptime: _joi2.default.number().required().description('how long the system has been running for').example(349174),

      loadavg: _joi2.default.array().required().description('load times for the system').example([1.6650390625, 1.92578125, 1.88427734375]),

      totalmem: _joi2.default.number().required().description('total memory available to the os').example(17179869184),

      freemem: _joi2.default.number().required().description('free memory available to the os').example(944484352),

      cpus: _joi2.default.array().required().description('cpu info').example([{
            model: 'Intel(R) Core(TM) i7-4770HQ CPU @ 2.20GHz',
            speed: 2200,
            times: {
                  user: 6358970,
                  nice: 0,
                  sys: 7772390,
                  idle: 72638900,
                  irq: 0
            }
      }]),

      networkInterfaces: _joi2.default.object().required().description('network interfaces available to the os').example({
            lo0: [{
                  address: '::1',
                  netmask: 'ffff:ffff:ffff:ffff:ffff:ffff:ffff:ffff',
                  family: 'IPv6',
                  mac: '00:00:00:00:00:00',
                  scopeid: 0,
                  internal: true
            }]
      })

}).meta({ className: 'osStatus' }); // so hapi swagger shows non-auto-generated model name.

let systemOverallStatus = exports.systemOverallStatus = _joi2.default.object().keys({
      ok: _joi2.default.boolean().required().description('true if server and all subsystems are functioning, false otherwise').example(true)
}).meta({ className: 'systemOverallStatus' }); // so hapi swagger shows non-auto-generated model name.

let healthResponse = exports.healthResponse = _joi2.default.object().required().keys({
      serverStatus,
      systemOverallStatus,
      osStatus
}).meta({ className: 'healthResponse' }); // so hapi swagger shows non-auto-generated model name.
//# sourceMappingURL=health.js.map