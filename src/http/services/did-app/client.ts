import { GATEWAY_CONFIG, GATEWAY_NAME, runtimeEnv } from "@/config";
import { ApiRequest } from "../../core";
import { requestCommonHeaderInterceptor, requestAuthHeaderInterceptor, responseReplaceErrorMsg } from "../../interceptors";
import { didappErrors } from "./errors";

/**
 * did app服务端
 * 网关：使用app网关
 * H5环境baseUrl: "/<gateway名称标识>/api/<version>/did-app"
 * 非H5环境baseUrl规则："<gateway具体信息>/api/<version>/did-app"
 */
const version = "v10700";
let baseUrl = '';
// #ifdef H5
baseUrl = `/${GATEWAY_NAME.app}/api/${version}/did-app`;
// #endif

// #ifndef H5
baseUrl = `${GATEWAY_CONFIG[runtimeEnv][GATEWAY_NAME.app]}/api/${version}/did-app`;
// #endif
const didappClient = new ApiRequest({
    baseUrl: baseUrl,
    requestInterceptors: [requestCommonHeaderInterceptor, requestAuthHeaderInterceptor],
    responseInterceptors: [
        responseReplaceErrorMsg(didappErrors)
    ]
});
export {
    didappClient
}
