// set a default regex pattern for name validation that can be overridden in the environment
const NAME_PATTERN_DEFAULT = /^[A-Z][A-Za-z0-9\-]*$/;

// Uses process.env.REACT_APP_NAME_PATTERN_OVERRIDE if defined, otherwise uses default
const NAME_PATTERN_CONFIG = process.env.REACT_APP_NAME_PATTERN_OVERRIDE
  ? new RegExp(process.env.REACT_APP_NAME_PATTERN_OVERRIDE)
  : NAME_PATTERN_DEFAULT;

export {NAME_PATTERN_CONFIG};

// set a default "app" regex pattern validation error message that can be overridden in the environment
const NAME_PATTERN_VALIDATION_APP_ERROR_MSG_DEFAULT = 'Name must start capitalized and contain only alphanumeric characters or hyphens. Regex to match /^[A-Z][A-Za-z0-9-]*$/';

const NAME_PATTERN_VALIDATION_APP_ERROR_MSG_CONFIG = process.env.REACT_APP_NAME_PATTERN_VALIDATION_APP_ERROR_MSG_OVERRIDE
  ? process.env.REACT_APP_NAME_PATTERN_VALIDATION_APP_ERROR_MSG_OVERRIDE
  : NAME_PATTERN_VALIDATION_APP_ERROR_MSG_DEFAULT;

export {NAME_PATTERN_VALIDATION_APP_ERROR_MSG_CONFIG};

// set a default "group" regex pattern validation error message that can be overridden in the environment
const NAME_PATTERN_VALIDATION_GROUP_ERROR_MSG_DEFAULT = 'Name must start capitalized and contain only alphanumeric characters or hyphens. Regex to match /^[A-Z][A-Za-z0-9-]*$/';

const NAME_PATTERN_VALIDATION_GROUP_ERROR_MSG_CONFIG = process.env.REACT_APP_NAME_PATTERN_VALIDATION_GROUP_ERROR_MSG_OVERRIDE
  ? process.env.REACT_APP_NAME_PATTERN_VALIDATION_GROUP_ERROR_MSG_OVERRIDE
  : NAME_PATTERN_VALIDATION_GROUP_ERROR_MSG_DEFAULT;

export {NAME_PATTERN_VALIDATION_GROUP_ERROR_MSG_CONFIG};

// set a default "tag" regex pattern validation error message that can be overridden in the environment
const NAME_PATTERN_VALIDATION_TAG_ERROR_MSG_DEFAULT = 'Name must start capitalized and contain only alphanumeric characters or hyphens. Regex to match /^[A-Z][A-Za-z0-9-]*$/';

const NAME_PATTERN_VALIDATION_TAG_ERROR_MSG_CONFIG = process.env.REACT_APP_NAME_PATTERN_VALIDATION_TAG_ERROR_MSG_OVERRIDE
  ? process.env.REACT_APP_NAME_PATTERN_VALIDATION_TAG_ERROR_MSG_OVERRIDE
  : NAME_PATTERN_VALIDATION_TAG_ERROR_MSG_DEFAULT;

export {NAME_PATTERN_VALIDATION_TAG_ERROR_MSG_CONFIG};

// set a default set of values for UNTIL_ID_TO_LABELS that can be overridden in the environment
const UNTIL_ID_TO_LABELS_DEFAULT: Record<string, string> = {
  '43200': '12 Hours',
  '432000': '5 Days',
  '1209600': 'Two Weeks',
  '2592000': '30 Days',
  '7776000': '90 Days',
  indefinite: 'Indefinite',
  custom: 'Custom',
} as const;

// Uses process.env.REACT_APP_UNTIL_ID_TO_LABELS_OVERRIDE if defined, otherwise uses default
const UNTIL_ID_TO_LABELS_CONFIG: Record<string, string> = process.env.REACT_APP_UNTIL_ID_TO_LABELS_OVERRIDE
  ? JSON.parse(process.env.REACT_APP_UNTIL_ID_TO_LABELS_OVERRIDE)
  : UNTIL_ID_TO_LABELS_DEFAULT;

export {UNTIL_ID_TO_LABELS_CONFIG};

// set a default set of values for UNTIL_JUST_NUMERIC_ID_TO_LABELS that can be overridden in the environment
const UNTIL_JUST_NUMERIC_ID_TO_LABELS_DEFAULT: Record<string, string> = {
  '43200': '12 Hours',
  '432000': '5 Days',
  '1209600': 'Two Weeks',
  '2592000': '30 Days',
  '7776000': '90 Days',
} as const;

// Uses process.env.REACT_APP_UNTIL_JUST_NUMERIC_ID_TO_LABELS_OVERRIDE if defined, otherwise uses default
const UNTIL_JUST_NUMERIC_ID_TO_LABELS_CONFIG: Record<string, string> = process.env.REACT_APP_UNTIL_JUST_NUMERIC_ID_TO_LABELS_OVERRIDE
  ? JSON.parse(process.env.REACT_APP_UNTIL_JUST_NUMERIC_ID_TO_LABELS_OVERRIDE)
  : UNTIL_JUST_NUMERIC_ID_TO_LABELS_DEFAULT;

export {UNTIL_JUST_NUMERIC_ID_TO_LABELS_CONFIG};

// Set Default value for React form state that can be overriden
const DEFAULT_ACCESS_TIME_DEFAULT = '1209600';

// Parse and export DEFAULT_ACCESS_TIME_CONFIG
export const DEFAULT_ACCESS_TIME_CONFIG: string = process.env.REACT_APP_DEFAULT_ACCESS_TIME_OVERRIDE
  ? process.env.REACT_APP_DEFAULT_ACCESS_TIME_OVERRIDE
  : DEFAULT_ACCESS_TIME_DEFAULT;
