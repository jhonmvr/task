const path = require('path');

const NODE_ENV = process.env.NODE_ENV;
const PORT = process.env.PORT;
const nodeExternals = require('webpack-node-externals')
module.exports = {
    name: 'express-server',
    entry: './src/app.ts',
    target: 'node',
    mode: NODE_ENV,
    externals: [nodeExternals()],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'app.js'
    },
    resolve: {
        extensions: ['.ts', '.js']
    },
    module: {
        rules: [{
                test: /\.(js)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.ts$/,
                use: ['ts-loader']


            }
        ]
    }
}
