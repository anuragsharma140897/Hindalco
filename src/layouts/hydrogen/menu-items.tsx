import { routes } from '@/config/routes';
import {
  PiMapPin,
  PiListChecksBold,
  PiBellRingingFill,
  PiMapTrifold,
} from 'react-icons/pi';

// Note: do not add href in the label object, it is rendering as label
export const menuItems = [
  // label start
  {
    name: 'Overview',
  },
  // label end
  {
    name: 'Dashboard',
    href:  routes?.panel?.dashboard,
    icon: <PiListChecksBold />,
  },
  {
    name: 'Employee',
    href: routes?.panel?.employee,
    icon: <PiMapPin />,
    badge: 'New',
  },
  // {
  //   name: 'Compaction Reports',
  //   href: routes?.panel?.compactionreport,
  //   icon: <PiListChecksBold />,
  //   badge: 'New',
  // },
  // {
  //   name: 'Alerts',
  //   href: routes?.panel?.alerts,
  //   icon: <PiBellRingingFill />,
  // },
  // {
  //   name: 'Roads',
  //   href: routes?.panel?.roads,
  //   icon: <PiMapTrifold />,
  // }
];
