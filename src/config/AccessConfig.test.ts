import configDefault from './config.default.json';

describe('AccessConfig', () => {
  it('should load default config', () => {
    const AccessConfig = require('./AccessConfig').default;
    const accessConfig = new AccessConfig();
    expect(accessConfig.get('USER_FORM_DURATION_DEFAULT_VALUE')).toBe(configDefault.USER_FORM_DURATION_DEFAULT_VALUE);
    expect(accessConfig.get('USER_FORM_DURATION_OPTIONS')).toBe(configDefault.USER_FORM_DURATION_OPTIONS);
  });

  it('should override default config with env config', () => {
    process.env.REACT_APP_CONFIG_FILE_PATH = './__tests__/completeOverride.json';
    jest.resetModules();
    const AccessConfig = require('./AccessConfig').default;
    const envConfig = require('./__tests__/completeOverride.json');

    const accessConfigInstance = new AccessConfig();
    expect(accessConfigInstance.get('USER_FORM_DURATION_DEFAULT_VALUE')).toBe(
      envConfig.USER_FORM_DURATION_DEFAULT_VALUE,
    );
    expect(accessConfigInstance.get('USER_FORM_DURATION_OPTIONS')).toBe(envConfig.USER_FORM_DURATION_OPTIONS);

    // Check that TEST_OPTION is not set in configDefault, but appears in accessConfigInstance from envConfig
    // TODO: is it desirable to allow the end user to set keys in the env config that are not present in the default config?
    // @ts-ignore
    expect(configDefault.TEST_OPTION).toBeUndefined();
    expect(envConfig.TEST_OPTION).toBeDefined();
    expect(accessConfigInstance.get('TEST_OPTION')).toBe(envConfig.TEST_OPTION);
  });

  it('should handle missing env config file gracefully by using default values', () => {
    process.env.REACT_APP_CONFIG_FILE_PATH = './__tests__/nonexistent.json';
    jest.resetModules();
    const AccessConfig = require('./AccessConfig').default;

    const accessConfigInstance = new AccessConfig();
    expect(accessConfigInstance.get('USER_FORM_DURATION_DEFAULT_VALUE')).toBe(
      configDefault.USER_FORM_DURATION_DEFAULT_VALUE,
    );
  });

  it('should not override default config if env config is empty', () => {
    process.env.REACT_APP_CONFIG_FILE_PATH = './__tests__/empty.json';
    jest.resetModules();
    const AccessConfig = require('./AccessConfig').default;

    const accessConfigInstance = new AccessConfig();
    expect(accessConfigInstance.get('USER_FORM_DURATION_DEFAULT_VALUE')).toBe(
      configDefault.USER_FORM_DURATION_DEFAULT_VALUE,
    );
    expect(accessConfigInstance.get('USER_FORM_DURATION_OPTIONS')).toStrictEqual(
      configDefault.USER_FORM_DURATION_OPTIONS,
    );
  });

  it('should log an error if env config file is missing', () => {
    process.env.REACT_APP_CONFIG_FILE_PATH = './__tests__/missing.json';
    jest.resetModules();
    console.error = jest.fn();
    const AccessConfig = require('./AccessConfig').default;

    const accessConfigInstance = new AccessConfig();
    expect(console.error).toHaveBeenCalled();
    expect(accessConfigInstance.get('USER_FORM_DURATION_DEFAULT_VALUE')).toBe(
      configDefault.USER_FORM_DURATION_DEFAULT_VALUE,
    );
  });

  it('should not deep merge config file values', () => {
    process.env.REACT_APP_CONFIG_FILE_PATH = './__tests__/partialOverride.json';
    jest.resetModules();
    const AccessConfig = require('./AccessConfig').default;
    const partialOverrideConfig = require('./__tests__/partialOverride.json');

    const accessConfigInstance = new AccessConfig();
    expect(accessConfigInstance.get('USER_FORM_DURATION_OPTIONS')).toStrictEqual(
      partialOverrideConfig.USER_FORM_DURATION_OPTIONS,
    );
    expect(accessConfigInstance.get('USER_FORM_DURATION_OPTIONS')).not.toStrictEqual(
      configDefault.USER_FORM_DURATION_OPTIONS,
    );
  });
});
