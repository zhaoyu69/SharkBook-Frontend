// webpack.config.js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin'); // 复制静态资源
const CleanWebpackPlugin = require('clean-webpack-plugin'); // 清空打包的目录
const ExtractTextWebapckPlugin = require('extract-text-webpack-plugin'); //css文件单独提取
const webpack = require('webpack');

module.exports = {
    entry: {
        app: './src/index.js'
    },
    output: {
        filename: '[name].[hash].js',
        path: path.resolve(__dirname, 'dist'),
    },
    resolve: {
        extensions: ['.js', '.jsx', '.less', '.css', '.json'],
        // 设置别名，导入路径变得简单
        alias: {
            components: path.resolve(__dirname, 'src/components/'),
            utils: path.resolve(__dirname, 'src/utils/'),
            stores: path.resolve(__dirname, 'src/stores/'),
            services: path.resolve(__dirname, 'src/services/'),
        }
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            },
            {
                test: /\.(css|less)$/,
                exclude:[/node_modules/],
                use: ExtractTextWebapckPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]',
                        'postcss-loader',
                        'less-loader'
                    ]
                })
            },
            {
                // antd-mobile不开启css-modules
                test: /\.(css|less)$/,
                exclude: [/src/],
                use: ExtractTextWebapckPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        'css-loader?importLoaders=1',
                        'postcss-loader',
                        {
                            loader:'less-loader',
                            options: {
                                // 主题配置
                                modifyVars: {
                                    'primary-color': '#1890ff',                         // 全局主色
                                    'link-color': '#1890ff',                            // 链接色
                                    'success-color': '#52c41a',                         // 成功色
                                    'warning-color': '#faad14',                         // 警告色
                                    'error-color': '#f5222d',                           // 错误色
                                    'font-size-base': '14px',                           // 主字号
                                    'heading-color': 'rgba(0, 0, 0, .85)',              // 标题色
                                    'text-color': 'rgba(0, 0, 0, .65)',                 // 主文本色
                                    'text-color-secondary ': 'rgba(0, 0, 0, .45)',      // 次文本色
                                    'disabled-color ': 'rgba(0, 0, 0, .25)',            // 失效色
                                    'border-radius-base': '4px',                        // 组件/浮层圆角
                                    'border-color-base': '#d9d9d9',                     // 边框色
                                    'box-shadow-base': '0 2px 8px rgba(0, 0, 0, .15)',  // 浮层阴影
                                },
                                javascriptEnabled: true,
                            },
                        },
                    ]
                })
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/,
                use: [
                    // <= 1024 baseURI || > 1024 file
                    'url-loader?name=[name].[ext]&outputPath=/static/&limit=1*1024'
                ]
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname, './index.html'),
            hash: true
        }),

        // 热替换
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin(),

        // 提取css文件
        new ExtractTextWebapckPlugin({
            filename: 'css/[name].[hash].css',
            allChunks: true
        }),

        // 复制静态资源
        new CopyWebpackPlugin([
            {
                from: path.resolve(__dirname, 'static'),
                to: path.resolve(__dirname, 'dist/static'),
                ignore: ['.*']
            }
        ]),

        // 常用的库全局声明，例如lodash
        new webpack.ProvidePlugin({
            _: 'lodash',
            axios: 'axios'
        }),

        // 打包前先清空原包目录
        new CleanWebpackPlugin([path.join(__dirname, 'dist')]),
    ],
    // webpack-dev-server
    devServer: {
        contentBase: './dist',
        hot: true
    }
};