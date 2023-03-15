const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const path = require('path')

const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;

const filename = ext => isDev ? `[name].${ext }` : `[name].[hash].${ext}`

const optimization = () => {
    const config =  {
        splitChunks: {
            chunks: "all"
        }
    };
    if (isProd) {
        config.minimizer = [
            new CssMinimizerPlugin(),
            new TerserWebpackPlugin()
        ];
    }
    return config;
}

const cssLoaders =  (extra) => {
    const loaders = [{
        loader: MiniCssExtractPlugin.loader,
        options: {}
    }, 'css-loader']
    if (extra) {
        loaders.push(extra);
    }
    return loaders;
}

const jsLoaders = () => {
    const loaders = [{
        loader: 'babel-loader',
        options: babelOptions()
    }]
    if (isDev) {
        loaders.push('eslint-loader')
    }
    return loaders;
}

const babelOptions = (presets, plugins) => {
    const options = {
        presets: ["@babel/preset-env"]
        // plugins: [["@babel/plugin-transform-react-jsx", {
        //     "pragma": "h",
        //     "pragmaFrag": "createElement"
        // }]],
    }
    if (Array.isArray(presets)) {
        options.presets = [...options.presets, ...presets]
    }
    if (Array.isArray(plugins)) {
        options.plugins = [...options.plugins, ...plugins]
    }
    return options;
}

const plugins = () => {
    const plugins = [
        new HtmlWebpackPlugin({
            template: "./index.html",
            minify: {
                collapseWhitespace: isProd
            }
        }),
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin({
            patterns: [ {
                from: path.resolve(__dirname, 'public/assets/favicon.ico'),
                to:  path.resolve(__dirname, 'dist')
            }],
        }),
        new MiniCssExtractPlugin({
            filename: filename('css')
        })
    ]
    if (isProd) {
        plugins.push(new BundleAnalyzerPlugin())
    }
    return plugins;
}

module.exports = {
    context: path.resolve(__dirname,'public'),
    mode: 'development',
    entry: {
        main: './index.js'
    },
    output: {
        filename: filename('js'),
        path: path.resolve(__dirname, 'dist')
    },
    optimization: optimization(),
    resolve: {
        extensions: ['.js'],
        alias: {
            'components': path.resolve(__dirname, 'public/components'),
            'pages': path.resolve(__dirname, 'public/components/pages')
        }
    },
    devServer: {
        host: "localhost",
        port: "3000",
        historyApiFallback: true,
    },
    devtool: isDev? 'source-map' : false,
    plugins: plugins(),
    module: {
        rules: [
            {
                test: /\.css$/,
                use: cssLoaders()
            },
            {
                test: /\.s[ac]ss$/,
                use: cssLoaders('sass-loader')
            },
            {
                test: /\.less$/,
                use: cssLoaders('less-loader')
            },
            {
                test: /\.(png|jpg|svg|gif)$/,
                use: ['file-loader']
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use:  jsLoaders()
            },
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                use:  {
                    loader: 'babel-loader',
                    options: babelOptions(["@babel/preset-typescript"])
                }
            }

        ]
    }
}