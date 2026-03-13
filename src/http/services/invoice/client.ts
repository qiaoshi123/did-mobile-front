import { GATEWAY_CONFIG, GATEWAY_NAME, runtimeEnv } from "@/config";
import { ApiRequest } from "../../core";
import { requestCommonHeaderInterceptor, responseReplaceErrorMsg } from "../../interceptors";
import { invoiceErrors } from "./errors";

/**
 * 发票服务端
 * 网关：使用invoice发票网关
 * H5环境baseUrl: "/<gateway名称标识>/invoice-platform/api/<version>"
 * 非H5环境baseUrl规则："<gateway具体信息>/invoice-platform/api/<version>"
 */

const version = "v1";
let baseUrl = '';
// #ifdef H5
baseUrl = `/${GATEWAY_NAME.invoice}/invoice-platform/api/${version}`;
// #endif

// #ifndef H5
baseUrl = `${GATEWAY_CONFIG[runtimeEnv][GATEWAY_NAME.invoice]}/invoice-platform/api/${version}`;
// #endif
const invoiceClient = new ApiRequest({
    baseUrl,
    requestInterceptors: [requestCommonHeaderInterceptor],
    responseInterceptors: [responseReplaceErrorMsg(invoiceErrors)]
});
export {
    invoiceClient
}
