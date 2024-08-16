import React, { useState } from 'react';
import { renderButtonClass } from './ButtonRenderer';
import { FaChevronDown, FaChevronRight } from "react-icons/fa";


const PermissionComponent = ({ permissionsData }) => {
  const [data, setData] = useState(permissionsData);
  const [showChildren, setShowChildren] = useState({}); // Track visibility of child items

  const handleParentPermissionToggle = (parentIndex, action) => {
    const updatedData = [...data];
    const parentPermission = updatedData[parentIndex].permission[0];

    if (action === 'read') {
      parentPermission.read.allowed = !parentPermission.read.allowed;

      // Automatically toggle write and delete based on read
      if (!parentPermission.read.allowed) {
        parentPermission.write.allowed = false;
        parentPermission.delete.allowed = false;
        // When parent read is false, reset all child permissions
        updatedData[parentIndex].child.forEach((child) => {
          child.permission[0].read.allowed = false;
          child.permission[0].write.allowed = false;
          child.permission[0].delete.allowed = false;
        });
      }
    } else if (action === 'write' && parentPermission.read.allowed) {
      parentPermission.write.allowed = !parentPermission.write.allowed;

      // Automatically toggle delete based on write
      if (!parentPermission.write.allowed) {
        parentPermission.delete.allowed = false;
        // When parent write is false, reset child write and delete permissions
        updatedData[parentIndex].child.forEach((child) => {
          child.permission[0].write.allowed = false;
          child.permission[0].delete.allowed = false;
        });
      }
    } else if (action === 'delete' && parentPermission.read.allowed && parentPermission.write.allowed) {
      parentPermission.delete.allowed = !parentPermission.delete.allowed;

      // When parent delete is false, reset all child delete permissions
      if (!parentPermission.delete.allowed) {
        updatedData[parentIndex].child.forEach((child) => {
          child.permission[0].delete.allowed = false;
        });
      }
    }

    setData(updatedData);
  };

  const handleChildPermissionToggle = (parentIndex, childIndex, action) => {
    const updatedData = [...data];
    const parentPermission = updatedData[parentIndex].permission[0];
    const childPermission = updatedData[parentIndex].child[childIndex].permission[0];

    if (action === 'read') {
      childPermission.read.allowed = !childPermission.read.allowed;

      // Automatically toggle write and delete based on read
      if (!childPermission.read.allowed) {
        childPermission.write.allowed = false;
        childPermission.delete.allowed = false;
      }
    } else if (action === 'write' && childPermission.read.allowed && parentPermission.write.allowed) {
      childPermission.write.allowed = !childPermission.write.allowed;

      // Automatically toggle delete based on write
      if (!childPermission.write.allowed) {
        childPermission.delete.allowed = false;
      }
    } else if (action === 'delete' && childPermission.read.allowed && childPermission.write.allowed && parentPermission.delete.allowed) {
      childPermission.delete.allowed = !childPermission.delete.allowed;
    }

    setData(updatedData);
  };

  const toggleChildrenVisibility = (parentIndex) => {
    setShowChildren((prevState) => ({
      ...prevState,
      [parentIndex]: !prevState[parentIndex]
    }));
  };

  return (
    <div className="p-8">
      {data.map((parent, parentIndex) => (
        <div key={parentIndex} className="mb-8">
          <div className="flex items-center justify-between space-x-4">
            <strong className="bg-gray-200 text-black font-medium py-3 px-4 rounded-md w-40 flex justify-between items-center" onClick={() => toggleChildrenVisibility(parentIndex)}>
              {parent.value}
              {showChildren[parentIndex] ? <FaChevronDown /> : <FaChevronRight />}
            </strong>
            <div>
              <button type='button' onClick={() => handleParentPermissionToggle(parentIndex, 'read')} className={renderButtonClass(parent.permission[0].read.allowed, true, 'read')} > Read </button>
              <button type='button' onClick={() => handleParentPermissionToggle(parentIndex, 'write')} className={renderButtonClass(parent.permission[0].write.allowed, parent.permission[0].read.allowed, 'write')} disabled={!parent.permission[0].read.allowed} > Write </button>
              <button type='button' onClick={() => handleParentPermissionToggle(parentIndex, 'delete')} className={renderButtonClass(parent.permission[0].delete.allowed, parent.permission[0].read.allowed && parent.permission[0].write.allowed, 'delete')} disabled={!parent.permission[0].read.allowed || !parent.permission[0].write.allowed} > delete </button>

            </div>
          </div>

          {showChildren[parentIndex] && parent.child.map((child, childIndex) => (
            <div key={childIndex} className="flex items-center justify-between space-x-4 pl-4">
              <strong className="">{child.value}</strong>
              <div>
                <button type='button' onClick={() => handleChildPermissionToggle(parentIndex, childIndex, 'read')} className={renderButtonClass(child.permission[0].read.allowed, parent.permission[0].read.allowed, 'read')} disabled={!parent.permission[0].read.allowed} > Read </button>
                <button type='button' onClick={() => handleChildPermissionToggle(parentIndex, childIndex, 'write')} className={renderButtonClass(child.permission[0].write.allowed, child.permission[0].read.allowed && parent.permission[0].write.allowed, 'write')} disabled={!child.permission[0].read.allowed || !parent.permission[0].write.allowed} > Write </button>
                <button type='button' onClick={() => handleChildPermissionToggle(parentIndex, childIndex, 'delete')} className={renderButtonClass(child.permission[0].delete.allowed, child.permission[0].read.allowed && child.permission[0].write.allowed && parent.permission[0].delete.allowed, 'delete')} disabled={!child.permission[0].read.allowed || !child.permission[0].write.allowed || !parent.permission[0].delete.allowed} > delete </button>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default PermissionComponent;
