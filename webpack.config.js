/// <binding ProjectOpened='Watch - Development' />

const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const WebpackNotifierPlugin = require('webpack-notifier');

module.exports = {
    entry: {
        app: "./src/app.js"
    },
    output: {
        filename: "[name].js",
        path: path.join(__dirname, "./dist")
    },
    resolve: {
        extensions: [".js", ".jsx", ".json"]
    },
    devtool: 'inline-source-map',
    devServer: {
        contentBase: ".",
        host: "localhost",
        port: 9000
    },
    module: {
        loaders: [
            {
                test: /\.(js|jsx)$/,
                loader: "babel-loader",
                exclude: /node_modules/,
                query: {
                    presets: ['es2015']
                }
            }
        ]
    },
    plugins: [
            //new UglifyJsPlugin(),
            new WebpackNotifierPlugin()
    ]
};