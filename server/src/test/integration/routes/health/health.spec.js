import * as webhooksClient from 'client/webhooksClient';
import Joi from 'joi';
import * as bluebird from 'bluebird';
import {healthResponse as healthResponseSchema} from 'schemas/health/health';

let validatePromisified = bluebird.promisify(Joi.validate.bind(Joi));

describe('health route', ()=>{

  it('should return health data', async (done)=>{
    let clientResult = await webhooksClient.getHealthData('faketoken');
    await validatePromisified(clientResult, healthResponseSchema);
    done();
  });

});
