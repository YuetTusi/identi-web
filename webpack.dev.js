const path = require('path');
const { ProvidePlugin } = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const AntdDayjsWebpackPlugin = require('antd-dayjs-webpack-plugin');
const theme = require('./src/theme/blue.json');

const devPort = 8085;

let config = {
	mode: 'development',
	entry: './src/index.tsx',
	output: {
		path: path.join(__dirname, './dist'),
		filename: 'bundle.js'
	},
	target: 'web', //调试IE11，使用['web','es5']配置，不能使用热更新
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
		static: {
			directory: path.join(__dirname, './dist')
		},
		host: '0.0.0.0',
		port: devPort,
		compress: true,
		client: {
			overlay: { errors: true }
		}
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
