import * as k8s from "@pulumi/kubernetes";
import {MINIO_ACCESS_KEY, MINIO_ENDPOINT, MINIO_RELEASE_NAME, MINIO_SECRET_KEY, MINIO_TLS_SECRET,} from "../constants";
import {Chui} from "@chuistack/chui-lib";

const {Ingress} = Chui.App;

const configureMinio = () => {
    return new k8s.helm.v2.Chart(
        MINIO_RELEASE_NAME,
        {
            "repo": "stable",
            "chart": "minio",
            "version": "2.5.16",
            "values": {
                "mode": "distributed",
                "accessKey": MINIO_ACCESS_KEY,
                "secretKey": MINIO_SECRET_KEY,
                // "persistence": {
                //     "size": "5Gi",
                // },
                "ingress": {
                    "enabled": true,
                    "annotations": {
                        ...Ingress.getIngressClassAnnotation(),
                        ...(
                            Chui.Environment.getEnv() === "production" ?
                                Ingress.getProductionClusterIssuerAnnotation() :
                                Ingress.getStagingClusterIssuerAnnotation()
                        ),
                    },
                    "hosts": [
                        MINIO_ENDPOINT
                    ],
                    "tls": [
                        {
                            "hosts": [
                                MINIO_ENDPOINT
                            ],
                            "secretName": MINIO_TLS_SECRET,
                        }
                    ]
                },
                "resources": {
                    "requests": {
                        "memory": "128Mi",
                        "cpu": "50m"
                    }
                },
            },
        },
    );
};

export const install = () => {
    return configureMinio();
};