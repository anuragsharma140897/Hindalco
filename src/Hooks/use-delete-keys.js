import { useCallback } from 'react';

const useDeleteKeys = () => {
  const deleteKeys = useCallback((obj) => {
    if (obj === undefined) return {}; // Return empty object if undefined is passed
    if (obj && typeof obj === 'object') {
      Object.keys(obj).forEach(key => delete obj[key]);
    }
    return obj || {}; // Return the original object or empty object if it's falsy
  }, []);

  return deleteKeys;
};

export default useDeleteKeys;
