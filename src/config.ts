interface Config {
    iconSymbolUrl: string;
    DEV: boolean;
    apiDomain: string;
    serverPort: number;
}

const config: Config = {
    iconSymbolUrl: '//at.alicdn.com/t/font_196154_bsilxx3d8mh.js',
    DEV: process.env.NODE_ENV !== 'production',
    apiDomain: '/api', //代理请求前缀
    serverPort: 8808,
};

export default config;
