require("dotenv").config();
const { BlobServiceClient } = require("@azure/storage-blob");

const connectionString = process.env.STORAGE_CONNECTION_STRING;
const containerName = process.env.STORAGE_CONTAINER;

module.exports.format = (blobs) => ({
  headers: { "Content-Type": "application/json" },
  body: {
    locations: blobs.map((blob) => ({
      name: blob.name,
      longitude: +blob.metadata.longitude,
      latitude: +blob.metadata.latitude,
      avatar: blob.metadata.avatar || "/github.png",
    })),
  },
});

module.exports.getPins = async function getPins() {
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

  return blobs;
};
