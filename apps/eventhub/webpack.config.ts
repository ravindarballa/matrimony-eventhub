import { composePlugins, withNx } from '@nx/webpack';
import { withReact } from '@nx/react';
import { withModuleFederation } from '@nx/module-federation/webpack.js';
import baseConfig from './module-federation.config';

const config = { ...baseConfig };

export default composePlugins(
  withNx(),
  withReact(),
  withModuleFederation(config, { dts: false }),
  (webpackConfig) => {
    // ✅ Forces Webpack to fetch remote chunks with CORS attributes enabled
    if (webpackConfig.output) {
      webpackConfig.output.crossOriginLoading = 'anonymous';
    }
    return webpackConfig;
  }
);