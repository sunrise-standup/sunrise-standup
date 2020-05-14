const Moment = require("moment");

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

  for await (const blob of containerClient.listBlobsFlat({
    includeMetadata: true,
  })) {
    blobs.push(blob);
  }

  // order the blobs by date descending
  blobs.sort((a, b) => {
    return (
      new Date(b.properties.lastModified) - new Date(a.properties.lastModified)
    );
  });

  context.res = {
    headers: { "Content-Type": "application/json" },
    body: {
      updates: blobs.map((blob) => ({
        name: blob.name,
        caption: blob.metadata ? blob.metadata.caption : "",
        video: `https://${accountName}.blob.core.windows.net/${containerName}/${encodeURIComponent(
          blob.name
        )}`,
        created: Moment(blob.properties.createdOn).fromNow(),
      })),
    },
  };
};
