import {Config} from "@pulumi/pulumi";
import {Chui} from "@chuistack/chui-lib";

const chui = Chui.Config.loadCurrentConfig();
const appName = Chui.Config.getCurrentAppName();

const config = new Config();

/***********************
 * STORAGE             *
 ***********************/

export const MINIO_RELEASE_NAME = Chui.Resource.buildObjectName(chui.globalAppName, 'storage', 'minio');
export const MINIO_ENDPOINT = Chui.Resource.buildEndpoint(chui.rootDomain, appName);
export const MINIO_TLS_SECRET = Chui.Resource.buildObjectName(chui.globalAppName, MINIO_RELEASE_NAME, "tls-secret");
export const MINIO_ACCESS_KEY = config.requireSecret("minioAccessKey");
export const MINIO_SECRET_KEY = config.requireSecret("minioSecretKey");

