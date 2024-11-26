import configDefault from './config.default.json';

type Config = typeof configDefault;

class AccessConfig {
  private readonly config: Config;

  constructor() {
    const envConfigPath = process.env.REACT_APP_CONFIG_FILE_PATH;
    let envConfig: Partial<Config> = {};

    if (envConfigPath) {
      try {
        envConfig = require(`${envConfigPath}`);
      } catch (error) {
        console.error(`Failed to load config file at ${envConfigPath}:`, error);
      }
    }

    this.config = {...configDefault, ...envConfig};
  }

  get(key: keyof Config): Config[keyof Config] {
    return this.config[key];
  }
}

export default AccessConfig;
