// validationSchema.js

const string = (requiredMessage = 'This field is required') => {
    let validationRules = {
      isRequired: true,
      minLength: null,
      errorMessage: requiredMessage,
      minLengthMessage: '',
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
      validate: (value) => {
        // Check for undefined or null value
        if (validationRules.isRequired && (!value || !value.trim())) {
          return validationRules.errorMessage;
        }
        // Ensure the value is a string before checking length
        if (validationRules.minLength && typeof value === 'string' && value.length < validationRules.minLength) {
          return validationRules.minLengthMessage;
        }
        return null;
      }
    };
  
    return validator;
  };
  
  const number = (requiredMessage = 'This field is required') => {
    let validationRules = {
      isRequired: true,
      errorMessage: requiredMessage,
      minLengthMessage: '',
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
      validate: (value) => {
        if (validationRules.isRequired && (value === undefined || value === null || value === '')) {
          return validationRules.errorMessage;
        }
        if (isNaN(value)) {
          return 'Must be a number';
        }
        // Ensure the value is a string before checking length
        if (validationRules.minLength && typeof value === 'string' && value.length < validationRules.minLength) {
          return validationRules.minLengthMessage;
        }
        return null;
      }
    };
  
    return validator;
  };
  
  export const validationSchema = {
    string,
    number,
    // Add other validators like boolean, email, etc., here...
  };
  