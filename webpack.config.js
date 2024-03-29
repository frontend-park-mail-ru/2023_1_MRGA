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
const needAnalyze = process.env.NEED_ANALYZE === 'need';
const dontNeedClean = process.env.NEED_CLEAN === 'dontNeed';
const BundleManifestWebpackPlugin = require('bundle-manifiest-webpack-plugin')
const filename = ext => isDev ? `[name].${ext }` : `[name].[contenthash].${ext}`

// TODO: Добавить команду просмотра линтера и команду исправления ошибок. Опционально повесить на прекоммит

const optimization = () => {
    const config =  {
        splitChunks: {
            chunks: "all",
        },
    };
    if (isProd) {
        config.minimizer = [
            new CssMinimizerPlugin(),
            new TerserWebpackPlugin({
                terserOptions: {
                    sourceMap: false,
                    compress: {
                        drop_console: isProd,
                    }
                }
            })
        ];
    }
    return config;
}

const cssLoaders =  (extra) => {
    const loaders = [{
        loader: MiniCssExtractPlugin.loader,
    },
        {
            loader: 'css-loader',
            options: {
                sourceMap: isDev,
                url: false,
                esModule: false
            }
        },
        {
            loader: 'resolve-url-loader',
            options: {
                sourceMap: true
            }
        },
        {
            loader: 'postcss-loader',
            options: {
                sourceMap: true,
                postcssOptions: {
                    plugins: ['autoprefixer'],
                },
            },
        },
    ]
    // {
    //     loader: 'resolve-url-loader',
    //     options: {
    //         sourceMap: true,
    //         esModule: false
    //     },
    // }]
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
        presets: ["@babel/preset-env"],
        plugins: [["@babel/plugin-transform-react-jsx", {
            "pragma": "h",
            "pragmaFrag": "createElement"
        }]],
    }
    if (Array.isArray(presets)) {
        options.presets = [...options.presets, ...presets]
    }
    if (Array.isArray(plugins)) {
        options.plugins = [...options.plugins, ...plugins]
    }
    return options;
}

const srcRoot = 'src';
const plugins = () => {
    const plugins = [
        new HtmlWebpackPlugin({
            template: "./index.html",
            minify: {
                collapseWhitespace: isProd
            }
        }),
        new CopyWebpackPlugin({
            patterns: [ {
                from: path.resolve(__dirname, srcRoot+ '/assets/favicon.ico'),
                to:  path.resolve(__dirname, 'dist')
            },
            {
                from: path.resolve(__dirname, srcRoot+'/assets'),
                to:  path.resolve(__dirname, 'dist/assets')
            },
            ],
        }),
        new MiniCssExtractPlugin({
            filename: filename('css')
        }),
        new BundleManifestWebpackPlugin({swFilename: 'serviceWorker.js'}),
    ]
    if (!dontNeedClean) {
        plugins.push(new CleanWebpackPlugin())
    }
    if (isProd && needAnalyze) {
        plugins.push(new BundleAnalyzerPlugin({analyzerPort: 4000}))
    }
    return plugins;
}

module.exports = {
    context: path.resolve(__dirname, srcRoot),
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
        extensions: ['.js', '.ts'],
        alias: {
            'components': path.resolve(__dirname, srcRoot+'/components'),
            'pages': path.resolve(__dirname, srcRoot+'/components/pages'),
            'jsx': path.resolve(__dirname, srcRoot+'/jsx'),
            'assets': path.resolve(__dirname, srcRoot+'/assets'),
            '@': path.resolve(__dirname, srcRoot)
        }
    },
    devServer: {
        host: isDev ? "localhost": "192.168.0.45",
        port: "4545",
        historyApiFallback: true,
        allowedHosts: [
            'meetme-app.ru',
            'id.meetme-app.ru'
        ]
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
                use: cssLoaders({loader: 'sass-loader', options: {sourceMap: isDev}})
            },
            {
                test: /\.less$/,
                use: cssLoaders({loader: 'less-loader', options: {sourceMap: isDev}})
            },
            {
                test: /\.(png|jpg|svg|gif|ico)$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]',
                    outputPath: 'assets/',
                    esModule: false
                }
            },
            {
                test: /\.(ttf)$/,
                loader: 'url-loader',
                options: {
                    name: '[name].[ext]',
                    outputPath: 'assets/fonts/',
                    esModule: false
                }
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use:  jsLoaders()
            },
            {
                test: /\.(js|css)$/,
                enforce: 'pre',
                use: ['source-map-loader'],
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