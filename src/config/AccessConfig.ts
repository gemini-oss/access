import configDefault from './config.default.json';

type Config = typeof configDefault;

class AccessConfig {
  private static instance: AccessConfig;
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

  /**
   * Returns the singleton instance of AccessConfig.
   * @returns {AccessConfig} The singleton instance.
   */
  public static getInstance(): AccessConfig {
    if (!AccessConfig.instance) {
      AccessConfig.instance = new AccessConfig();
    }
    return AccessConfig.instance;
  }

  /**
   * Retrieves the value associated with the given key from the configuration.
   * Logs an error and returns an empty string if the key is missing or has an invalid value.
   * @param {keyof Config} key - The key to retrieve the value for.
   * @returns {Config[T]} The value associated with the key.
   */
  get<T extends keyof Config>(key: T): Config[T] {
    const value = this.config[key];
    if (value === undefined || value === null) {
      console.error(`Config key "${key}" is missing or has an invalid value.`);
      return '' as Config[T]; // Return an empty string as a default value
    }
    return value;
  }

  /**
   * Retrieves the value associated with the given key as a string.
   * Logs an error and returns an empty string if the key is missing, has an invalid value, or is an object.
   * @param {keyof Config} key - The key to retrieve the value for.
   * @returns {string} The value as a string.
   */
  getString(key: keyof Config): string {
    const value = this.get(key);
    if (value === null || value === undefined || typeof value === 'object') {
      console.error(`Config key "${key}" is missing or has an invalid value.`);
      return ''; // Return an empty string as a default value
    }
    return String(value);
  }

  /**
   * Retrieves the value associated with the given key as a number.
   * Logs an error and returns 0 if the key is missing, has an invalid value, or cannot be converted to a number.
   * @param {keyof Config} key - The key to retrieve the value for.
   * @returns {number} The value as a number.
   */
  getNumber(key: keyof Config): number {
    const value = this.get(key);
    if (typeof value !== 'number') {
      const convertedValue = Number(value);
      if (isNaN(convertedValue)) {
        console.error(`Config key "${key}" with value "${value}" is not a valid number and cannot be converted.`);
        return 0; // Return 0 as a default value
      }
      return convertedValue;
    }
    return value;
  }

  /**
   * Retrieves the value associated with the given key as a record.
   * Logs an error and returns an empty record if the key is missing, has an invalid value, or is not a record.
   * @param {keyof Config} key - The key to retrieve the value for.
   * @returns {Record<string, string>} The value as a record.
   */
  getRecord(key: keyof Config): Record<string, string> {
    const value = this.get(key);
    if (typeof value !== 'object' || value === null) {
      console.error(`Config key "${key}" is not a valid Record<string, string>.`);
      return {}; // Return an empty record as a default value
    }
    return value as Record<string, string>;
  }

  /**
   * Retrieves the value associated with the given key as an array of strings.
   * Logs an error and returns an empty array if the key is missing, has an invalid value, or is not an array of strings.
   * @param {keyof Config} key - The key to retrieve the value for.
   * @returns {string[]} The value as an array of strings.
   */
  getStringArray(key: keyof Config): string[] {
    const value = this.get(key);
    if (!Array.isArray(value) || !value.every((item) => typeof item === 'string')) {
      console.error(`Config key "${key}" is not a valid array of strings.`);
      return [];
    }
    return value;
  }
}

export default AccessConfig;
