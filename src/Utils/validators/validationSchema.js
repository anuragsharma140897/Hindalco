const string = (requiredMessage = 'This field is required') => {
  let validationRules = {
    isRequired: true,
    minLength: null,
    errorMessage: requiredMessage,
    minLengthMessage: '',
    refineFunc: null,
    refineMessage: '',
  };

  const validator = {
    required: (message) => {
      validationRules.isRequired = true;
      validationRules.errorMessage = message || validationRules.errorMessage;
      return validator;
    },
    min: (minLength, message) => {
      validationRules.minLength = minLength;
      validationRules.minLengthMessage = message || `Minimum ${minLength} characters required`;
      return validator;
    },
    refine: (func, options) => {
      validationRules.refineFunc = func;
      validationRules.refineMessage = options?.message || 'Invalid value';
      return validator;
    },
    validate: (value) => {
      if (validationRules.isRequired && (!value || !value.trim())) {
        return validationRules.errorMessage;
      }
      if (validationRules.minLength && typeof value === 'string' && value.length < validationRules.minLength) {
        return validationRules.minLengthMessage;
      }
      if (validationRules.refineFunc && !validationRules.refineFunc(value)) {
        return validationRules.refineMessage;
      }
      return null;
    }
  };

  return validator;
};

const number = (requiredMessage = 'This field is required') => {
  let validationRules = {
    isRequired: true,
    minValue: null,
    maxValue: null,
    errorMessage: requiredMessage,
    refineFunc: null,
    refineMessage: '',
  };

  const validator = {
    required: (message) => {
      validationRules.isRequired = true;
      validationRules.errorMessage = message || validationRules.errorMessage;
      return validator;
    },
    min: (minValue, message) => {
      validationRules.minValue = minValue;
      validationRules.minValueMessage = message || `Minimum value is ${minValue}`;
      return validator;
    },
    max: (maxValue, message) => {
      validationRules.maxValue = maxValue;
      validationRules.maxValueMessage = message || `Maximum value is ${maxValue}`;
      return validator;
    },
    refine: (func, options) => {
      validationRules.refineFunc = func;
      validationRules.refineMessage = options?.message || 'Invalid value';
      return validator;
    },
    validate: (value) => {
      if (validationRules.isRequired && (value === undefined || value === null || value === '')) {
        return validationRules.errorMessage;
      }
      if (isNaN(value)) {
        return 'Must be a number';
      }
      if (validationRules.minValue !== null && value < validationRules.minValue) {
        return validationRules.minValueMessage;
      }
      if (validationRules.maxValue !== null && value > validationRules.maxValue) {
        return validationRules.maxValueMessage;
      }
      if (validationRules.refineFunc && !validationRules.refineFunc(value)) {
        return validationRules.refineMessage;
      }
      return null;
    }
  };

  return validator;
};

const boolean = (requiredMessage = 'This field is required') => {
  let validationRules = {
    isRequired: true,
    errorMessage: requiredMessage,
    refineFunc: null,
    refineMessage: '',
  };

  const validator = {
    required: (message) => {
      validationRules.isRequired = true;
      validationRules.errorMessage = message || validationRules.errorMessage;
      return validator;
    },
    refine: (func, options) => {
      validationRules.refineFunc = func;
      validationRules.refineMessage = options?.message || 'Invalid value';
      return validator;
    },
    validate: (value) => {
      if (validationRules.isRequired && (value === undefined || value === null)) {
        return validationRules.errorMessage;
      }
      if (typeof value !== 'boolean') {
        return 'Must be a boolean';
      }
      if (validationRules.refineFunc && !validationRules.refineFunc(value)) {
        return validationRules.refineMessage;
      }
      return null;
    }
  };

  return validator;
};
const json = (requiredMessage = 'This field is required') => {
  let validationRules = {
    isRequired: true,
    errorMessage: requiredMessage,
    refineFunc: null,
    refineMessage: '',
  };

  const validator = {
    required: (message) => {
      validationRules.isRequired = true;
      validationRules.errorMessage = message || validationRules.errorMessage;
      return validator;
    },
    refine: (func, options) => {
      validationRules.refineFunc = func;
      validationRules.refineMessage = options?.message || 'Invalid value';
      return validator;
    },
    validate: (value) => {
      if (validationRules.isRequired && (value === undefined || value === null || value === '')) {
        return validationRules.errorMessage;
      }
      
      let parsedValue;

      // Check if the value is already an object
      if (typeof value === 'object' && value !== null) {
        parsedValue = value;
      } else {
        // Try parsing the value if it's a string
        try {
          parsedValue = JSON.parse(value);
        } catch (e) {
          return 'Must be a valid JSON';
        }
      }

      // Run the refinement function if it exists
      if (validationRules.refineFunc && !validationRules.refineFunc(parsedValue)) {
        return validationRules.refineMessage;
      }
      
      return null;
    }
  };

  return validator;
};


export const validationSchema = {
  string,
  number,
  boolean,
  json
  // Add other validators like boolean, email, etc., here...
};
