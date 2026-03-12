import { GATEWAY_CONFIG } from "@/config";
import { ApiRequest } from "../../core";
import { requestCommonHeaderInterceptor, responseReplaceErrorMsg } from "../../interceptors";
import { invoiceErrors } from "./errors";

/**
 * 发票服务端
 * 网关：使用invoice发票网关
 * baseUrl规则：{gateway}+"/invoice-platform/api/"+{version}
 */

const version = "v1";
const baseUrl = `${GATEWAY_CONFIG.production.invoice}/invoice-platform/api/${version}`;
const invoiceClient = new ApiRequest({
    baseUrl,
    requestInterceptors: [requestCommonHeaderInterceptor],
    responseInterceptors: [responseReplaceErrorMsg(invoiceErrors)]
});
export {
    invoiceClient
}
