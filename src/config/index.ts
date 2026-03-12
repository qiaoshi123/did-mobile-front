
//api 多套环境配置
export const GATEWAY_CONFIG = {
    dev: {
        app: 'http://192.168.1.181:30003',
        tdh: 'http://192.168.1.76:8060',
        invoice: 'http://112.64.115.246:19986',
    },
    preview: {
        app: 'https://did-api-pre.cnbn.org.cn',
        tdh: 'https://tdh-api-pre.cnbn.org.cn:19980',
        invoice: 'http://112.64.115.246:19986',
    },
    production: {
        app: 'https://did-api.cnbn.org.cn:19996',
        tdh: 'https://tdh-api.cnbn.org.cn:19981',
        invoice: 'https://invoice.yrd-tdh.com:19976',
    },
    sywl: {
        app: "https://did-gateway-gjsywl.cnbn.org.cn",
        tdh: "https://tdh-gjsywl.cnbn.org.cn",
        invoice: "https://invoice.yrd-tdh.com:19976"
    }
}