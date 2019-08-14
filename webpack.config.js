var path = require('path');

const CSSModuleLoader = {
    loader: 'css-loader',
    options: {
        modules: true,
        sourceMap: true,
        localIdentName: '[name]__[local]___[hash:base64:5]'
    }
}

module.exports = {
    mode: 'development',
    node: {
        fs: 'empty'
    },
    entry: {
        // Список js файлов, которые считаются корневыми
        // (Для размещения на отдельных aspx страницах)
        main: ['@babel/polyfill', './src/components/main.js']
    },
    output: {
        path: path.resolve(__dirname, './public'),     // путь к каталогу выходных файлов - папка public
        publicPath: 'http://localhost:3000/public/',
        filename: "[name].bundle.js"
    },
    devtool: "source-map",
    module: {
        rules: [
            {
                test: /\.js?$/,             // определяем тип файлов
                // exclude: /(node_modules)/,  // исключаем из обработки папку node_modules
                loader: "babel-loader",     // определяем загрузчик
                options: {
                    cacheDirectory: true,
                    presets: ["@babel/preset-env", "@babel/preset-react"]    // используемые плагины
                }
            },
            {
                test: /\.css$/,
                // exclude: /(node_modules)/,
                use: ['style-loader', CSSModuleLoader]
            }
        ]
    },
    devServer: {
        contentBase: '.',
        hot: true,
        port: 3000,
        host: 'localhost',
        inline: true,
        historyApiFallback: true,
        disableHostCheck: true,
        headers: { 
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "POST, GET, PUT, DELETE, OPTIONS",
            "Access-Control-Allow-Headers": "X-Requested-With, content-type" 
        }
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                commons: {
                    test: /(node_modules)/,
                    name: 'vendors',
                    chunks: 'all'
                }
            }
        }
    }
}