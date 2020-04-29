const {
  BlobServiceClient,
  AnonymousCredential,
} = require("@azure/storage-blob");

async function getSASToken() {
  const sasBuffer = await fetch(`/api/GetSASToken`);
  const { token, name: nameFromApi } = await sasBuffer.json();

  return [token, nameFromApi];
}

export async function uploadVideo(video, caption) {
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
    },
  });
  console.log(
    `Upload block blob ${blobName} successfully`,
    uploadBlobResponse.requestId
  );
}
