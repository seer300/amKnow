module.exports = {
    devServer: {
        // open: true,//设置自动打开
        proxy: {
            //设置代理
            '/proxy': {
                target: 'http://localhost:10731',
                changeOrigin: true,
                secure: false, //如果是http接口，需要配置该参数
                pathRewrite: {
                    '^/proxy': ''
                }
            }
        }
    }
}