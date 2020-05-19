module.exports = async function (context, req) {
  // this function returns public keys for the app. Setting them here
  // does not make them secure because they can still be seen in the frontend.
  //
  // what it DOES do is make it so the entire app doesn't have to be redepoyed
  // if the keys are compromised.

  context.res = {
    // status: 200, /* Defaults to 200 */
    body: { ai_key: process.env.AI_API_KEY, map_key: process.env.MAP_KEY },
  };
};
