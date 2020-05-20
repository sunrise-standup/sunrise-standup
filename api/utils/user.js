function getUserInfo(req) {
  // This block sets a development user that has rights to upload
  if (process.env.AZURE_FUNCTIONS_ENVIRONMENT === "Development") {
    return {
      identityProvider: "github",
      userId: "17baeed9bn1sa3e5dbs24283",
      userDetails: "testuser",
      userRoles: ["admin", "anonymous", "authenticated"],
    };
  }

  // user information is passed in the "x-ms-client-principal" header
  const clientPrincipalHeader = "x-ms-client-principal";

  // if the user is not logged in, the header will be null
  if (req.headers[clientPrincipalHeader] == null) {
    return null;
  }

  // this reads user information from the header and into a buffer
  const buffer = Buffer.from(req.headers[clientPrincipalHeader], "base64");

  // this converts the buffer to a string
  const serializedJson = buffer.toString("ascii");

  // user information is passed as a JSON object in the header
  return JSON.parse(serializedJson);
}

function isAdmin(user) {
  return user.userRoles.find((role) => {
    return role === "admin";
  });
}

module.exports = { isAdmin, getUserInfo };
