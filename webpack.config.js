const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    mode: 'development',
    entry: {
        main: path.resolve(__dirname, './src/index.js'),
        gifts: path.resolve(__dirname, './src/menu.js'),
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: '[name].bundle.js',
        clean: true,
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader, // Извлекает CSS в отдельный файл
                    'css-loader', // Преобразует CSS в CommonJS
                    'sass-loader', // Компилирует Sass в CSS
                ],
            },
            {
                test: /\.(png|jpe?g|gif|svg)$/i,
                type: 'asset/resource',
                generator: {
                    filename: 'assets/[name][ext]', // Копирует в папку assets без изменения имен
                },
            },
            {
                test: /\.(mp4|webm|ogg|mov)$/i,
                type: 'asset/resource',
                generator: {
                    filename: 'assets/video/[name][ext]',
                },
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/index.html',
            chunks: ['main'], // Подключает только main.js к index.html
        }),
        new HtmlWebpackPlugin({
            filename: 'menu.html',
            template: './src/menu.html',
            chunks: ['menu'], // Подключает menu.js к menu.html
        }),
        new CleanWebpackPlugin(), // Очищает dist папку перед каждой сборкой
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: 'src/assets/',
                    to: 'assets',
                    noErrorOnMissing: true,
                },
            ],
        }),
        new MiniCssExtractPlugin({
            filename: '[name].bundle.css', // Название итогового файла со стилями
        }),
    ],
    devServer: {
        static: {
            directory: path.resolve(__dirname, 'dist'),
        },
        open: true, // Открывает браузер после запуска сервера
        historyApiFallback: {
            rewrites: [
                { from: /^\/menu.html/, to: '/menu.html' },
                { from: /./, to: '/index.html' },
            ],
        },
    },
};