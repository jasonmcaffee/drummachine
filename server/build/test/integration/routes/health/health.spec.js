'use strict';

var _webhooksClient = require('client/webhooksClient');

var webhooksClient = _interopRequireWildcard(_webhooksClient);

var _joi = require('joi');

var _joi2 = _interopRequireDefault(_joi);

var _bluebird = require('bluebird');

var bluebird = _interopRequireWildcard(_bluebird);

var _health = require('schemas/health/health');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

let validatePromisified = bluebird.promisify(_joi2.default.validate.bind(_joi2.default));

describe('health route', () => {

  it('should return health data', (() => {
    var _ref = _asyncToGenerator(function* (done) {
      let clientResult = yield webhooksClient.getHealthData('faketoken');
      yield validatePromisified(clientResult, _health.healthResponse);
      done();
    });

    return function (_x) {
      return _ref.apply(this, arguments);
    };
  })());
});
//# sourceMappingURL=health.spec.js.map