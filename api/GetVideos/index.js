require("dotenv").config();
const moment = require("moment");

const { BlobServiceClient } = require("@azure/storage-blob");

module.exports = async function getBlobs(context, req) {
  const connectionString = process.env.STORAGE_CONNECTION_STRING;
  const containerName = process.env.STORAGE_CONTAINER;
  const accountName = process.env.STORAGE_ACCOUNT;

  const blobServiceClient = BlobServiceClient.fromConnectionString(
    connectionString
  );

  const containerClient = await blobServiceClient.getContainerClient(
    containerName
  );

  const blobs = [];

  for await (const blob of containerClient.listBlobsFlat()) {
    blobs.push(blob);
  }

  context.res = {
    headers: { "Content-Type": "application/json" },
    body: {
      updates: blobs.map((blob) => ({
        name: blob.name,
        video: `https://${accountName}.blob.core.windows.net/${containerName}/${encodeURIComponent(
          blob.name
        )}`,
        created: moment(blob.properties.createdOn).fromNow(),
      })),
    },
  };
};
