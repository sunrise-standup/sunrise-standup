module.exports = async function (context, req) {
  context.res = {
    body: {
      clientPrincipal: {
        identityProvider: "github",
        userId: "9285929f929592r04020w0r8200",
        userDetails: "authorizeduser",
        userRoles: ["admin", "anonymous", "authenticated"],
      },
    },
  };
};
