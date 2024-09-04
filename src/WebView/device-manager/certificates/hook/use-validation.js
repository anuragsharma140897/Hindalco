// useValidation.js

import { useState } from 'react';

const useValidation = (schema) => {
  const [errors, setErrors] = useState({});

  const validate = (values) => {
    let tempErrors = {};
    Object.keys(schema).forEach((key) => {
      const validation = schema[key];
      const error = validation.validate(values[key]);
      if (error) {
        tempErrors[key] = error;
      }
    });
    setErrors(tempErrors);
    return tempErrors;
  };

  return { errors, validate };
};

export default useValidation;
