import { PiMapPin, PiListChecksBold, PiBarcode, PiBookOpenText, PiBatteryVerticalHigh, PiTrash } from 'react-icons/pi';
import { RxDashboard } from "react-icons/rx";

import { FaUsersCog } from "react-icons/fa";
import { routes } from '../config/routes';
import UserManagementIcon from '../Constant/Icons/user-management-icon';
import RolePermissionIcon from '../Constant/Icons/role-permission-icon';
import SiteMasterIcon from '../Constant/Icons/site-master-icon';
import BuildingsMasterIcon from '../Constant/Icons/building-master-icon';
import ReaderMasterIcon from '../Constant/Icons/reader-master-icon';
import ReaderReplacementMasterIcon from '../Constant/Icons/reader-replacement-master-icon';
import ReaderHealthMasterIcon from '../Constant/Icons/reader-health-master-icon';
import ProductMasterIcon from '../Constant/Icons/product-master-icon';
import CustomerMasterIcon from '../Constant/Icons/coustumer-master-icon';
import SupplierMasterIcon from '../Constant/Icons/supplier-master-icon';
import GeneralMasterIcon from '../Constant/Icons/general-master-icon';
import ReaderBuildingMappingMasterIcon from '../Constant/Icons/reader-building-mapping-master-icon';

export const menuItems = [
  {
    name: 'Dashboard', href: routes?.panel?.dashboard, icon: <RxDashboard />
  },
  {
    name: 'Master', href: '#', icon: '', badge: 'New',
    dropdownItems: [
      { name: 'User Management Master', href: routes?.panel?.master?.users, icon: <UserManagementIcon /> },
      { name: 'Role and Permission Master', href: routes?.panel?.master?.rolesAndPermission, icon: <RolePermissionIcon /> },
      { name: 'Site Master', href: routes?.panel?.master?.siteMaster ,icon : <SiteMasterIcon />},
      { name: 'Buildings Master', href: routes?.panel?.master?.buildingsMaster ,icon : <BuildingsMasterIcon />},
      // { name: 'Reader Master', href: routes?.panel?.master?.readerMaster ,icon : <ReaderMasterIcon />},
      // { name: 'Reader Replacement Master', href: routes?.panel?.master?.readerReplacementMaster,icon : <ReaderReplacementMasterIcon />}, 
      // { name: 'Reader Health Master', href: routes?.panel?.master?.readerHealthMaster ,icon : <ReaderHealthMasterIcon /> },
      { name: 'Product Master', href: routes?.panel?.master?.productMaster ,icon : <ProductMasterIcon />}, 
      { name: 'Customer Master', href: routes?.panel?.master?.customerMaster ,icon : <CustomerMasterIcon />},
      { name: 'Supplier Master', href: routes?.panel?.master?.supplierMaster ,icon : <SupplierMasterIcon />},
      { name: 'General Master', href: routes?.panel?.master?.generalMaster,icon : <GeneralMasterIcon /> },
      // { name: 'Reader Building Mapping Master', href: routes?.panel?.master?.readerBuildingMappingMaster ,icon : <ReaderBuildingMappingMasterIcon /> },
    ],
  },
  {
    name: 'Device', href: '#', icon: '', badge: 'New',
    dropdownItems: [
      { name: 'Reader Master', href: routes?.panel?.device?.readerMaster ,icon : <ReaderMasterIcon />},
      { name: 'Reader Replacement Master', href: routes?.panel?.device?.readerReplacementMaster,icon : <ReaderReplacementMasterIcon />}, 
      { name: 'Reader Health Master', href: routes?.panel?.device?.readerHealthMaster ,icon : <ReaderHealthMasterIcon /> },
      { name: 'Reader Building Mapping Master', href: routes?.panel?.device?.readerBuildingMappingMaster ,icon : <ReaderBuildingMappingMasterIcon /> },
      { name: 'Weighing Scale', href: routes?.panel?.device?.weighingScale ,icon : <ReaderBuildingMappingMasterIcon /> },
    ],
  },
  { name: 'Reports', },
  {
    name: 'Inbound', href: '#', icon: '',
    dropdownItems: [
      { name: 'Inbound Order', href: routes?.panel?.inbond?.inboundOrder },
      { name: 'Web Receving', href: routes?.panel?.inbond?.webReceiving },
    ],
  }, {
    name: 'Outbound', href: '#', icon: '',
    dropdownItems: [
      { name: 'Outbound Order', href: routes?.panel?.outbond?.outboundOrder },
      { name: 'Web Picking', href: routes?.panel?.outbond?.webPicking },
    ],
  },
];


