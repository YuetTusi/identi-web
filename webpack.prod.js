const path = require('path');
const { ProvidePlugin } = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const AntdDayjsWebpackPlugin = require('antd-dayjs-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const theme = require('./src/theme/blue.json');

let config = {
	mode: 'production',
	entry: './src/index.tsx',
	output: {
		path: path.join(__dirname, './dist'),
		filename: 'bundle.js'
	},
	target: ['web', 'es5'],
	cache: {
		name: 'prod-cache',
		type: 'filesystem',
		cacheDirectory: path.join(__dirname, '/_cache/webpack')
	},
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src')
		},
		extensions: ['.tsx', '.ts', '.js', '.json']
	},
	optimization: {
		minimize: true,
		minimizer: [
			new TerserWebpackPlugin({
				terserOptions: {
					keep_fnames: false
				}
			})
		]
	},
	module: {
		rules: [
			{
				test: /\.(ts|tsx)$/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: [
							[
								'@babel/preset-env',
								{
									useBuiltIns: 'usage',
									corejs: { version: '3' }
								}
							],
							'@babel/preset-react',
							'@babel/preset-typescript'
						],
						plugins: [['@babel/plugin-transform-runtime', { corejs: '3' }]]
					}
				},
				include: [path.join(__dirname, './src')]
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
					filename: 'images/[name]_[hash:8][ext]'
				}
			},
			{
				test: /\.(woff|woff2|ttf|otf|eot|svg)$/,
				type: 'asset/resource',
				generator: {
					filename: 'fonts/[name]_[hash:8][ext]'
				}
			}
		]
	},
	plugins: [
		new CleanWebpackPlugin({ verbose: false }),
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
		new AntdDayjsWebpackPlugin(),
		new FriendlyErrorsWebpackPlugin({
			clearConsole: true,
			compilationSuccessInfo: {
				messages: [`开发服务器已启动在本地${devPort}端口`]
			}
		})
	]
};

module.exports = config;
