const webpack = require('webpack')
const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");


module.exports = {
    name: "browser",
    entry: {
        vendor: ['react', 'react-dom', 'mobx', 'mobx-react'],
        main: "./client/src/js/main.jsx"
    },
    output: {
        path: path.join(__dirname, "/client/build"),
        filename: '[name].js',
        chunkFilename: '[name]-[id].js',
        publicPath: "/build/",
    },
    devtool: false,
    module: {
        loaders: [{
            test: /\.jsx?$/, // 用正则来匹配文件路径，这段意思是匹配 js 或者 jsx
            loader: 'babel-loader', // 加载模块 "babel" 是 "babel-loader" 的缩写
            include: path.join(__dirname, 'client')
        }, {
            test: /\.css$/,
            use: ExtractTextPlugin.extract({
                fallback: "style-loader",
                use: "css-loader"
            }),
            include: path.join(__dirname, 'client')
        }, {
            test: /\.scss$/,
            use: ExtractTextPlugin.extract({
                fallback: "style-loader",
                use: ["css-loader?modules&localIdentName=[path][name]---[local]---[hash:base64:5]", "sass-loader"]
            }),
            include: path.join(__dirname, 'client')
        }, {
            test: /\.(png|jpg)$/,
            loader: 'url-loader?limit=25000',
            include: path.join(__dirname, 'client')
        }]
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            output: {
                comments: false, // remove all comments
            },
            compress: {
                warnings: false
            }
        }),
        new webpack.optimize.CommonsChunkPlugin({
            names: ['vendor', 'manifest'], // 指定公共 bundle 的名字。
        }),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        }),
        new ExtractTextPlugin("styles.css"),
    ]
}
