require("dotenv").config();
const useNameFromQuerystring =
  process.env.USE_NAME_FROM_QUERYSTRING &&
  process.env.USE_NAME_FROM_QUERYSTRING.toLowerCase() === "true";
// const acceptedUploaders = process.env.ACCEPTED_UPLOADERS
//   ? process.env.ACCEPTED_UPLOADERS.split(",")
//   : [];
const acceptedUploaders = [
  "btholt",
  "burkeholland",
  "fiveisprime",
  "amandasilver",
  "darquewarrior",
  "abelsquidhead",
];

const {
  generateBlobSASQueryParameters,
  ContainerSASPermissions,
  StorageSharedKeyCredential,
} = require("@azure/storage-blob");

module.exports = async function (context, req) {
  const name = useNameFromQuerystring
    ? req.params.name
    : req.headers["X-MS-CLIENT-PRINCIPAL-NAME"];

  if (!name) {
    context.res = {
      status: 401,
      body: {
        error: "user not authenticated",
      },
      headers: { "Content-Type": "application/json" },
    };
    return;
  }
  if (acceptedUploaders.length !== 0 && !acceptedUploaders.includes(name)) {
    context.res = {
      status: 403,
      body: {
        error: "user not authorized",
      },
      headers: { "Content-Type": "application/json" },
    };
    return;
  }

  const token = await generateSASToken(name);
  context.res = {
    body: { token },
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
