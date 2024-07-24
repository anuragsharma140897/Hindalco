import { PiMapPin, PiListChecksBold, PiBarcode, PiBookOpenText, PiBatteryVerticalHigh, PiTrash } from 'react-icons/pi';
import { VscGraph } from "react-icons/vsc";
import { FaUsersCog } from "react-icons/fa";
import { routes } from '../config/routes';

export const menuItems = [
  { name: 'Dashboard', href: routes?.panel?.dashboard, icon: <PiListChecksBold /> },
  {
    name: 'Master', href: '#', icon: <FaUsersCog />, badge: 'New',
    dropdownItems: [
      { name: 'User Management Master', href: routes?.panel?.master?.users },
      { name: 'Role and Permission Master', href: routes?.panel?.master?.rolesAndPermission },
      { name: 'Site Master', href: routes?.panel?.master?.siteMaster },
      { name: 'Buildings Master', href: routes?.panel?.master?.buildingsMaster },
      { name: 'Reader Master', href: routes?.panel?.master?.readerMaster },
      { name: 'Reader Replacement Master', href: routes?.panel?.master?.readerReplacementMaster },
      { name: 'Reader Health Master', href: routes?.panel?.master?.readerHealthMaster },
      { name: 'Product Master', href: routes?.panel?.master?.productMaster },
      { name: 'Customer Master', href: routes?.panel?.master?.customerMaster },
      { name: 'Supplier Master', href: routes?.panel?.master?.supplierMaster },
      { name: 'General Master', href: routes?.panel?.master?.generalMaster },
      { name: 'Reader Building Mapping Master', href: routes?.panel?.master?.readerBuildingMappingMaster },
    ],
  },
  { name: 'Reports',},
  {
    name: 'Inbound', href: '#', icon: <PiMapPin />,
    dropdownItems: [
      { name: 'Inbound Order', href: routes?.panel?.inbond?.inboundOrder },
      { name: 'Web Receving', href: routes?.panel?.inbond?.webReceiving },
    ],
  },{
    name: 'Outbound', href: '#', icon: <PiMapPin />,
    dropdownItems: [
      { name: 'Outbound Order', href: routes?.panel?.outbond?.outboundOrder },
      { name: 'Web Picking', href: routes?.panel?.outbond?.webPicking },
    ],
  },
];


