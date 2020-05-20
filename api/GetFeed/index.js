const Moment = require("moment");

const { BlobServiceClient } = require("@azure/storage-blob");

module.exports = async function getBlobs(context, req) {
  const connectionString = process.env.STORAGE_CONNECTION_STRING;
  const containerName = process.env.STORAGE_CONTAINER;
  const accountName = process.env.STORAGE_ACCOUNT;

  // create a new instance of blogServiceClient from the Azure Storage SDK
  const blobServiceClient = BlobServiceClient.fromConnectionString(
    connectionString
  );

  // create a new instance of the containerClient from the Azure Storage SDK
  const containerClient = await blobServiceClient.getContainerClient(
    containerName
  );

  const blobs = [];

  // list all objects in the storage container
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

  // loop over all objects in the container to create an array of new objects
  // that contains the name, caption, video URL and creation date
  const updates = blobs.map((blob) => ({
    name: blob.name,
    caption: blob.metadata ? blob.metadata.caption : "",
    video: `https://${accountName}.blob.core.windows.net/${containerName}/${encodeURIComponent(
      blob.name
    )}`,
    created: Moment(blob.properties.createdOn).fromNow()
  }));

  context.res = {
    headers: { "Content-Type": "application/json" },
    body: {
      updates: updates
    }
  };
};
