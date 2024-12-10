const CracoAlias = require('react-app-alias');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');

module.exports = {
  plugins: [
    {
      plugin: CracoAlias,
      options: {
        source: 'tsconfig',
        /* tsConfigPath should point to the file where "paths" are specified */
        tsConfigPath: './tsconfig.paths.json',
      },
    },
  ],
  webpack: {
    alias: {
      '@mui/styled-engine': '@mui/styled-engine-sc',
    },
    plugins: [
      new CopyWebpackPlugin({
        patterns: [
          {
            from: path.resolve(__dirname, 'src/config/config.default.json'),
            to: path.resolve(__dirname, 'build'),
          },
          ...(process.env.REACT_APP_CONFIG_FILE_PATH
            ? [
                {
                  from: process.env.REACT_APP_CONFIG_FILE_PATH,
                  to: path.resolve(__dirname, 'build', path.basename(process.env.REACT_APP_CONFIG_FILE_PATH)),
                },
              ]
            : []),
        ],
      }),
    ],
  },
};
