import defaultConfig from './config.default.json';
import {Config} from './configTypes';

let cachedConfig: Config | null = null;

export const loadConfig = (): Config => {
  if (cachedConfig) {
    return cachedConfig;
  }

  const envConfigPath = process.env.REACT_APP_CONFIG_FILE_PATH || './config.default.json';
  let envConfig = {};

  try {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', envConfigPath, false); // `false` makes the request synchronous
    xhr.send(null);

    if (xhr.status === 200) {
      envConfig = JSON.parse(xhr.responseText);
    } else {
      throw new Error(`Failed to load config from ${envConfigPath}`);
    }
  } catch (error) {
    console.warn('Environment-specific config not found or invalid. Using default config.');
    console.error('Error loading config:', error);
  }

  cachedConfig = {
    ...defaultConfig,
    ...envConfig,
  };

  return cachedConfig;
};
