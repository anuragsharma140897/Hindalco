import React from 'react';
import { ActionIcon, Tooltip } from 'rizzui';
import PencilIcon from '../../../Constant/Icons/pencil';
import EyeIcon from '../../../Constant/Icons/eye';
import DeletePopover from '../../../shared/delete-popover';
import usePermissionCheck from '../../../Hooks/use-permission-check';
import { ScreenName } from '../../../Constant/Screen/Screen';
import { getAuthenticatedUser } from '../../../Storage/Storage';
const TableActions = ({ row, onEdit, onView, onDelete, screen, checkKeys }) => {
    const user = getAuthenticatedUser()



    
    // const isEditAllowed = usePermissionCheck(ScreenName?.[screen], 'write');
    const isEditAllowed = true
    // const isDeleteAllowed = usePermissionCheck(ScreenName?.[screen], 'delete');
    const isDeleteAllowed = true

    const areKeysNotEmpty = () => {
        if (!Array.isArray(checkKeys)) return false;
        return checkKeys.every((key) => Array.isArray(row[key]) && row[key]?.length<=0);
    };

    // Check if keys are not empty
    const keysAreNotEmpty = areKeysNotEmpty();


    
    return (
        <div className="flex items-center gap-3 pe-4">
            {isEditAllowed && user?.userId !== row?.id && <Tooltip size="sm" content="Edit" placement="top" color="invert">
                <ActionIcon
                    as="span"
                    size="sm"
                    variant="outline"
                    className="cursor-pointer hover:text-gray-700"
                    onClick={() => onEdit(row)}>
                    <PencilIcon className="h-4 w-4" />
                </ActionIcon>
            </Tooltip>}
            <Tooltip size="sm" content="View" placement="top" color="invert">
                <ActionIcon
                    as="span"
                    size="sm"
                    variant="outline"
                    className="cursor-pointer hover:text-gray-700"
                    onClick={() => onView(row)}
                >
                    <EyeIcon className="h-4 w-4" />
                </ActionIcon>
            </Tooltip>
            {isDeleteAllowed && keysAreNotEmpty && user?.userId !== row?.id && (
                <DeletePopover
                    title="Delete"
                    description="Are you sure you want to delete this?"
                    onDelete={() => onDelete(row)}
                />
            )}
        </div>
    );
};

export default TableActions;
