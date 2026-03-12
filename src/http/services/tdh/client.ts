import { GATEWAY_CONFIG } from "@/config";
import { ApiRequest } from "../../core";
import { requestCommonHeaderInterceptor, requestAuthHeaderInterceptor, responseReplaceErrorMsg } from "../../interceptors";
import { tdhErrors } from "./errors";

/**
 * 存证服务端
 * 网关：使用tdh存证网关
 * baseUrl规则：{gateway}+"/"+{version}+"/tdh/api"
 */
const version = "v1";
const baseUrl = `${GATEWAY_CONFIG.production.tdh}/tdh/api/${version}`;
const tdhClient = new ApiRequest({
    baseUrl,
    requestInterceptors: [requestCommonHeaderInterceptor, requestAuthHeaderInterceptor],
    responseInterceptors: [responseReplaceErrorMsg(tdhErrors)]
});
export { tdhClient }