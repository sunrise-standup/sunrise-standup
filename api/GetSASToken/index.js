const userUtil = require("../utils/user");

const {
  generateBlobSASQueryParameters,
  ContainerSASPermissions,
  StorageSharedKeyCredential,
} = require("@azure/storage-blob");

module.exports = async function (context, req) {

  // the req object contains info about the logged in user
  // refer to utils/getUserInfo to see how it is parsed
  const user = userUtil.getUserInfo(req);

  const name = user && user.userDetails;

  // only admin users can upload a video
  if (userUtil.isAdmin(user)) {
    const token = await generateSASToken(name);
    context.res = {
      body: { token, name },
      headers: { "Content-Type": "application/json" },
    };
  }
  else {
    context.res = {
      status: 403,
      body: {
        error: "user not authorized",
      },
      headers: { "Content-Type": "application/json" },
    };
  }
};

async function generateSASToken(name) {
  const sharedKeyCredential = new StorageSharedKeyCredential(
    process.env.STORAGE_ACCOUNT,
    process.env.STORAGE_KEY
  );

  // construct the query to get a token that allows uploading
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
