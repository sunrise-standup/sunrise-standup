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

  let name = user && user.userDetails;

  if (!name) {
    name = "tempuser";
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
