const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const TerserPlugin = require('terser-webpack-plugin');

exports.webpackDev = {
	mode: 'development',
	plugins: [
		new BundleAnalyzerPlugin({
			openAnalyzer: false
		})
	],
	output: {
		filename: 'main.js',
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /(node_modules)/,
				loader: 'babel-loader',
				query: {
					presets: [
						[
							'@babel/preset-env'
						],
					],
				},
			},
		],
	}
};

exports.webpackProd = {
	mode: 'production',
	output: {
		filename: 'main.js',
	},
	plugins: [
		new TerserPlugin({
			parallel: true,
			terserOptions: {
				ecma: 6,
			},
		})
	],
	performance: {
		hints: false
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /(node_modules)/,
				loader: 'babel-loader',
				query: {
					presets: [
						[
							'@babel/preset-env'
						],
					],
				},
			},
		],
	}
};
