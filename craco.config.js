const CracoLessPlugin = require('craco-less');
const CopyPlugin = require('copy-webpack-plugin');
module.exports = {
    plugins: [
        {plugin: CracoLessPlugin},
    ],
    webpack: {
        plugins: [
            new CopyPlugin([
                'node_modules/pdfjs-dist/build/pdf.worker.js',
                'node_modules/pdfjs-dist/build/pdf.worker.js.map',
            ]),
        ],
    },
};
