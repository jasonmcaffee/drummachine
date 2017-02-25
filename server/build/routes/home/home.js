'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _boom = require('boom');

var Boom = _interopRequireWildcard(_boom);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

exports.default = {
	method: 'GET',
	path: '/{param*}',
	handler: {
		directory: {
			path: '.',
			listing: true
		}
	},
	config: {
		description: 'write a description'
	}
};
//# sourceMappingURL=home.js.map