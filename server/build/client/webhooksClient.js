'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getHealthData = undefined;

var _unirest = require('unirest');

var rest = _interopRequireWildcard(_unirest);

var _config = require('config/config');

var _logger = require('logger');

var logger = _interopRequireWildcard(_logger);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

let hapiBabelUrl = _config.config.client.hapiBabelBaseline.url;

/**
 * HTTP GET /v1/health/data
 * Retrieves server's current health data, including config, subsystem status, os status, etc.
 * @param token
 * @returns {Promise}
 */
const getHealthData = exports.getHealthData = token => {
  return new Promise((resolve, reject) => {
    let url = hapiBabelUrl + '/v1/health/data';
    logger.log(`getting health data using url: ${url}`);
    rest.get(url).timeout(_config.config.client.hapiBabelBaseline.getTimeout).header({ 'Authorization': 'Bearer ' + token, 'Content-Type': 'application/json' }).end(result => {
      if (result.status !== 200 || result.error) {
        logger.error('Error response from hapi babel: \nStatus:', result.status, ' \nBody:', result.body);
        reject(result.error);
      } else {
        logger.log(`Response received from /v1/health/data: ${JSON.stringify(result.body)}`);
        resolve(result.body);
      }
    });
  });
};
//# sourceMappingURL=webhooksClient.js.map