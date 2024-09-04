import { useMemo } from 'react';

const useLastPathname = (pathname, separator = '-', replaceWith = ' ', capitalize = false) => {
  const lastPart = useMemo(() => {
    if (!pathname) return '';
    const splitedText = pathname.split('/');
    let lastSegment = splitedText[splitedText.length - 1] || '';

    // Replace separator with replaceWith
    if (separator && replaceWith) {
      lastSegment = lastSegment.replace(new RegExp(separator, 'g'), replaceWith);
    }

    // Capitalize each word if capitalize is true
    if (capitalize) {
      lastSegment = lastSegment.split(' ').map(word => {
        return word.charAt(0).toUpperCase() + word.slice(1);
      }).join(' ');
    }

    return lastSegment;
  }, [pathname, separator, replaceWith, capitalize]);

  return lastPart;

};

export default useLastPathname;
