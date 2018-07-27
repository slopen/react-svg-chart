const path = require ('path');
const env = require ('process-env');
const webpack = require ('webpack');
const CopyWebpackPlugin = require ('copy-webpack-plugin');

const config = require ('config');
const projectRoot = path.resolve (__dirname, '../../');

const {PRODUCTION, devPort} = config;
const SRC_PATH = path.resolve (projectRoot, 'src');
const BUILD_PATH = path.resolve (projectRoot, 'build/client');
const MODULES_PATH = path.resolve (projectRoot, 'node_modules');
const COMPONENT_MODULES_PATH = path.resolve (projectRoot, '../node_modules');

const NODE_ENV = env.get ('NODE_ENV') || 'development';

module.exports = {

	mode: NODE_ENV,

	entry: path.resolve (SRC_PATH, 'components/index.js'),

	output: {
		path: BUILD_PATH,
		filename: 'bundle.js',
		publicPath: '/'
	},

	performance: {
		hints: false
	},

	resolve: {
		extensions: ['.js'],
		modules: [
			SRC_PATH,
			MODULES_PATH,
			COMPONENT_MODULES_PATH
		]
	},

	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /(node_modules)/,
				loaders: [
					'babel-loader'
				]
			},
			{
				test: /\.woff($|\?)|\.woff2($|\?)|\.ttf($|\?)|\.eot($|\?)|\.svg($|\?)|\.(png|jpg|gif)$/,
				loader: 'url-loader'
			},
			{
				test: /\.(css|less)$/,
				use: [
					'style-loader',
					'css-loader',
					'less-loader'
				]
			},
			{
				test: /\.json$/,
				loader: 'json-loader'
			}
		],
		noParse: /lie\.js|[\s\S]*\.(svg|ttf|eot)/
	},
	node: {
		__dirname: false,
		fs: 'empty',
		net: 'empty',
		tls: 'empty'
	},
	plugins: [
		new CopyWebpackPlugin ([
			{
				from: path.resolve (SRC_PATH, 'index.html'),
				to: 'index.html'
			}
		]),
		new webpack.NoEmitOnErrorsPlugin (),
		new webpack.DefinePlugin ({
			'__DEV__': !PRODUCTION,
			'process.env': {
				'NODE_ENV': JSON.stringify (NODE_ENV),
				'ASSET_PATH': JSON.stringify ('/')
			}
		}),
		new webpack.optimize.AggressiveMergingPlugin
	],

	stats: false,

	devServer: {
		port: devPort,
		contentBase: BUILD_PATH,
		historyApiFallback: true,
		disableHostCheck: true,
		stats: 'errors-only',
		hot: true,
		inline: true,
		headers: {
			'Access-Control-Allow-Origin': '*'
		}
	},

	cache: true,
	devtool: PRODUCTION ? false : 'source-map'

}
