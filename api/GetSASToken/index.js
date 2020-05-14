const getUserInfo = require("../utils/getUserInfo");

const {
  generateBlobSASQueryParameters,
  ContainerSASPermissions,
  StorageSharedKeyCredential,
} = require("@azure/storage-blob");

module.exports = async function (context, req) {
  const user = getUserInfo(req);

  const name = user && user.userDetails;

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
