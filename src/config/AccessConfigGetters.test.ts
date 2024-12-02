import AccessConfig from './AccessConfig';
import configDefault from './__tests__/testGetters.default.json';

describe('AccessConfig', () => {
  let accessConfig: AccessConfig;

  beforeEach(() => {
    process.env.REACT_APP_CONFIG_FILE_PATH = './__tests__/testGetters.default.json';
    jest.resetModules();
    const AccessConfig = require('./AccessConfig').default;
    accessConfig = AccessConfig.getInstance();
  });

  afterEach(() => {
    jest.resetModules();
    delete process.env.REACT_APP_CONFIG_FILE_PATH;
  });

  it('should return the correct string value for SOME_STRING', () => {
    expect(accessConfig.getString('SOME_STRING')).toBe('defaultString');
  });

  it('should convert SOME_NUMBER to a string', () => {
    expect(accessConfig.getString('SOME_NUMBER')).toBe('42');
  });

  it('should retrieve SOME_NUMBER as a number', () => {
    expect(accessConfig.getNumber('SOME_NUMBER')).toBe(42);
  });

  it('should retrieve SOME_DECIMAL as a number', () => {
    expect(accessConfig.getNumber('SOME_DECIMAL')).toBe(3.12159);
  });

  it('should retrieve SOME_NUMBER_AS_STRING as a number', () => {
    expect(accessConfig.getNumber('SOME_NUMBER_AS_STRING')).toBe(42);
  });

  it('should return an empty string if the key is missing or has an invalid value', () => {
    console.error = jest.fn();
    expect(accessConfig.getString('MISSING_KEY')).toBe('');
    expect(console.error).toHaveBeenCalled();
  });

  it('should return the correct string value from the config', () => {
    expect(accessConfig.getString('SOME_STRING')).toBe('defaultString');
  });

  it('should return an empty string if the value is not a string', () => {
    console.error = jest.fn();
    expect(accessConfig.getString('USER_FORM_DURATION_OPTIONS')).toBe('');
    expect(console.error).toHaveBeenCalled();
  });

  it('should return 0 if the key is missing or has an invalid value', () => {
    console.error = jest.fn();
    expect(accessConfig.getNumber('MISSING_KEY')).toBe(0);
    expect(console.error).toHaveBeenCalled();
  });

  it('should return the correct number value from the config', () => {
    expect(accessConfig.getNumber('SOME_NUMBER')).toBe(42);
  });

  it('should return 0 if the value is not a number', () => {
    console.error = jest.fn();
    expect(accessConfig.getNumber('SOME_STRING')).toBe(0);
    expect(console.error).toHaveBeenCalled();
  });

  it('should return an empty record if the key is missing or has an invalid value', () => {
    console.error = jest.fn();
    expect(accessConfig.getRecord('MISSING_KEY')).toEqual({});
    expect(console.error).toHaveBeenCalled();
  });

  it('should return the correct record value from the config', () => {
    expect(accessConfig.getRecord('USER_FORM_DURATION_OPTIONS')).toEqual(configDefault.USER_FORM_DURATION_OPTIONS);
  });

  it('should return an empty record if the value is not a record', () => {
    console.error = jest.fn();
    expect(accessConfig.getRecord('SOME_STRING')).toEqual({});
    expect(console.error).toHaveBeenCalled();
  });

  it('should return the correct array of strings for SOME_ARRAY', () => {
    expect(accessConfig.getStringArray('SOME_ARRAY')).toEqual(['a', 'b', 'c']);
  });

  it('should return an empty array if the value is not an array of strings (NOT_AN_ARRAY)', () => {
    console.error = jest.fn();
    expect(accessConfig.getStringArray('NOT_AN_ARRAY')).toEqual([]);
    expect(console.error).toHaveBeenCalled();
  });

  it('should return an empty array if the value is an invalid array (INVALID_ARRAY)', () => {
    console.error = jest.fn();
    expect(accessConfig.getStringArray('INVALID_ARRAY')).toEqual([]);
    expect(console.error).toHaveBeenCalled();
  });
});
