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
import CreateSupplier from '../WebView/master/supplier-master/create/create-supplier'
import InboundOrder from '../WebView/inbound/inbound-order/inbound-order'
import InboundWebReceiving from '../WebView/inbound/web-receving/inbound-web-receving'
import OutboundOrder from '../WebView/outbound/outbound-order/outbound-order'
import OutboundWebPicking from '../WebView/outbound/web-picking/outbound-web-picking'
import CreateInbound from '../WebView/inbound/create-inbound/create-inbound'
import CreateOutbound from '../WebView/outbound/create-outbound/create-outbound'
import Test from '../WebView/test/test'
import ReaderConfiguraiton from '../WebView/configuration/reader-configuraiton'
import CreateDeviceReader from '../Form/device/create-device-reader/create-device-reader'
import WeighingScale from '../WebView/device/weighing-scale/weighing-scale'
import CreateWeighingScale from '../Form/device/create-weighing-scale/create-weighing-scale'
import VehicleMaster from '../WebView/master/vehicle-master/vehicle-master'
import ZoneMaster from '../WebView/master/zone-master/zone-master'
import LocationMaster from '../WebView/master/location-master/location-master'
import TagMaster from '../WebView/master/tag-master/tag-master'
import ConfigurationMaster from '../WebView/master/configuration-master/configuration-master'
import AddConfigurationMaster from '../Form/master/configuration-master/add-configuration-master'
import InventoryMaster from '../WebView/master/inventory-master/inventory-master'
import MappingMaster from '../WebView/master/mapping-master/mapping-master'

export default function CustomRoutes() {

    return (
        <Routes>
            <Route path={routes?.panel?.master?.users} exact element={<UserManagement />} />
            <Route path={routes?.panel?.master?.rolesAndPermission} exact element={<RolesAndPermission />} />
            <Route path={routes?.panel?.master?.siteMaster} exact element={<SiteMaster />} />
            <Route path={routes?.panel?.master?.buildingsMaster} exact element={<BuildingsMaster />} />
            <Route path={routes?.panel?.device?.readerMaster} exact element={<ReaderMaster />} />
            <Route path={routes?.panel?.device?.readerReplacementMaster} exact element={<ReaderReplacementMaster />} />
            <Route path={routes?.panel?.device?.createReader} exact element={<CreateDeviceReader />} />
            <Route path={routes?.panel?.device?.editReader} exact element={<CreateDeviceReader />} />
            <Route path={routes?.panel?.device?.readerConfiguration} exact element={<ReaderConfiguraiton />} />
            <Route path={routes?.panel?.device?.readerHealthMaster} exact element={<ReaderHealthMaster />} />
            <Route path={routes?.panel?.device?.weighingScale} exact element={<WeighingScale />} />
            <Route path={routes?.panel?.device?.createWeighingScale} exact element={<CreateWeighingScale />} />
            <Route path={routes?.panel?.device?.createWeighingScale} exact element={<CreateWeighingScale />} />
            <Route path={routes?.panel?.device?.editWeighingScale} exact element={<CreateWeighingScale />} />
            <Route path={routes?.panel?.master?.productMaster} exact element={<ProductMaster />} />
            <Route path={routes?.panel?.master?.createProduct} exact element={<CreateProduct />} />
            <Route path={routes?.panel?.master?.editProduct} exact element={<CreateProduct />} />
            <Route path={routes?.panel?.master?.customerMaster} exact element={<CustomerMaster />} />
            <Route path={routes?.panel?.master?.supplierMaster} exact element={<SupplierMaster />} />
            <Route path={routes?.panel?.master?.createSupplier} exact element={<CreateSupplier />} />
            <Route path={routes?.panel?.master?.generalMaster} exact element={<GeneralMaster />} />
            <Route path={routes?.panel?.master?.mappingMaster} exact element={<MappingMaster />} />
            <Route path={routes?.panel?.device?.readerBuildingMappingMaster} exact element={<ReaderBuildingMappingMaster />} />
            <Route path={routes?.panel?.inbond?.inboundOrder} exact element={<InboundOrder />} />
            <Route path={routes?.panel?.inbond?.webReceiving} exact element={<InboundWebReceiving />} />
            <Route path={routes?.panel?.inbond?.inboundCreate} exact element={<CreateInbound />} />
            <Route path={routes.panel?.outbond?.outboundOrder} exact element={<OutboundOrder />} />
            <Route path={routes?.panel?.outbond?.webPicking} exact element={<OutboundWebPicking />} />
            <Route path={routes?.panel?.outbond?.outboundCreate} exact element={<CreateOutbound />} />
            <Route path={routes?.panel?.master?.vehicleMaster} exact element={<VehicleMaster />} />
            <Route path={routes?.panel?.master?.zomeMaster} exact element={<ZoneMaster />} />
            <Route path={routes?.panel?.master?.locationMaster} exact element={<LocationMaster />} />
            <Route path={routes?.panel?.master?.tagMaster} exact element={<TagMaster />} />
            <Route path={routes?.panel?.master?.configurationMaster} exact element={<ConfigurationMaster />} />
            <Route path={routes?.panel?.master?.createConfigurationMaster} exact element={<AddConfigurationMaster />} />
            <Route path={routes?.panel?.master?.editConfigurationMaster} exact element={<AddConfigurationMaster />} />
            <Route path={routes?.panel?.master?.innventoryMaster} exact element={<InventoryMaster />} />

            <Route path={'/test'} exact element={<Test />} />
        </Routes>
    )
}
