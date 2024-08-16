
export const BaseUrl = 'http://137.184.74.218/auth/'
export const UserMicroService = 'http://137.184.74.218/user/api/'
export const HelperMicroService = 'http://137.184.74.218/helper/api/'
export const PlantMicroService = 'http://137.184.74.218/plant/api/'

export const LoginApi = BaseUrl+'login'
// User
export const addUser = UserMicroService+'addUser' 
export const updateUser = UserMicroService+'updateUser' 
export const searchUser = UserMicroService+'searchUser' 
export const deleteUser = UserMicroService+'deleteUser' 
// Role
export const addRole = UserMicroService+'addRole' //UserMicroService
export const updateRole = UserMicroService+'updateRole' 
export const searchRole = UserMicroService+'searchRole' //UserMicroService
export const deleteRole = UserMicroService+'deleteRole' //UserMicroService
// Product
export const addProduct = HelperMicroService+'addProduct' 
export const updateProduct = HelperMicroService+'updateProduct' 
export const searchProduct = HelperMicroService+'searchProduct' 
export const deleteProduct = HelperMicroService+'deleteProduct' 
// Customer
export const addCustomer = HelperMicroService+'addCustomer' 
export const updateCustomer = HelperMicroService+'updateCustomer' 
export const searchCustomer = HelperMicroService+'searchCustomer' 
export const deleteCustomer = HelperMicroService+'deleteCustomer' 
// General
export const addGeneral = HelperMicroService+'addGeneral' 
export const updateGeneral = HelperMicroService+'updateGeneral' 
export const searchGeneral = HelperMicroService+'searchGeneral' 
export const deleteGeneral = HelperMicroService+'deleteGeneral' 
// Supplier
export const addSupplier = HelperMicroService+'addSupplier' 
export const updateSupplier = HelperMicroService+'updateSupplier' 
export const searchSupplier = HelperMicroService+'searchSupplier' 
export const deleteSupplier = HelperMicroService+'deleteSupplier' 
// Site
export const addSite = PlantMicroService+'addSite' 
export const updateSite = PlantMicroService+'updateSite' 
export const searchSite = PlantMicroService+'searchSite' 
export const deleteSite = PlantMicroService+'deleteSite' 
// Building
export const addBuilding = PlantMicroService+'addBuilding' 
export const updateBuilding = PlantMicroService+'updateBuilding'
export const searchBuilding = PlantMicroService+'searchBuilding'
export const deleteBuilding = PlantMicroService+'deleteBuilding'
// Reader
export const addReader = PlantMicroService+'addReader' 
export const updateReader = PlantMicroService+'updateReader'
export const searchReader = PlantMicroService+'searchReader'
export const deleteReader = PlantMicroService+'deleteReader'