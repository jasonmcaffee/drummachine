/* eslint no-process-env: "off" */

/**
 * JSON object representing the service's configuration.
 * Environment configuration should be handled via environment variables.
 */
export let config = {
  server: {
    port: process.env.SERVER_PORT || '5009'
  },
  client: {
    hapiBabelBaseline: {
      url: process.env.HAPI_BABEL_URL || 'http://localhost:3000',
      getTimeout: 3000,
    }
  }

};
