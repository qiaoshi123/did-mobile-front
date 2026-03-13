import { GATEWAY_CONFIG, GATEWAY_NAME, runtimeEnv } from "@/config";
import { ApiRequest } from "../../core";
import { requestCommonHeaderInterceptor, requestAuthHeaderInterceptor, responseCheckAuthInterceptor, responseReplaceErrorMsg } from "../../interceptors";
import { didErrors } from "./errors";

/**
 * did 服务端
 * 网关：使用app网关
 * baseUrl规则：
 * H5环境baseUrl:"/<gateway名称标识>/api/<version>/did"
 * 非H5环境baseUrl规则："<gateway具体信息>/api/<version>/did"
 */

const version = "v1";
let baseUrl = '';
// #ifdef H5
baseUrl = `/${GATEWAY_NAME.app}/api/${version}/did`;
// #endif

// #ifndef H5
baseUrl = `${GATEWAY_CONFIG[runtimeEnv][GATEWAY_NAME.app]}/api/${version}/did`;
// #endif
const didClient = new ApiRequest({
    baseUrl,
    requestInterceptors: [requestCommonHeaderInterceptor, requestAuthHeaderInterceptor],
    responseInterceptors: [responseCheckAuthInterceptor, responseReplaceErrorMsg(didErrors)]
});
export {
    didClient
}
