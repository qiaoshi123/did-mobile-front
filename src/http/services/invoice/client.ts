import { GATEWAY_CONFIG, GATEWAY_NAME, runtimeEnv } from "@/config";
import { ApiRequest } from "../../core";
import { requestCommonHeaderInterceptor, responseReplaceErrorMsg } from "../../interceptors";
import { invoiceErrors } from "./errors";

/**
 * 发票服务端
 * 网关：使用 invoice 发票网关
 * @typePrefix Invoice — 类型命名前缀（如 InvoiceQueryParams、InvoiceQueryResult）
 * @functionPrefix invoice — 函数命名前缀（如 invoiceQuery、invoiceCreate）
 * @clientName invoiceClient
 * @desc baseUrl 规则：
 *   - H5 环境：`/<gateway名称标识>/invoice-platform/api/<version>`
 *   - 非 H5 环境：`<gateway具体信息>/invoice-platform/api/<version>`
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
