import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from "react-router-dom";
import { legacy_createStore as createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux';
import { thunk } from 'redux-thunk';
import SampleReducer from './Store/Reducer/Auth/Sample/SampleReducer';
import PaginationReducer from './Store/Reducer/Pagination/PaginationReducer';
import RolesAndPermissionReducer from './Store/Reducer/RolesAndPermission/RolesAndPermissionReducer';
import AuthReducer from './Store/Reducer/Auth/Sample/SampleReducer';
import InventoryManagementReducer from './Store/Reducer/Inventory-management/inventory-management-reducer';
import SiteMasterReducer from './Store/Reducer/master/site-master/site-master-reducer'
import BuildingMasterReducer from './Store/Reducer/master/building-master/building-master-reducer';
import ApiReducer from './Store/Reducer/Api/ApiReducer';
import UserReducer from './Store/Reducer/user-management/user-reducer';
import SupplierMasterReducer from './Store/Reducer/master/supplier-master/supplier-master-reducer';
import GeneralMasterReducer from './Store/Reducer/master/general-master/general-master-reducer';
import CustomerMasterReducer from './Store/Reducer/master/customer-master/customer-master-reducer';
import ProductMasterReducer from './Store/Reducer/master/product-master/product-master-reducer';
import VehicleMasterReducer from './Store/Reducer/master/vehicle-master/vehicle-master-reducer';
import ZoneMasterReducer from './Store/Reducer/master/zone-master/zone-master-reducer';
import LocationMasterReducer from './Store/Reducer/master/location-master/location-master-reducer';
import TagMasterReducer from './Store/Reducer/master/tag-master/tag-master-reducer';
import DeviceReaderReducer from './Store/Reducer/device/device-reader/device-reader-action';
import ReaderConfigurationReducer from './Store/Reducer/device/reader-configuration/reader-configuration-reducer';
import WeighingScaleReducer from './Store/Reducer/device/weighing-scale/weighing-scale-action';
import ConfigurationMasterReducer from './Store/Reducer/master/configuration-master/configuration-master-reducer';
import InventoryMasterReducer from './Store/Reducer/master/inventory-master/inventory-master-reducer';
import MappingMasterReducer from './Store/Reducer/master/mapping-master/mapping-master-reducer';
import InventoryReducer from './Store/Reducer/Inventories/InventoryReducer';
import LoadingReducer from './Store/Reducer/loading/loading-reducer';
import SearchableSelectReducer from './Store/Reducer/common/searcheable-select/searcheable-select-reducer';
import MQTTReducer from './Store/Reducer/mqtt/mqtt-reducer';
import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';
import InboundReducer from './Store/Reducer/inbound/inbout-reducer';
import DashboardBatchReducer from './Store/Reducer/dashbaord/batch/dashbaord-batch-reducer';
import DashboardInventoryBatchReducer from './Store/Reducer/dashbaord/inventory/dashbaord-inventory-reducer';
import OutboundReducer from './Store/Reducer/outbound/outbound-reducer';

const rootReducer = combineReducers({
  ApiReducer: ApiReducer,
  SampleReducer : SampleReducer,
  PaginationReducer : PaginationReducer,
  RolesAndPermissionReducer : RolesAndPermissionReducer,
  AuthReducer : AuthReducer,
  InventoryManagementReducer : InventoryManagementReducer,
  SiteMasterReducer : SiteMasterReducer,
  BuildingMasterReducer : BuildingMasterReducer,
  UserReducer : UserReducer,
  SupplierMasterReducer : SupplierMasterReducer,
  GeneralMasterReducer :GeneralMasterReducer,
  CustomerMasterReducer : CustomerMasterReducer,
  ProductMasterReducer : ProductMasterReducer,
  DeviceReaderReducer : DeviceReaderReducer,
  ReaderConfigurationReducer : ReaderConfigurationReducer,
  WeighingScaleReducer:WeighingScaleReducer,
  VehicleMasterReducer: VehicleMasterReducer,
  ZoneMasterReducer: ZoneMasterReducer,
  LocationMasterReducer: LocationMasterReducer,
  TagMasterReducer:TagMasterReducer,
  ConfigurationMasterReducer :ConfigurationMasterReducer,
  InventoryMasterReducer : InventoryMasterReducer,
  MappingMasterReducer : MappingMasterReducer,
  InventoryReducer:InventoryReducer,
  MappingMasterReducer : MappingMasterReducer,
  LoadingReducer : LoadingReducer,
  SearchableSelectReducer : SearchableSelectReducer,
  MQTTReducer : MQTTReducer,
  InboundReducer :InboundReducer,
  MappingMasterReducer : MappingMasterReducer,
  DashboardInventoryBatchReducer : DashboardInventoryBatchReducer,
  DashboardBatchReducer : DashboardBatchReducer,
  OutboundReducer :OutboundReducer,


})

const store = createStore(rootReducer, applyMiddleware(thunk))

const root = createRoot(document.getElementById("root"));

root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);
