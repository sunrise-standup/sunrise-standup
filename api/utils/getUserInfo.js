function getUserInfo(req) {
  if (process.env.NODE_ENV === "development") {
    return {
      identityProvider: "github",
      userId: "2d2b76591e1643b989b01aca85445bae",
      userDetails: "btholt",
      userRoles: ["admin", "anonymous", "authenticated"],
    };
  }

  const clientPrincipalHeader = "x-ms-client-principal";
  if (req.headers[clientPrincipalHeader] == null) {
    return null;
  }
  const buffer = Buffer.from(req.headers[clientPrincipalHeader], "base64");
  const serializedJson = buffer.toString("ascii");
  return JSON.parse(serializedJson);
}

module.exports = getUserInfo;
