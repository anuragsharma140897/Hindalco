import React from 'react'
import { Route, Routes } from 'react-router-dom'
import UserManagement from '../WebView/user-management/users/user-management'
import RolesAndPermission from '../WebView/user-management/roles-and-permission/roles-and-permission'
import { routes } from '../config/routes'
import Units from '../WebView/location-mapping/units/units'
import Buildings from '../WebView/location-mapping/buildings/buildings'
import Mapping from '../WebView/location-mapping/mapping/mapping'

export default function CustomRoutes() {
    return (
        <Routes>
            <Route path={routes?.panel?.userManagement?.users} exact element={<UserManagement />} />
            <Route path={routes?.panel?.userManagement?.rolesAndPermission} exact element={<RolesAndPermission />} />
            <Route path={routes?.panel?.locationMapping?.units} exact element={<Units />} />
            <Route path={routes?.panel?.locationMapping?.buildings} exact element={<Buildings />} />
            <Route path={routes?.panel?.locationMapping?.mapping} exact element={<Mapping />} />
            <Route path={routes?.panel?.deviceManagement?.readers} exact element={<RolesAndPermission />} />
            <Route path={routes?.panel?.deviceManagement?.readerAction} exact element={<RolesAndPermission />} />
            <Route path={routes?.panel?.deviceManagement?.placement} exact element={<RolesAndPermission />} />
            <Route path={routes?.panel?.deviceManagement?.readerType} exact element={<RolesAndPermission />} />
            <Route path={routes?.panel?.deviceManagement?.readerHealth} exact element={<RolesAndPermission />} />
            <Route path={routes?.panel?.deviceManagement?.readerReplacement} exact element={<RolesAndPermission />} />

        </Routes>
    )
}
