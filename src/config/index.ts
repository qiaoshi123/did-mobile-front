import gateway from './gateway.json'

/** 网关名称类型 */
export type GatewayNameKey = keyof typeof gateway.gatewayConfig.dev

/** 运行环境类型 */
export type RuntimeEnvKey = keyof typeof gateway.gatewayConfig

/** 运行环境 dev | production | preview | sywl */
export const runtimeEnv: RuntimeEnvKey = gateway.runtimeEnv as RuntimeEnvKey

/** 网关名称标识 */
export const GATEWAY_NAME = gateway.gatewayName as {
    readonly app: GatewayNameKey
    readonly tdh: GatewayNameKey
    readonly invoice: GatewayNameKey
}

/** 网关地址配置（全部环境） */
export const GATEWAY_CONFIG = gateway.gatewayConfig

