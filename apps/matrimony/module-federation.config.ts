import {ModuleFederationConfig} from '@nx/module-federation';

const config: ModuleFederationConfig = {
  name: 'matrimony',
  exposes: {
    './Module': './src/remote-entry.tsx',
    './CreateProfile': './src/app/pages/CreateProfile.tsx',
  },
};
export default config;
