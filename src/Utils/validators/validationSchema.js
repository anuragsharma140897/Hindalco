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


const email = (requiredMessage = 'This field is required') => {
  let validationRules = {
    isRequired: true,
    errorMessage: requiredMessage,
    emailMessage: 'Invalid email format',
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
      if (validationRules.isRequired && (!value || !value.trim())) {
        return validationRules.errorMessage;
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        return validationRules.emailMessage;
      }
      if (validationRules.refineFunc && !validationRules.refineFunc(value)) {
        return validationRules.refineMessage;
      }
      return null;
    }
  };

  return validator;
};



const pan = (requiredMessage = 'This field is required') => {
  let validationRules = {
    isRequired: true,
    errorMessage: requiredMessage,
    panMessage: 'Invalid PAN format',
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
      if (validationRules.isRequired && (!value || !value.trim())) {
        return validationRules.errorMessage;
      }
      // PAN format: 5 letters (uppercase) followed by 4 numbers and 1 letter (uppercase)
      const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
      if (!panRegex.test(value)) {
        return validationRules.panMessage;
      }
      if (validationRules.refineFunc && !validationRules.refineFunc(value)) {
        return validationRules.refineMessage;
      }
      return null;
    }
  };

  return validator;
};


const gst = (requiredMessage = 'This field is required') => {
  let validationRules = {
    isRequired: true,
    errorMessage: requiredMessage,
    gstMessage: 'Invalid GST format',
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
      if (validationRules.isRequired && (!value || !value.trim())) {
        return validationRules.errorMessage;
      }
      // GST format: 2 digits, 10 characters PAN, 1 entity number, 1 Z, 1 check sum digit
      const gstRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
      if (!gstRegex.test(value)) {
        return validationRules.gstMessage;
      }
      if (validationRules.refineFunc && !validationRules.refineFunc(value)) {
        return validationRules.refineMessage;
      }
      return null;
    }
  };

  return validator;
};

const vat = (requiredMessage = 'This field is required') => {
  let validationRules = {
    isRequired: true,
    errorMessage: requiredMessage,
    vatMessage: 'Invalid VAT format',
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
      if (validationRules.isRequired && (!value || !value.trim())) {
        return validationRules.errorMessage;
      }
      // VAT format varies by country. This is a generic alphanumeric check.
      // You may need to adjust this based on specific country requirements.
      const vatRegex = /^[A-Z0-9]{8,15}$/;
      if (!vatRegex.test(value)) {
        return validationRules.vatMessage;
      }
      if (validationRules.refineFunc && !validationRules.refineFunc(value)) {
        return validationRules.refineMessage;
      }
      return null;
    }
  };

  return validator;
};

const tan = (requiredMessage = 'This field is required') => {
  let validationRules = {
    isRequired: true,
    errorMessage: requiredMessage,
    tanMessage: 'Invalid TAN format',
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
      if (validationRules.isRequired && (!value || !value.trim())) {
        return validationRules.errorMessage;
      }
      // TAN format: 4 letters, 5 numbers, 1 letter
      const tanRegex = /^[A-Z]{4}[0-9]{5}[A-Z]{1}$/;
      if (!tanRegex.test(value)) {
        return validationRules.tanMessage;
      }
      if (validationRules.refineFunc && !validationRules.refineFunc(value)) {
        return validationRules.refineMessage;
      }
      return null;
    }
  };

  return validator;
};
const vehicle = (requiredMessage = 'This field is required') => {
  let validationRules = {
    isRequired: true,
    errorMessage: requiredMessage,
    vehicleMessage: 'Invalid vehicle registration number format',
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
      if (validationRules.isRequired && (!value || !value.trim())) {
        return validationRules.errorMessage;
      }
      // Generic vehicle registration format: 2 letters, 2 digits, optional letters/digits (depending on country)
      // This is a simple example. You can adjust the regex for specific country formats.
      const vehicleRegex = /^[A-Z]{2}[0-9]{2}[A-Z0-9]{0,}$/;
      if (!vehicleRegex.test(value)) {
        return validationRules.vehicleMessage;
      }
      if (validationRules.refineFunc && !validationRules.refineFunc(value)) {
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
  email,
  pan,
  gst,
  vat,
  tan,
  vehicle,
  json
};

