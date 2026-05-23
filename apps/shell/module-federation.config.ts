import { ModuleFederationConfig } from '@nx/module-federation';

const config: ModuleFederationConfig = {
  name: 'shell',
  remotes: [
    "matrimony", 
    "eventhub", 
  ],
};
export default config;
