const fs = require('fs');
const path = require('path');
const util = require('util');
const readFileAsync = util.promisify(fs.readFile);

module.exports = async function (context, req) {
  // this function returns public keys for the app. Setting them here
  // does not make them secure because they can still be seen in the frontend.
  //
  // what it DOES do is make it so the entire app doesn't have to be redepoyed
  // if the keys are compromised.
  try {
    const html = await readFileAsync(path.resolve(__dirname, 'config.html'), 'utf8');
    context.res = {
      // status: 200, /* Defaults to 200 */
        body: html,
        headers: { "Content-Type" : "text/html; charset=utf-8" }
    };
  } catch (err) {
    context.log.error('ERROR', err);
    // This rethrown exception will be handled by the Functions Runtime and will only fail the individual invocation
    throw err;
  };
};