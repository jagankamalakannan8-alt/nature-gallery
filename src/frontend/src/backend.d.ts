import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export class ExternalBlob {
    getBytes(): Promise<Uint8Array<ArrayBuffer>>;
    getDirectURL(): string;
    static fromURL(url: string): ExternalBlob;
    static fromBytes(blob: Uint8Array<ArrayBuffer>): ExternalBlob;
    withUploadProgress(onProgress: (percentage: number) => void): ExternalBlob;
}
export type Timestamp = bigint;
export interface Image {
    id: ImageId;
    blob: ExternalBlob;
    filename: string;
    uploadedAt: Timestamp;
}
export type ImageId = bigint;
export interface backendInterface {
    checkIsAdmin(): Promise<boolean>;
    deleteImage(id: ImageId): Promise<boolean>;
    listImages(): Promise<Array<Image>>;
    login(): Promise<boolean>;
    uploadImage(filename: string, blob: ExternalBlob): Promise<Image>;
}
