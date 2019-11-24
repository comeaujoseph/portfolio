const path = require('path');

var HTMLWebpackPlugin = require('html-webpack-plugin');
var HTMLWebpackPluginConfig = new HTMLWebpackPlugin({
    template: path.resolve(__dirname, 'src', 'index.html'),
    filename: "index.html",
    inject: 'body'
});

module.exports = {
    entry: './src/index.jsx',
    output: {
        path: path.resolve(__dirname, 'build'),
        publicPath: '/',
        filename: 'bundle.js'
    },
    devtool: 'inline-source-map',
    resolve: {
	    extensions: ['.js', '.jsx', '.css']
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: 'babel-loader'
            },
            {
                test: /\.(s*)css$/,
                exclude: /node_modules/,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            }
        ]
    },
    plugins: [HTMLWebpackPluginConfig],
    stats: {
        children: false
    },
    devServer: {
        historyApiFallback: true
    }
};

