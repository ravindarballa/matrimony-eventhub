import { composePlugins, withNx } from '@nx/webpack';
import { withReact } from '@nx/react';
import { withModuleFederation } from '@nx/module-federation/webpack.js';
import 'webpack-dev-server';
import baseConfig from './module-federation.config';

const config = {
  ...baseConfig,
};

// Core plugins configuration
export default composePlugins(
  withNx(), 
  withReact(), 
  withModuleFederation(config, { dts: false }),
  
  // ✅ Explicitly append CORS headers to the devServer configuration object
  (webpackConfig) => {
    if (webpackConfig.devServer) {
      webpackConfig.devServer.headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
        'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization',
      };
    }
    return webpackConfig;
  }
);