'use strict';

/**
 * Runs the 'npm run docker:runintegration' script so that an env is created we can test against.
 * This function tries hard to ensure the docker container is killed should any problems arise during testing.
 * @returns {Promise}
 */
let setupIntegration = (() => {
  var _ref2 = _asyncToGenerator(function* () {
    console.log('setting up for integration testing...');
    const ls = spawn('npm', ['run', 'docker:runintegration']);

    let serverStartedPromise = new Promise(function (resolve, reject) {
      ls.stdout.on('data', function (data) {
        console.log(`stdout: ${data}`);
        if (data.indexOf('Server running') >= 0) {
          console.log('server is running. tests can begin.');
          resolve();
        }
      });

      ls.stderr.on('data', function (data) {
        console.error(`stderr: ${data}`);
        if (data.indexOf('os.tmpDir()') < 0 && data.indexOf('the input device is not a TTY') < 0) {
          // reject(data);
          // ls.kill();//force the process to die
        }
      });

      ls.on('close', function (code) {
        console.log(`child process exited with code ${code}`);
        reject({ code });
      });
    });

    // when a timeout occurs, jasmine doesn't run anything. by adding a reporter, we can know for sure when jasmine is done testing.
    jasmine.getEnv().addReporter({
      jasmineDone() {
        console.log('############################jasmine is done################');
        ls.kill();
      }
    });

    process.on('beforeExit', function () {
      console.log('process beforeExit...');
      ls.kill();
    });

    process.on('exit', function () {
      console.log('process exit...');
      ls.kill();
    });

    afterAll(function (done) {
      console.log('done with stuff');
      ls.kill();
      done();
    });

    return yield serverStartedPromise;
  });

  return function setupIntegration() {
    return _ref2.apply(this, arguments);
  };
})();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

/* eslint no-process-env: "off" */
/**
 * We don't want to use relative paths when requiring modules, so we need to set the NODE_PATH to be root/build.
 * Helpers execute before specs run.
 */
console.log('integration test preTestSetup script running...');
console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
console.log('dir: ' + __dirname);
console.log('cwd:' + process.cwd());
process.env.NODE_PATH = process.cwd() + '/build';
require('module').Module._initPaths();
console.log('NODE_PATH is ' + process.env.NODE_PATH);

const spawn = require('child_process').spawn;

beforeAll((() => {
  var _ref = _asyncToGenerator(function* (done) {
    //await setupIntegration();
    console.log('starting integration tests....');
    done();
  });

  return function (_x) {
    return _ref.apply(this, arguments);
  };
})());
//# sourceMappingURL=preTestSetup.js.map