import { GATEWAY_CONFIG, GATEWAY_NAME, runtimeEnv } from "@/config";
import { ApiRequest } from "../../core";
import { requestCommonHeaderInterceptor, requestAuthHeaderInterceptor, responseReplaceErrorMsg } from "../../interceptors";
import { didappErrors } from "./errors";

/**
 * did-app 服务端
 * 网关：使用 app 网关
 * @typePrefix Didapp — 类型命名前缀（如 DidappLoginBody、DidappLoginResult）
 * @functionPrefix didapp — 函数命名前缀（如 didappLogin、didappGetConfig）
 * @clientName didappClient
 * @desc baseUrl 规则：
 *   - H5 环境：`/<gateway名称标识>/api/<version>/did-app`
 *   - 非 H5 环境：`<gateway具体信息>/api/<version>/did-app`
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
