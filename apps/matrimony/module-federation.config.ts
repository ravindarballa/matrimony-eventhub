import {ModuleFederationConfig} from '@nx/module-federation';

const config: ModuleFederationConfig = {
  name: 'matrimony',
  exposes: {
    './Module': './src/remote-entry.tsx',
  },
};
export default config;
