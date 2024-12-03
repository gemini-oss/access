const CracoAlias = require('react-app-alias');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');

module.exports = {
  plugins: [
    {
      plugin: CracoAlias,
      options: {
        source: 'tsconfig',
        tsConfigPath: './tsconfig.paths.json',
      },
    },
  ],
  webpack: {
    alias: {
      '@mui/styled-engine': '@mui/styled-engine-sc',
    },
    plugins: {
      add: [
        new CopyWebpackPlugin({
          patterns: [
            {from: path.resolve(__dirname, 'src/config/config.default.json'), to: 'config/config.default.json'},
            ...(process.env.REACT_APP_CONFIG_FILE_PATH
              ? [
                  {
                    from: path.resolve(__dirname, process.env.REACT_APP_CONFIG_FILE_PATH),
                    to: 'config/env-config.json',
                  },
                ]
              : []),
          ],
        }),
      ],
    },
  },
};
