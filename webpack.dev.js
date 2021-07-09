const path = require('path');
const { ProvidePlugin } = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

let config = {
	mode: 'development',
	entry: './src/index.tsx',
	output: {
		path: path.join(__dirname, './dist'),
		filename: 'bundle.js'
	},
	target: 'web',
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src')
		},
		extensions: ['.tsx', '.ts', '.js', '.json']
	},
	devServer: {
		contentBase: path.join(__dirname, './dist'),
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
				test: /\.(png|jpg|jpeg|gif|ico)$/,
				use: [
					{
						loader: 'file-loader',
						options: {
							outputPath: '/images'
						}
					}
				]
			},
			{
				test: /\.(woff|woff2|ttf|otf|eot|svg)$/,
				use: [
					{
						loader: 'file-loader',
						options: {
							outputPath: '/fonts'
						}
					}
				]
			}
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: path.join(__dirname, './template/default.html')
		}),
		new ProvidePlugin({
			$: 'jQuery',
			jQuery: 'jQuery'
		})
	]
};

module.exports = config;
