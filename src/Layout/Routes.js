import React from 'react'
import { Route, Routes } from 'react-router-dom'
import UserManagement from '../WebView/user-management/users/user-management'
import RolesAndPermission from '../WebView/user-management/roles-and-permission/roles-and-permission'
import { routes } from '../config/routes'
import SiteMaster from '../WebView/master/site-master/site-master'
import BuildingsMaster from '../WebView/master/buildings-master/buildings-master'
import ReaderMaster from '../WebView/master/reader-master/reader-master'
import ReaderReplacementMaster from '../WebView/master/reader-replacement-master/reader-replacement-master'
import ReaderHealthMaster from '../WebView/master/reader-health-master/reader-health-master'
import ProductMaster from '../WebView/master/product-master/product-master'
import CustomerMaster from '../WebView/master/customer-master/customer-master'
import SupplierMaster from '../WebView/master/supplier-master/supplier-master'
import GeneralMaster from '../WebView/master/general-master/general-master'
import ReaderBuildingMappingMaster from '../WebView/master/reader-building-mapping-master/reader-building-mapping-master'
import CreateProduct from '../WebView/master/product-master/create/create-product'
import InboundOrder from '../WebView/inbound/inbound-order/inbound-order'
import WebReceiving from '../WebView/inbound/web-receving/web-receving'

export default function CustomRoutes() {

    
    return (
        <Routes>
            <Route path={routes?.panel?.master?.users} exact element={<UserManagement />} />
            <Route path={routes?.panel?.master?.rolesAndPermission} exact element={<RolesAndPermission />} />
            <Route path={routes?.panel?.master?.siteMaster} exact element={<SiteMaster />} />
            <Route path={routes?.panel?.master?.buildingsMaster} exact element={<BuildingsMaster />} />
            <Route path={routes?.panel?.master?.readerMaster} exact element={<ReaderMaster />} />
            <Route path={routes?.panel?.master?.readerReplacementMaster} exact element={<ReaderReplacementMaster />} />
            <Route path={routes?.panel?.master?.readerHealthMaster} exact element={<ReaderHealthMaster />} />
            <Route path={routes?.panel?.master?.productMaster} exact element={<ProductMaster />} />
            <Route path={routes?.panel?.master?.createProduct} exact element={<CreateProduct />} />
            
            <Route path={routes?.panel?.master?.customerMaster} exact element={<CustomerMaster />} />
            <Route path={routes?.panel?.master?.supplierMaster} exact element={<SupplierMaster />} />
            <Route path={routes?.panel?.master?.generalMaster} exact element={<GeneralMaster />} />
            <Route path={routes?.panel?.master?.readerBuildingMappingMaster} exact element={<ReaderBuildingMappingMaster />} />
            <Route path={routes?.panel?.inbond?.inboundOrder} exact element={<InboundOrder />} />
            <Route path={routes?.panel?.inbond?.webReceiving} exact element={<WebReceiving />} />


            
        </Routes>
    )
}
