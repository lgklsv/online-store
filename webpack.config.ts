import path from 'path';
import { Configuration } from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';

const entryPath = path.join(__dirname, 'src', 'index.ts');
const bundlePath = path.join(__dirname, 'dist');
const htmlTemplatePath = path.join(__dirname, 'src', 'index.html');
const assetsPath = path.resolve(__dirname, 'src', 'assets');
// const faviconPath = path.join(__dirname, "src", "assets", "favicon.png"); //TODO

const config: Configuration = {
    entry: entryPath,
    output: {
        filename: '[name].bundle.js',
        path: bundlePath,
        clean: true,
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Online-store',
            alwaysWriteToDisk: true,
            template: htmlTemplatePath,
            inject: 'body',
            // favicon: faviconPath,//TODO
            clean: true,
        }),
        new CleanWebpackPlugin(),
    ],
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/i,
                loader: 'ts-loader',
                exclude: ['/node_modules/'],
            },
            {
                test: /\.s[ac]ss$/i,
                use: ['style-loader', 'css-loader', 'sass-loader'],
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
                type: 'asset',
            },
            {
                test: /\.(html)$/i,
                use: ['html-loader'],
            },
        ],
    },
    resolve: {
        extensions: ['.ts', '.js'],
        alias: { assets: assetsPath },
    },
};

export default config;
