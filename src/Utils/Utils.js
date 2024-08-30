
export const GetPageCount = (limit, page, index) => {
    var no = limit * page - limit + index + 1
    return no
}

export const GetFullYear = (timestamp) => {
    var t = parseInt(timestamp)
    var a = new Date(t);
    var months = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var time = date + '-' + month + '-' + year;
    return time;
}

export const getFormattedDate = (UNIX_timestamp, types, symbol = '-', timeSeparator = ':', timeFormat = '24', monthName = false, includeDay = true) => {
    if (!types || !Array.isArray(types) || types.length === 0) {
        return 'Invalid types';
    }

    UNIX_timestamp = parseInt(UNIX_timestamp);
    var a = new Date(UNIX_timestamp);
    var days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
    var day = includeDay ? days[a.getDay()] + ' ' : '';
    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    var month = monthName ? months[a.getMonth()] : ('0' + (a.getMonth() + 1)).slice(-2);
    var year = a.getFullYear();
    var date = a.getDate() > 9 ? a.getDate() : '0' + a.getDate();
    var hour = timeFormat === '12' ? a.getHours() % 12 || 12 : a.getHours(); // Convert to 12-hour format if specified
    var minute = a.getMinutes() > 9 ? a.getMinutes() : '0' + a.getMinutes();
    var second = a.getSeconds();
    var period = timeFormat === '12' ? (a.getHours() < 12 ? 'am' : 'pm') : ''; // Determine AM or PM only in 12-hour format

    let result = '';
    types.forEach((type, index) => {
        if (type === 'day') {
            result += `${day}`;
        } else if (type === 'date') {
            result += `${date}`;
        } else if (type === 'month') {
            result += `${month}`;
        } else if (type === 'year') {
            result += `${year}`;
        } else if (type === 'hour') {
            result += ` ${hour}${timeSeparator}`; // Add a space before hour
        } else if (type === 'minute') {
            if (minute !== '00') {
                result += `${minute}${timeSeparator}`;
            } else {
                result += '00';
            }
        } else if (type === 'second') {
            result += `${second}`;
        } else if (type === 'period' && period) { // Add period only if it exists
            result += ` ${period}`; // Include space before period
        } else {
            // Handle invalid type
            result += 'Invalid type';
        }

        // Check if the current type is not 'year' or if the next type is 'period'
        if (type !== 'year' && (index === types.length - 1 || types[index + 1] !== 'period')) {
            if (type !== 'hour' && type !== 'minute' && type !== 'second') {
                result += symbol; // Add the symbol unless it's after the 'year' and before 'period'
            } else {
                result += ''; // Add space instead of symbol for time parts
            }
        }
    });

    if (result.endsWith(symbol)) {
        result = result.slice(0, -symbol.length); // Remove the last character (which is the separator)
    }

    return result;
}


export const AddChildRolePermission = (arr, itemKey) => {
    for (const item of arr) {
        if (item[itemKey]) {
            return item[itemKey];
        }
        for (const key in item) {
            if (item[key] && item[key].child) {
                const result = AddChildRolePermission(item[key].child, itemKey);
                if (result) {
                    return result;
                }
            }
        }
    }
    return null;
};

export const getHeadingFromPathname = () => {
    const pathname = window.location.pathname;
    const segments = pathname.split('/');

    if (pathname.startsWith("/master/inventory/")) {
        return "Inventory / Inventories";
    }
    if (pathname.startsWith("/outbond/outbound-edit/")) {
        return "Outbound / Edit";
    }
    if (pathname.startsWith("/master/customer/edit/")) {
        return "Customer Master / Edit";
    }
    // master/customer/edit/
    switch (pathname) {
        case "/":
            return "Dashboard"
        case "/dashboard":
            return "Dashboard"
        case "/master/site":
            return "Site Master";
        case "/master/users":
            return "User Management";
        case "/master/roles-and-permission":
            return "Role And Permission";
        case "/master/building":
            return "Building Master";
        case "/master/product":
            return "Product Master";
        case "/master/customer":
            return "Customer Master";
        case "/master/supplier":
            return "Supplier Master";
        case "/master/general":
            return "General Master";
        case "/master/product/create":
            return "Product Master / Create";
        case "/master/customer/create":
            return "Coustomer Master / Create";
        case "/device/reader":
            return "Device / Reader Master";
        case "/device/reader-replacement":
            return "Device / Reader Replacement";
        case "/device/reader-health":
            return "Device / Reader Health";
        case "/device/reader/create":
            return "Device / Create Reader";
        case "/device/reader-builing-mapping":
            return "Device / Reader Builing Mapping Master";
        case "/device/weighingscale":
            return "Device / Weighing Scale";
        case "/device/weighingscale/create":
            return "Device / Create Weighing Scale ";
        case "/master/vehicle":
            return "Vehicle Master";
        case "/master/zone":
            return "Zone Master";
        case "/master/location":
            return "Location Master";
        case "/master/tag":
            return "Tag Master";
        case "/master/configuration":
            return "Configuration Master";
        case "/master/configuration/create":
            return "Create / Configuration Master";
        case "/inbond/inbound-create":
            return "Inbound Order / Create";
        case "/master/inventory":
            return "Inventory Master"
        case "/master/supplier/create":
            return "Supplier Master / Create"
        case "/inbond/inbound-order":
            return "Inbound Order"
        case "/outbond/outbound-create":
            return "Outbound Order / Create"
        case "/outbond/outbound-order":
            return "Outbound Order"
        case "/device-manager/broker":
            return "Brokers"
        case "/device-manager/broker/add":
            return "Brokers / Add"
        default:
            return "";
    }
}
// device-manager/broker/add
// device-manager/broker
const endpointBasedOnPermissions = {
    USER_MANAGEMENT: {
        read: ["/usermanagement/read"],
        write: ["/usermanagement/write"],
        delete: ["/usermanagement/delete"]
    },
    USER_VIEW: {
        read: ["/userview/read"],
        write: ["/userview/write"],
        delete: ["/userview/delete"]
    }
};

const checkPermissions = (perms) => {
    const allowedEndPoints = []
    const { value, permission } = perms;
    permission.forEach((permissionItem) => {
        const permissionKeys = Object.keys(permissionItem);
        permissionKeys.forEach((key) => {
            if (permissionItem[key] && endpointBasedOnPermissions[value]) {
                allowedEndPoints.push(...endpointBasedOnPermissions[value][key]);
            }
        });
    })
    return allowedEndPoints
}
export const getEnpointsToPermissons = (doc) => {

    let allowedEndPoints = [];
    doc.forEach((perms, index) => {
        allowedEndPoints.push(...checkPermissions(perms))
        if (perms.child.length > 0) {
            perms.child.forEach((childPerm) => {
                allowedEndPoints.push(...checkPermissions(childPerm))
            })
        }
    })

    return allowedEndPoints
}
