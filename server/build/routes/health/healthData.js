'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _health = require('services/health/health.js');

var _health2 = require('schemas/health/health');

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

exports.default = {
  method: 'GET',
  path: '/v1/health/data',
  config: {
    description: 'gets the system status data and returns as a json object, regardless of health status. ',
    get notes() {
      return this.description;
    },
    tags: ['api'], // api tag is for hapi swagger generation

    validate: {
      // payload: someRequestBodyPayloadSchema,
      // params: {
      //     namespace: e.g if your url was '/v1/health/{namespace}/{key}' this would validate the namespace value,
      //     key: keyJoiSchema
      // }
    },
    response: {
      schema: _health2.healthResponse
    },
    handler: (() => {
      var _ref = _asyncToGenerator(function* (request, reply) {
        let result = yield _health.service.getHealth();
        return reply(result);
      });

      return function handler(_x, _x2) {
        return _ref.apply(this, arguments);
      };
    })()
  }
};
//# sourceMappingURL=healthData.js.map