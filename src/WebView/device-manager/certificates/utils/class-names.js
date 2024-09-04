import { useMemo } from 'react';

function Cn(...classNames) {
  return useMemo(() => {
    return classNames.filter(Boolean).join(' ');
  }, [classNames]);
}

export default Cn;
