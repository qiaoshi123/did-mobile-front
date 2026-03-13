import { GATEWAY_CONFIG, GATEWAY_NAME, runtimeEnv } from "@/config";
import { ApiRequest } from "../../core";
import { requestCommonHeaderInterceptor, requestAuthHeaderInterceptor, responseReplaceErrorMsg } from "../../interceptors";
import { tdhErrors } from "./errors";

/**
 * 存证服务端
 * 网关：使用tdh存证网关
 * H5环境baseUrl:"/<gateway名称标识>/tdh/api/<version>"
 * 非H5环境baseUrl规则："<gateway具体信息>/tdh/api/<version>"
 */
const version = "v1";
let baseUrl = '';
// #ifdef H5
baseUrl = `/${GATEWAY_NAME.tdh}/tdh/api/${version}`;
// #endif

// #ifndef H5
baseUrl = `${GATEWAY_CONFIG[runtimeEnv][GATEWAY_NAME.tdh]}/tdh/api/${version}`;
// #endif
const tdhClient = new ApiRequest({
    baseUrl,
    requestInterceptors: [requestCommonHeaderInterceptor, requestAuthHeaderInterceptor],
    responseInterceptors: [responseReplaceErrorMsg(tdhErrors)]
});
export { tdhClient }