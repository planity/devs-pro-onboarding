'use strict';

const webpack = require('webpack');
const path = require('path');

module.exports = {
	mode: 'development',
	devtool: 'eval',
	entry: ['@babel/polyfill', 'react-hot-loader/patch', './src/app'],
	output: {
		path: path.resolve(__dirname, '../dist/assets/'),
		filename: 'app.js',
		publicPath: 'http://localhost:2000/assets/'
	},
	resolve: {
		extensions: ['.js', '.json'],
		modules: [path.join(__dirname, '../src'), 'node_modules'],
		alias: {
			'react-dom': '@hot-loader/react-dom'
		}
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules\/.*/,
				use: ['babel-loader']
			}
		]
	},
	plugins: [
		new webpack.DefinePlugin({
			'process.env.PLANITY_UID': JSON.stringify(process.env.PLANITY_UID)
		})
	]
};
