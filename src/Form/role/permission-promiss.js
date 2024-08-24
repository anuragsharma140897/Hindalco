export const ConstructJson = (data) => {
  return new Promise((resolve, reject) => {
    const allowedEndPoints = []; // Array to hold all the URLs where the permission is true
    const baseURLToRemove = "http://192.168.1.104:9090";

    const compiledPermissions = data.map(parent => {
      const filteredChildren = parent.child.map(child => {
        // Filter child permissions to only include true values
        const filteredChildPermissions = {
          read: child.permission[0].read.allowed,
          write: child.permission[0].write.allowed,
          delete: child.permission[0].delete.allowed,
        };

        // Collect URLs if the permissions are true, removing the base URL
        if (filteredChildPermissions.read) {
          allowedEndPoints.push(...child.permission[0].read.url.map(url => url.replace(baseURLToRemove, "")));
        }
        if (filteredChildPermissions.write) {
          allowedEndPoints.push(...child.permission[0].write.url.map(url => url.replace(baseURLToRemove, "")));
        }
        if (filteredChildPermissions.delete) {
          allowedEndPoints.push(...child.permission[0].delete.url.map(url => url.replace(baseURLToRemove, "")));
        }

        // Only include the child if at least one permission is true
        const hasTruePermission = Object.values(filteredChildPermissions).some(value => value === true);

        return hasTruePermission ? {
          value: child.value,
          permission: [filteredChildPermissions]
        } : null;
      }).filter(child => child !== null); // Remove null values

      // Filter parent permissions to only include true values
      const filteredParentPermissions = {
        read: parent.permission[0].read.allowed,
        write: parent.permission[0].write.allowed,
        delete: parent.permission[0].delete.allowed,
      };

      // Collect URLs if the permissions are true, removing the base URL
      if (filteredParentPermissions.read) {
        allowedEndPoints.push(...parent.permission[0].read.url.map(url => url.replace(baseURLToRemove, "")));
      }
      if (filteredParentPermissions.write) {
        allowedEndPoints.push(...parent.permission[0].write.url.map(url => url.replace(baseURLToRemove, "")));
      }
      if (filteredParentPermissions.delete) {
        allowedEndPoints.push(...parent.permission[0].delete.url.map(url => url.replace(baseURLToRemove, "")));
      }

      // Include parent if it has true permissions or if it has any children with true permissions
      const hasTruePermission = Object.values(filteredParentPermissions).some(value => value === true);
      const includeParent = hasTruePermission || filteredChildren.length > 0;

      return includeParent ? {
        value: parent.value,
        permission: [filteredParentPermissions],
        child: filteredChildren
      } : null;
    }).filter(parent => parent !== null); // Remove null values

    resolve({
      allowedEndPoints: allowedEndPoints,
      permission: compiledPermissions
    });
  });
};

export const  ReCreateJsonForEdit = (row, reduxRolesAndPermission) => {
  if (!row?.permission || !reduxRolesAndPermission) return reduxRolesAndPermission;

  // Create a copy of the original permissions to avoid direct mutations
  const original = [...reduxRolesAndPermission];

  row.permission.forEach((item) => {
    const refItem = original.find((obj) => obj?.value === item?.value);

    if (refItem) {
      const permissions = refItem.permission[0];

      // Update main permissions
      permissions.read.allowed = item?.permission?.[0]?.read ?? permissions.read.allowed;
      permissions.write.allowed = item?.permission?.[0]?.write ?? permissions.write.allowed;
      permissions.delete.allowed = item?.permission?.[0]?.delete ?? permissions.delete.allowed;

      // Update child permissions if they exist
      if (item?.child && refItem?.child) {
        item.child.forEach((childItem) => {
          const refChildItem = refItem.child.find((childObj) => childObj?.value === childItem?.value);

          if (refChildItem) {
            const childPermissions = refChildItem.permission[0];

            childPermissions.read.allowed = childItem?.permission?.[0]?.read ?? childPermissions.read.allowed;
            childPermissions.write.allowed = childItem?.permission?.[0]?.write ?? childPermissions.write.allowed;
            childPermissions.delete.allowed = childItem?.permission?.[0]?.delete ?? childPermissions.delete.allowed;
          }
        });
      }
    }

  });

  return original;
};

