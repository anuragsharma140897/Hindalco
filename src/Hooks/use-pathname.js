
import { useEffect, useState } from 'react';

export function usePathname() {
  return window.location.pathname;
}
