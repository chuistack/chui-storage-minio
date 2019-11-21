import * as storage from "./storage";
import {MINIO_ACCESS_KEY, MINIO_ENDPOINT, MINIO_SECRET_KEY,} from "./constants";

storage.install();

export const storageServerRoot = MINIO_ENDPOINT;
export const minioAccessKey = MINIO_ACCESS_KEY;
export const minioSecretKey = MINIO_SECRET_KEY;
