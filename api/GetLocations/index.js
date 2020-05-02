const { getPins, format } = require("../utils/location");

module.exports = async function (context) {
  const pins = await getPins();
  context.res = format(pins);
};
