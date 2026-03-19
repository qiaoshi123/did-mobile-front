import { GATEWAY_CONFIG, GATEWAY_NAME, runtimeEnv } from "@/config";
import { ApiRequest } from "../../core";
import { requestCommonHeaderInterceptor, requestAuthHeaderInterceptor, responseReplaceErrorMsg } from "../../interceptors";
import { tdhErrors } from "./errors";

/**
 * 存证服务端
 * 网关：使用 tdh 存证网关
 * @typePrefix Tdh — 类型命名前缀（如 TdhQueryFileParams、TdhQueryFileResult）
 * @functionPrefix tdh — 函数命名前缀（如 tdhQueryFile、tdhUploadFile）
 * @clientName tdhClient
 * @desc baseUrl 规则：
 *   - H5 环境：`/<gateway名称标识>/tdh/api/<version>`
 *   - 非 H5 环境：`<gateway具体信息>/tdh/api/<version>`
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