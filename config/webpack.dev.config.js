const merge = require('webpack-merge');
const base_config = require('./webpack.base.config');
const proxyConfig = require('./proxyConfig');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const webpack = require('webpack');
const dev_config = {
    mode: 'development',
    devServer: {
        contentBase: '/',
        open: true,
        port: 8808,
        hot: true,
        https: true,
        host: 'rental-dev.myspacex.cn',
        headers: {
            'Access-Control-Allow-Origin': '*',
        },
        historyApiFallback: true,
        proxy: {
            '/api': {
                target: proxyConfig.target,
                changeOrigin: true,
                pathRewrite: {
                    '^/api': '',
                },
            },
        },
        disableHostCheck: true,
        inline: true,
    },
    plugins: [
        // new webpack.HotModuleReplacementPlugin(),
        //  new BundleAnalyzerPlugin()
    ],
};

module.exports = merge([base_config, dev_config]);
