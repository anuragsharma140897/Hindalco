import { useCallback } from 'react';

const useDeleteKeys = () => {
  const deleteKeys = useCallback((obj) => (obj && typeof obj === 'object' ? Object.keys(obj).forEach(key => delete obj[key]) : obj || {}), []);
  console.log('deleteKeys', deleteKeys);
  return deleteKeys;
};

export default useDeleteKeys;
