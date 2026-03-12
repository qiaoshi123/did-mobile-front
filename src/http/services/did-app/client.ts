import { GATEWAY_CONFIG } from "@/config";
import { ApiRequest } from "../../core";
import { requestCommonHeaderInterceptor, requestAuthHeaderInterceptor, responseReplaceErrorMsg } from "../../interceptors";
import { didappErrors } from "./errors";

/**
 * did app服务端
 * 网关:使用app网关
 * baseUrl规则：{gateway}+"/api/"+{version}+"/did-app"
 */
const version = "v10700";
const baseUrl = `${GATEWAY_CONFIG.dev.app}/api/${version}/did-app`;
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
