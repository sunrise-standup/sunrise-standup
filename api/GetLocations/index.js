require("dotenv").config();
const { BlobServiceClient } = require("@azure/storage-blob");

module.exports = async function getBlobs(context, req) {
  const connectionString = process.env.STORAGE_CONNECTION_STRING;
  const containerName = process.env.STORAGE_CONTAINER;

  const blobServiceClient = BlobServiceClient.fromConnectionString(
    connectionString
  );

  const containerClient = await blobServiceClient.getContainerClient(
    containerName
  );

  const blobs = [];

  for await (const blob of containerClient.listBlobsFlat({
    includeMetadata: true,
  })) {
    if (blob.metadata && blob.metadata.longitude) {
      blobs.push(blob);
    }
  }

  context.res = {
    headers: { "Content-Type": "application/json" },
    body: {
      updates: blobs.map((blob) => ({
        name: blob.name,
        longitude: +blob.metadata.longitude,
        latitude: +blob.metadata.latitude,
      })),
    },
  };
};
