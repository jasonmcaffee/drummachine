'use strict';

var _health = require('services/health/health');

var _health2 = require('schemas/health/health');

var _joi = require('joi');

var _joi2 = _interopRequireDefault(_joi);

var _bluebird = require('bluebird');

var bluebird = _interopRequireWildcard(_bluebird);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

let validatePromisified = bluebird.promisify(_joi2.default.validate.bind(_joi2.default));

describe('health service', () => {

  it('should provide health data which adheres to a joi schema', _asyncToGenerator(function* () {
    let result = yield _health.service.getHealth();
    let validateResult = yield validatePromisified(result, _health2.healthResponse);
    expect(validateResult).toEqual(null);
  }));
});
//# sourceMappingURL=health.spec.js.map