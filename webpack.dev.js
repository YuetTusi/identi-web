const path = require('path');
const { ProvidePlugin } = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const AntdDayjsWebpackPlugin = require('antd-dayjs-webpack-plugin');
const theme = require('./src/theme/blue.json');

let config = {
	mode: 'development',
	entry: './src/index.tsx',
	output: {
		path: path.join(__dirname, './dist'),
		filename: 'bundle.js'
	},
	target: 'web',
	cache: {
		name: 'dev-cache',
		type: 'filesystem',
		cacheDirectory: path.join(__dirname, '/_cache/webpack')
	},
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src')
		},
		extensions: ['.tsx', '.ts', '.js', '.json']
	},
	devServer: {
		contentBase: path.join(__dirname, './dist'),
		host: '0.0.0.0',
		port: 8085,
		compress: true,
		overlay: { error: true }
	},
	module: {
		rules: [
			{
				test: /\.(ts|tsx)$/,
				use: {
					loader: 'ts-loader'
				},
				include: path.join(__dirname, './src'),
				exclude: /node_modules/
			},
			{
				test: /\.css$/,
				use: [{ loader: 'style-loader' }, { loader: 'css-loader' }]
			},
			{
				test: /\.less$/,
				use: [
					{ loader: 'style-loader' },
					{ loader: 'css-loader' },
					{
						loader: 'less-loader',
						options: {
							lessOptions: {
								modifyVars: theme,
								javascriptEnabled: true
							}
						}
					}
				]
			},
			{
				test: /\.(png|jpg|jpeg|gif|ico)$/,
				type: 'asset/resource',
				generator: {
					filename: 'images/[hash:16][ext]'
				}
			},
			{
				test: /\.(woff|woff2|ttf|otf|eot|svg)$/,
				type: 'asset/resource',
				generator: {
					filename: 'fonts/[hash:16][ext]'
				}
			}
		]
	},
	plugins: [
		new CopyWebpackPlugin({
			patterns: [
				{
					from: path.join(__dirname, './html'),
					to: path.join(__dirname, './dist')
				}
			]
		}),
		new HtmlWebpackPlugin({
			template: path.join(__dirname, './template/default.html')
		}),
		new ProvidePlugin({
			$: 'jQuery',
			jQuery: 'jQuery'
		}),
		new AntdDayjsWebpackPlugin()
	]
};

module.exports = config;
