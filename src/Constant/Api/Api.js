
// export const IP = '137.184.74.218'
export const IP = '192.168.0.100:9090'
export const MQTTIP = 'ws://192.168.0.114:9001'
export const BaseUrl = `http://${IP}/auth/`
export const UserMicroService = `http://${IP}/user/api/`
export const HelperMicroService = `http://${IP}/helper/api/`
export const PlantMicroService = `http://${IP}/plant/api/`
export const DeviceMicroService = `http://${IP}/device/api/`
export const IOTMicroService = `http://${IP}/iot/api/`
export const OrderMicroService = `http://${IP}/order/api/`


export const LoginApi = BaseUrl + 'login'
// User
export const addUser = UserMicroService + 'addUser'
export const updateUser = UserMicroService + 'updateUser'
export const searchUser = UserMicroService + 'searchUser'
export const deleteUser = UserMicroService + 'deleteUser'
// Role
export const addRole = UserMicroService + 'addRole' //UserMicroService
export const updateRole = UserMicroService + 'updateRole'
export const searchRole = UserMicroService + 'searchRole' //UserMicroService
export const deleteRole = UserMicroService + 'deleteRole' //UserMicroService
// Product
export const addProduct = HelperMicroService + 'addProduct'
export const updateProduct = HelperMicroService + 'updateProduct'
export const searchProduct = HelperMicroService + 'searchProduct'
export const deleteProduct = HelperMicroService + 'deleteProduct'
// Customer
export const addCustomer = HelperMicroService + 'addCustomer'
export const updateCustomer = HelperMicroService + 'updateCustomer'
export const searchCustomer = HelperMicroService + 'searchCustomer'
export const deleteCustomer = HelperMicroService + 'deleteCustomer'
// General
export const addGeneral = HelperMicroService + 'addGeneral'
export const updateGeneral = HelperMicroService + 'updateGeneral'
export const searchGeneral = HelperMicroService + 'searchGeneral'
export const deleteGeneral = HelperMicroService + 'deleteGeneral'
// Supplier
export const addSupplier = HelperMicroService + 'addSupplier'
export const updateSupplier = HelperMicroService + 'updateSupplier'
export const searchSupplier = HelperMicroService + 'searchSupplier'
export const deleteSupplier = HelperMicroService + 'deleteSupplier'
// Site
export const addSite = PlantMicroService + 'addSite'
export const updateSite = PlantMicroService + 'updateSite'
export const searchSite = PlantMicroService + 'searchSite'
export const deleteSite = PlantMicroService + 'deleteSite'
// Building
export const addBuilding = PlantMicroService + 'addBuilding'
export const updateBuilding = PlantMicroService + 'updateBuilding'
export const searchBuilding = PlantMicroService + 'searchBuilding'
export const deleteBuilding = PlantMicroService + 'deleteBuilding'
// Reader
export const addReader = DeviceMicroService+'addReader' 
export const updateReader = DeviceMicroService+'updateReader'
export const searchReader = DeviceMicroService+'searchReader'
export const deleteReader = DeviceMicroService+'deleteReader'
// Reader Configutaio
export const loginReader = DeviceMicroService+'loginReader'
export const readerStatus = DeviceMicroService+'readerStatus'
export const readerNetwork = DeviceMicroService+'readerNetwork'
export const getAccessInMqtt = DeviceMicroService+'getAccessInMqtt'
export const viewTopics = DeviceMicroService+'viewTopics'


//Weighing Scale
export const addWeighingScale = DeviceMicroService+'addWeighingScale' 
export const updateWeighingScale = DeviceMicroService+'updateWeighingScale'
export const searchWeighingScale = DeviceMicroService+'searchWeighingScale'
export const deleteWeighingScale = DeviceMicroService+'deleteWeighingScale'

//Vehicle
export const addVehicle = HelperMicroService + 'addVehicle'
export const updateVehicle = HelperMicroService + 'updateVehicle'
export const searchVehicle = HelperMicroService + 'searchVehicle'
export const deleteVehicle = HelperMicroService + 'deleteVehicle'
// Zone
export const addZone = PlantMicroService + 'addZone'
export const updateZone = PlantMicroService + 'updateZone'
export const searchZone = PlantMicroService + 'searchZone'
export const deleteZone = PlantMicroService + 'deleteZone'

//Location
export const addLocation = PlantMicroService + 'addLocation'
export const updateLocation = PlantMicroService + 'updateLocation'
export const searchLocation = PlantMicroService + 'searchLocation'
export const deleteLocation = PlantMicroService + 'deleteLocation'

//Tag
export const addTag = PlantMicroService + 'addTag'
export const updateTag = PlantMicroService + 'updateTag'
export const searchTag = PlantMicroService + 'searchTag'
export const deleteTag = PlantMicroService + 'deleteTag'

//addbuildToZone

export const addBuildingToZone = PlantMicroService + 'addBuildingToZone'
export const removeBuildingFromZone = PlantMicroService + 'removeBuildingFromZone'

//addZoneToLocation

export const addZoneToLocation = PlantMicroService + 'addZoneToLocation'
export const removeZoneFromLocation = PlantMicroService + 'removeZoneFromLocation'
export const mapping = PlantMicroService + 'mapping'
export const removeMapping = PlantMicroService + 'removeMapping'


//addBatch 

export const addBatch = IOTMicroService + 'addBatch'
export const searchBatch = IOTMicroService + 'searchBatch'
export const updateBatch = IOTMicroService + 'updateBatch'
export const deleteBatchCollection = IOTMicroService + 'deleteBatchCollection'


// mqtt
export const addMqttConfig = DeviceMicroService + 'addMqttConfig'
export const updateMqttConfig = DeviceMicroService + 'updateMqttConfig'
export const searchMqttConfig = DeviceMicroService + 'searchMqttConfig'
export const deleteMqttConfig = DeviceMicroService + 'deleteMqttConfig'

//rfidTags


export const searchRfidTag = IOTMicroService + 'searchRfidTag'

// inbound

export const addInbound = OrderMicroService + 'addInbound'

