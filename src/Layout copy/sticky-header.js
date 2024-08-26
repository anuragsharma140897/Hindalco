import React from 'react';
import { useIsMounted } from '../Hooks/use-is-mounted';
import { useWindowScroll } from '../Hooks/use-window-scroll';
import cn from '../Utils/class-names';

function StickyHeader({ offset = 2, className, children }) {
  const isMounted = useIsMounted();
  const windowScroll = useWindowScroll();

  return (
    <header
      className={cn(
        'sticky top-0 z-[9999] flex items-center bg-gray-0/80 p-4 backdrop-blur-xl md:px-5 lg:px-6 dark:bg-gray-50/50',
        ((isMounted && windowScroll.y) > offset ? 'card-shadow' : ''),
        className
      )}
    >
      {children}
    </header>
  );
}

export default StickyHeader;
