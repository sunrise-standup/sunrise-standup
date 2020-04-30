module.exports = async function (context, req) {
  context.res = {
    // status: 200, /* Defaults to 200 */
    body: {
      locations: [
        { name: "btholt", latitude: 47.6218, longitude: -122.291 },
        { name: "amandasilver", latitude: 47.6739, longitude: -122.1215 },
        { name: "darquewarrior", latitude: 29.7604, longitude: -95.3698 },
        { name: "burkeholland", latitude: 36.1626, longitude: -86.7816 },
        { name: "manekinekko", latitude: 48.8566, longitude: 2.3522 },
        { name: "aaronpowell", latitude: -33.868, longitude: 151.2092 },
      ],
    },
  };
};
