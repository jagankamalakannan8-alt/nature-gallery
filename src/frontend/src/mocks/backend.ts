import type { backendInterface } from "../backend";
import { ExternalBlob } from "../backend";

const makeBlob = (url: string): ExternalBlob => ExternalBlob.fromURL(url);

const sampleImages = [
  {
    id: BigInt(1),
    blob: makeBlob("https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800"),
    filename: "mountain-dawn.jpg",
    uploadedAt: BigInt(Date.now() - 86400000),
  },
  {
    id: BigInt(2),
    blob: makeBlob("https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800"),
    filename: "forest-light.jpg",
    uploadedAt: BigInt(Date.now() - 172800000),
  },
  {
    id: BigInt(3),
    blob: makeBlob("https://images.unsplash.com/photo-1501854140801-50d01698950b?w=800"),
    filename: "aerial-nature.jpg",
    uploadedAt: BigInt(Date.now() - 259200000),
  },
  {
    id: BigInt(4),
    blob: makeBlob("https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=800"),
    filename: "valley-sunset.jpg",
    uploadedAt: BigInt(Date.now() - 345600000),
  },
  {
    id: BigInt(5),
    blob: makeBlob("https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?w=800"),
    filename: "wildflowers.jpg",
    uploadedAt: BigInt(Date.now() - 432000000),
  },
  {
    id: BigInt(6),
    blob: makeBlob("https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800"),
    filename: "golden-hour.jpg",
    uploadedAt: BigInt(Date.now() - 518400000),
  },
];

export const mockBackend: backendInterface = {
  listImages: async () => sampleImages,
  uploadImage: async (filename: string, _blob: ExternalBlob) => ({
    id: BigInt(Date.now()),
    blob: makeBlob("https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800"),
    filename,
    uploadedAt: BigInt(Date.now()),
  }),
  deleteImage: async (_id) => true,
  checkIsAdmin: async () => false,
  login: async () => false,
  _immutableObjectStorageBlobsAreLive: async (_hashes) => [],
  _immutableObjectStorageBlobsToDelete: async () => [],
  _immutableObjectStorageConfirmBlobDeletion: async (_blobs) => {},
  _immutableObjectStorageCreateCertificate: async (_blobHash) => ({
    method: "",
    blob_hash: "",
  }),
  _immutableObjectStorageRefillCashier: async (_info) => ({}),
  _immutableObjectStorageUpdateGatewayPrincipals: async () => {},
};
