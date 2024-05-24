import { routes } from '@/config/routes';
import { PiMapPin, PiListChecksBold, PiBarcode, PiBookOpenText, PiBatteryVerticalHigh } from 'react-icons/pi';
import { LiaClipboardListSolid } from "react-icons/lia";
import { TbDeviceIpadHorizontalPin } from "react-icons/tb";
import { VscGraph } from "react-icons/vsc";
import { FaUsersCog } from "react-icons/fa";




export const menuItems = [
  { name: 'Overview' },
  { name: 'Dashboard', href: routes?.panel?.dashboard, icon: <PiListChecksBold /> },
  { name: 'User Management', href: '#', icon: <FaUsersCog />, badge: 'New',
    dropdownItems: [
      { name: 'Users', href: routes?.panel?.userManagement?.users },
      { name: 'Roles and Permission', href: routes?.panel?.userManagement?.rolesAndPermission }
    ],
  },
  { name: 'Location Mapping', href: '#', icon: <PiMapPin />,
    dropdownItems: [
      { name: 'Units', href: routes?.panel?.locationMapping?.units },
      { name: 'Buildings', href: routes?.panel?.locationMapping?.buildings },
      { name: 'Mapping', href: routes?.panel?.locationMapping?.mapping },
    ],
  }, {
    name: 'Device Management',
    href: '#',
    icon: <PiBarcode />,
    dropdownItems: [
      { name: 'Reader', href: routes?.panel?.deviceManagement?.readers },
      { name: 'Reader Action', href: routes?.panel?.deviceManagement?.readerAction },
      { name: 'Placement', href: routes?.panel?.deviceManagement?.placement },
      { name: 'Reader Type', href: routes?.panel?.deviceManagement?.readerType },
      { name: 'Reader Health', href: routes?.panel?.deviceManagement?.readerHealth, icon : <PiBatteryVerticalHigh/> },
      { name: 'Reader Replacement', href: routes?.panel?.deviceManagement?.readerReplacement }
    ],
  }, {
    name: 'Inventory Management',
    href: routes?.panel?.inventoryManagement,
    icon: <PiBookOpenText />,
  }, {
    name: 'Reports',
    href: routes?.panel?.reports,
    icon: <VscGraph />
  },
];
