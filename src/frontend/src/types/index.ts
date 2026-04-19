import type { ExternalBlob, ImageId, Timestamp } from "../backend.d";

export interface Image {
  id: ImageId;
  blob: ExternalBlob;
  filename: string;
  uploadedAt: Timestamp;
}

export type UploadStatus = "idle" | "uploading" | "success" | "error";

export interface UploadState {
  status: UploadStatus;
  progress: number;
  error?: string;
}
