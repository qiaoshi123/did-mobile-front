import { GATEWAY_CONFIG, GATEWAY_NAME, runtimeEnv } from "@/config";
import { ApiRequest } from "../../core";
import { requestCommonHeaderInterceptor, requestAuthHeaderInterceptor, responseCheckAuthInterceptor, responseReplaceErrorMsg } from "../../interceptors";
import { didErrors } from "./errors";

/**
 * did 服务端
 * 网关：使用 app 网关
 * @typePrefix Did — 类型命名前缀（如 DidGetInfoParams、DidGetInfoResult）
 * @functionPrefix did — 函数命名前缀（如 didGetInfo、didCreateUser）
 * @clientName didClient
 * @desc baseUrl 规则：
 *   - H5 环境：`/<gateway名称标识>/api/<version>/did`
 *   - 非 H5 环境：`<gateway具体信息>/api/<version>/did`
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
