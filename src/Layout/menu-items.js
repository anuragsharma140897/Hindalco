import { PiMapPin, PiListChecksBold, PiBarcode, PiBookOpenText, PiBatteryVerticalHigh, PiTrash } from 'react-icons/pi';
import { RxDashboard } from "react-icons/rx";
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
import MappingMasterIcon from '../Constant/Icons/mapping-master-icon';
import VehicleMasterIcon from '../Constant/Icons/vehicle-master-icon';
import ConfigurationMasterIcon from '../Constant/Icons/configuration-master-icon';
import WeighingScaleIcon from '../Constant/Icons/weighing-scale-icon';
import WebReceivingIcon from '../Constant/Icons/web-receiving-icon';
import LocationMasterIcon from '../Constant/Icons/location-master-icon';

export const menuItems = [
  {
    name: 'Dashboard', href: routes?.panel?.dashboard, icon: <RxDashboard />
  },
  {
    name: 'Master', href: '#', icon: '', badge: 'New',
    dropdownItems: [
      { name: 'User Management Master', href: routes?.panel?.master?.users, icon: <UserManagementIcon /> },
      { name: 'Roles and Permission Master', href: routes?.panel?.master?.rolesAndPermission, icon: <RolePermissionIcon /> },
      { name: 'Site Master', href: routes?.panel?.master?.siteMaster ,icon : <SiteMasterIcon />},
      { name: 'Buildings Master', href: routes?.panel?.master?.buildingsMaster ,icon : <BuildingsMasterIcon />},
      { name: 'Zone Master', href: routes?.panel?.master?.zomeMaster ,icon : <BuildingsMasterIcon />},
      { name: 'Tag Master', href: routes?.panel?.master?.tagMaster ,icon : <BuildingsMasterIcon />},
      { name: 'Location Master', href: routes?.panel?.master?.locationMaster ,icon : <LocationMasterIcon />},
      { name: 'Product Master', href: routes?.panel?.master?.productMaster ,icon : <ProductMasterIcon />}, 
      { name: 'Customer Master', href: routes?.panel?.master?.customerMaster ,icon : <CustomerMasterIcon />},
      { name: 'Supplier Master', href: routes?.panel?.master?.supplierMaster ,icon : <SupplierMasterIcon />},
      { name: 'Inventory Master', href: routes?.panel?.master?.innventoryMaster,icon : <GeneralMasterIcon /> },
      { name: 'Vehicle Master', href: routes?.panel?.master?.vehicleMaster ,icon : <VehicleMasterIcon /> },
      { name: 'Configuration Master', href: routes?.panel?.master?.configurationMaster ,icon : <ConfigurationMasterIcon /> },
      { name: 'General Master', href: routes?.panel?.master?.generalMaster,icon : <GeneralMasterIcon /> },
      { name: 'Mapping Master', href: routes?.panel?.master?.mappingMaster, icon : <MappingMasterIcon /> },
    ],
  },
  {
    name: 'Device', href: '#', icon: '', badge: 'New',
    dropdownItems: [
      { name: 'Reader Master', href: routes?.panel?.device?.readerMaster ,icon : <ReaderMasterIcon />},
      { name: 'Reader Replacement Master', href: routes?.panel?.device?.readerReplacementMaster,icon : <ReaderReplacementMasterIcon />}, 
      { name: 'Reader Health Master', href: routes?.panel?.device?.readerHealthMaster ,icon : <ReaderHealthMasterIcon /> },
      { name: 'Reader Building Mapping Master', href: routes?.panel?.device?.readerBuildingMappingMaster ,icon : <MappingMasterIcon /> },
      { name: 'Weighing Scale', href: routes?.panel?.device?.weighingScale ,icon : <WeighingScaleIcon /> },
    ],
  },
  {
    name: 'Device Manager', href: '#', icon: '', badge: 'New',
    dropdownItems: [
      { name: 'Devices', href: routes?.panel?.deviceManager?.devices ,icon : <ReaderMasterIcon />},
      { name: 'Brokers', href: routes?.panel?.deviceManager?.broker ,icon : <ReaderMasterIcon />},
      { name: 'Device Profile', href: routes?.panel?.deviceManager?.deviceProfiler ,icon : <ReaderMasterIcon />},
      { name: 'Api Services', href: routes?.panel?.deviceManager?.apiService ,icon : <ReaderMasterIcon />},
      { name: 'Mapper', href: routes?.panel?.deviceManager?.mapper ,icon : <ReaderMasterIcon />},
    ],
  },
  { name: 'Reports', },
  {
    name: 'Inbound', href: '#', icon: '',
    dropdownItems: [
      { name: 'Inbound Order', href: routes?.panel?.inbond?.inboundOrder },
      { name: 'Web Receving', href: routes?.panel?.inbond?.webReceiving ,icon :<WebReceivingIcon/> },
    ],
  }, {
    name: 'Outbound', href: '#', icon: '',
    dropdownItems: [
      { name: 'Outbound Order', href: routes?.panel?.outbond?.outboundOrder },
      { name: 'Web Picking', href: routes?.panel?.outbond?.webPicking },
    ],
  },
];


