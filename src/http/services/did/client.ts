import { GATEWAY_CONFIG } from "@/config";
import { ApiRequest } from "../../core";
import { requestCommonHeaderInterceptor, requestAuthHeaderInterceptor, responseCheckAuthInterceptor, responseReplaceErrorMsg } from "../../interceptors";
import { didErrors } from "./errors";

/**
 * did 服务端
 * 网关：使用app网关
 * baseUrl规则：{gateway}+"/api/"+{version}+"/did"
 */
const version = "v1";
const baseUrl = `${GATEWAY_CONFIG.dev.app}/api/${version}/did`;
const didClient = new ApiRequest({
    baseUrl,
    requestInterceptors: [requestCommonHeaderInterceptor, requestAuthHeaderInterceptor],
    responseInterceptors: [responseCheckAuthInterceptor, responseReplaceErrorMsg(didErrors)]
});
export {
    didClient
}
