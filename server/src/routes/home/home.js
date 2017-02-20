import * as Boom from 'boom';
export default {
  method: 'GET',
  path: '/{param*}',
	handler: {
		directory: {
			path: '.',
			listing: true
		}
	},
  config: {
    description: 'write a description',
		// handler: {
		// 	directory: {
		// 		path: '../../public',
		// 		listing: true
		// 	}
		// },
  }
};
