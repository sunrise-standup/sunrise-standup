require("dotenv").config();

const {
  generateBlobSASQueryParameters,
  ContainerSASPermissions,
  StorageSharedKeyCredential,
} = require("@azure/storage-blob");

function getUserInfo(req) {
  const clientPrincipalHeader = "x-ms-client-principal";
  if (req.headers[clientPrincipalHeader] == null) {
    return null;
  }

  const buffer = Buffer.from(req.headers[clientPrincipalHeader], "base64");
  const serializedJson = buffer.toString("ascii");
  return JSON.parse(serializedJson);
}

module.exports = async function (context, req) {
  const user = getUserInfo(req);

  const name = user && user.userDetails;

  if (!name) {
    context.res = {
      status: 401,
      body: {
        headers: req.headers,
        user,
        name,
        error: "user not authenticated",
      },
      headers: { "Content-Type": "application/json" },
    };
    return;
  }

  // change this to admin when OSS'ing it
  if (!user.roles.includes("authenticated")) {
    context.res = {
      status: 403,
      body: {
        headers: req.headers,
        user,
        name,
        error: "user not authorized",
      },
      headers: { "Content-Type": "application/json" },
    };
    return;
  }

  const token = await generateSASToken(name);
  context.res = {
    body: { token, name },
    headers: { "Content-Type": "application/json" },
  };
};

async function generateSASToken(name) {
  const sharedKeyCredential = new StorageSharedKeyCredential(
    process.env.STORAGE_ACCOUNT,
    process.env.STORAGE_KEY
  );

  const containerSAS = generateBlobSASQueryParameters(
    {
      containerName: process.env.STORAGE_CONTAINER,
      permissions: ContainerSASPermissions.parse("wr"),
      startsOn: new Date(),
      blobName: name,
      expiresOn: new Date(new Date().valueOf() + 86400),
    },
    sharedKeyCredential
  );

  return containerSAS.toString();
}
