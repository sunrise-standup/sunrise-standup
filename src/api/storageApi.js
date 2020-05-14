const {
  BlobServiceClient,
  AnonymousCredential,
} = require("@azure/storage-blob");

// this function requests a token that allows for the uploading of a video clip
async function getSASToken() {
  const sasBuffer = await fetch(`/api/GetSASToken`);
  const { token, name: nameFromApi } = await sasBuffer.json();

  return [token, nameFromApi];
}

// this function uploads a video to Azure Stoage using the Azure Storage JavaScript SDK
async function uploadVideo(video, caption, longitude, latitude, avatar) {
  const account = process.env.STORAGE_ACCOUNT;
  const [sas, blobName] = await getSASToken();
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

export default uploadVideo;
