const path = require('path');

module.exports = {
    mode: 'development',
    entry: './src/app.ts',
    output: {
        path: path.resolve(__dirname, 'static'),
        filename: 'bundle.js'
    },
    resolve: {
        extensions: ['.ts', '.js', '.json'],
        alias: {
            'handlebars' : 'handlebars/dist/handlebars.js'
        }
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: [
                    {
                        loader: 'ts-loader',
                        options: {
                            configFile: path.resolve(__dirname, 'tsconfig.json'),
                        },
                    },
                ],
                exclude: /(node_modules)/
            }
        ]
    }
};