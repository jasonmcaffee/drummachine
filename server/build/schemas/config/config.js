'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configSchema = undefined;

var _joi = require('joi');

var _joi2 = _interopRequireDefault(_joi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let configSchema = exports.configSchema = _joi2.default.object().required().keys({
  server: _joi2.default.object().required().keys({
    port: _joi2.default.string().required()
  }).meta({ className: 'serverConfig' }), // so hapi swagger shows non-auto-generated model name.,

  client: _joi2.default.object().required().keys({
    hapiBabelBaseline: _joi2.default.object().required().keys({
      url: _joi2.default.string().required(),
      getTimeout: _joi2.default.number().required()
    })
  }).meta({ className: 'clientConfig' })
}).meta({ className: 'configSchema' }); // so hapi swagger shows non-auto-generated model name.
//# sourceMappingURL=config.js.map