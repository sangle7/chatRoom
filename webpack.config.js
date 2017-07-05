const webpack = require('webpack')
const path = require('path');


module.exports = {
    name: "browser",
    entry: "./client/src/js/main.jsx",
    output: {
        path: path.join(__dirname, "/client/build"),
        filename: '[name].js',
        chunkFilename: '[name]-[id].js',
        publicPath: "/build/",
    },
    devServer: {
        historyApiFallback: {
            rewrites: [{
                from: /^\/$/,
                to: '/index.html'
            }, ]
        },
        proxy: {
            "/": "http://localhost:3000"
        },
        contentBase: 'client'
    },
    devtool: 'inline-source-map',
    module: {
        loaders: [{
            test: /\.jsx?$/, // 用正则来匹配文件路径，这段意思是匹配 js 或者 jsx
            loader: 'babel-loader', // 加载模块 "babel" 是 "babel-loader" 的缩写
            include: path.join(__dirname, 'client')
        }, {
            test: /\.css$/,
            loader: 'style-loader!css-loader',
            include: path.join(__dirname, 'client')
        }, {
            test: /\.scss$/,
            loader: 'style-loader!css-loader?modules&localIdentName=[path][name]---[local]---[hash:base64:5]!sass-loader',
            include: path.join(__dirname, 'client')
        }, {
            test: /\.(png|jpg)$/,
            loader: 'url-loader?limit=25000',
            include: path.join(__dirname, 'client')
        }]
    }
}