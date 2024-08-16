import React from 'react';
import {createRoot} from 'react-dom/client';
import './index.css';
import App from './App';
import {BrowserRouter} from "react-router-dom";
import { legacy_createStore as createStore,combineReducers ,applyMiddleware} from 'redux'
import { Provider } from 'react-redux';
import {thunk} from 'redux-thunk';
import SampleReducer from './Store/Reducer/Auth/Sample/SampleReducer';
import PaginationReducer from './Store/Reducer/Pagination/PaginationReducer';
import RolesAndPermissionReducer from './Store/Reducer/RolesAndPermission/RolesAndPermissionReducer';
import AuthReducer from './Store/Reducer/Auth/Sample/SampleReducer';
import InventoryManagementReducer from './Store/Reducer/Inventory-management/inventory-management-reducer';
import SiteMasterReducer from './Store/Reducer/master/site-master/site-master-reducer'
import BuildingMasterReducer from './Store/Reducer/master/building-master/building-master-reducer';
import ApiReducer from './Store/Reducer/Api/ApiReducer';
import ProductMasterReducer from './Store/Reducer/master/product-master/product-master-reducer';


const rootReducer = combineReducers({
  ApiReducer: ApiReducer,
  SampleReducer : SampleReducer,
  PaginationReducer : PaginationReducer,
  RolesAndPermissionReducer : RolesAndPermissionReducer,
  AuthReducer : AuthReducer,
  InventoryManagementReducer : InventoryManagementReducer,
  SiteMasterReducer : SiteMasterReducer,
  BuildingMasterReducer : BuildingMasterReducer,
  ProductMasterReducer : ProductMasterReducer
})

const store = createStore(rootReducer,applyMiddleware(thunk))

const root = createRoot(document.getElementById("root"));

root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App/>
    </BrowserRouter>
  </Provider>
);
