import appApi from "./appApi";

const {
  BlobServiceClient,
  AnonymousCredential,
} = require("@azure/storage-blob");

// this function uploads a video to Azure Stoage using the Azure Storage JavaScript SDK
async function uploadVideo(video, caption, longitude, latitude, avatar) {
  const account = process.env.STORAGE_ACCOUNT;
  const [sas, blobName] = await appApi.getToken();
  const containerName = process.env.STORAGE_CONTAINER;

  const blobServiceClient = new BlobServiceClient(
    `https://${account}.blob.core.windows.net?${sas}`,
    new AnonymousCredential()
  );

  const containerClient = blobServiceClient.getContainerClient(containerName);
  const blockBlobClient = containerClient.getBlockBlobClient(blobName);
  const uploadBlobResponse = await blockBlobClient.uploadBrowserData(video, {
    onProgress: console.log,
    blobHTTPHeaders: {
      blobContentType: video.type,
    },
    metadata: {
      caption,
      longitude: longitude.toFixed(1),
      latitude: latitude.toFixed(1),
      avatar,
    },
  });
  console.log(
    `Upload block blob ${blobName} successfully`,
    uploadBlobResponse.requestId
  );
}

export default { uploadVideo };
