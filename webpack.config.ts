// Generated using webpack-cli https://github.com/webpack/webpack-cli

import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';

const isProduction = process.env.NODE_ENV == 'production';
const entryPath = path.join(__dirname, 'src', 'index.ts');
const bundlePath = path.join(__dirname, 'dist');
const htmlTemplatePath = path.join(__dirname, 'src', 'index.html');
const assetsPath = path.resolve(__dirname, 'src', 'assets');
// const faviconPath = path.join(__dirname, "src", "assets", "favicon.png"); //TODO

const config = {
    entry: entryPath,
    mode: 'development',
    output: {
        filename: '[name].bundle.js',
        path: bundlePath,
        clean: true,
    },
    devServer: {
        static: bundlePath,
        open: true,
        host: 'localhost',
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Online-store',
            alwaysWriteToDisk: true,
            template: htmlTemplatePath,
            inject: 'body',
            // favicon: faviconPath,
            clean: true,
        }),
        new CleanWebpackPlugin(),

        // Add your plugins here
        // Learn more about plugins from https://webpack.js.org/configuration/plugins/
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

            // Add your rules for custom modules here
            // Learn more about loaders from https://webpack.js.org/loaders/
        ],
    },
    resolve: {
        extensions: ['.ts', '.js'],
        alias: { assets: assetsPath },
    },
};

// module.exports = () => {
//     if (isProduction) {
//         config.mode = 'production';
//     } else {
//         config.mode = 'development';
//     }
//     return config;
// };

export default ({ mode }: { mode: string }) => {
    if (isProduction) {
        config.mode = 'production';
    } else {
        config.mode = 'development';
    }
    return config;
};
