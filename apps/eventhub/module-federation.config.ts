import {ModuleFederationConfig} from '@nx/module-federation';

const config: ModuleFederationConfig = {
  name: 'eventhub',
  exposes: {
    './Module': './src/remote-entry.tsx',
  },
};
export default config;
