const {
  BlobServiceClient,
  AnonymousCredential,
} = require("@azure/storage-blob");

async function getSASToken(name) {
  const sasBuffer = await fetch(`/api/GetSASToken?name=${name}`);
  const { token, name: nameFromApi } = await sasBuffer.json();

  return [token, nameFromApi];
}

export async function uploadVideo(video, name) {
  const account = process.env.STORAGE_ACCOUNT;
  const [sas, blobName] = await getSASToken(name);
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
  });
  console.log(
    `Upload block blob ${blobName} successfully`,
    uploadBlobResponse.requestId
  );
}
