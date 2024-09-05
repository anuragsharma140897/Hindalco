import React from 'react';
import { ActionIcon, Tooltip } from 'rizzui';
import PencilIcon from '../../../Constant/Icons/pencil';
import EyeIcon from '../../../Constant/Icons/eye';
import DeletePopover from '../../../shared/delete-popover';
import usePermissionCheck from '../../../Hooks/use-permission-check';
import { ScreenName } from '../../../Constant/Screen/Screen';
import { getAuthenticatedUser } from '../../../Storage/Storage';
import { PiGear } from 'react-icons/pi';
import { HitApi } from '../../../Store/Action/Api/ApiAction';
import { searchApiService } from '../../../Constant/Api/Api';
import { autoRequest } from '../../../WebView/device-manager/api-service/utils';
const TableActions = ({ row, onEdit, onView, onDelete, screen, checkKeys, enableSetting }) => {
    const user = getAuthenticatedUser()

    const isEditAllowed = usePermissionCheck(ScreenName?.[screen], 'write');
    // const isEditAllowed = true
    const isDeleteAllowed = usePermissionCheck(ScreenName?.[screen], 'delete');
    // const isDeleteAllowed = true

    const areKeysNotEmpty = () => {
        if (!Array.isArray(checkKeys)) return false;
        return checkKeys.every((key) => Array.isArray(row[key]) && row[key]?.length <= 0);
    };

    // Check if keys are not empty
    const keysAreNotEmpty = areKeysNotEmpty();

    const handleSetting = (row) => {
        console.log('handleSetting row : ', row);
        var json = {
            page: 1,
            limit: 1,
            search: { _id: row?.apiService?.serviceId }
        }
        HitApi(json, searchApiService).then((result) => {
            console.log('handleSetting result', result);
            var checkGlobal = result?.content?.[0]?.globalVariables
            if (checkGlobal) {
                var findHost = checkGlobal?.find((Obj) => Obj.valueName === 'host')
                if (findHost) {
                    console.log('findHost', findHost);
                    findHost.data = row?.host
                    if (findHost.data !== 'blankhost') {
                        autoRequest(result?.content?.[0])
                    }
                }
            }
        })
    }

    return (
        <div className="flex items-center gap-3 pe-4">
            {isEditAllowed && user?.userId !== row?._id && <Tooltip size="sm" content="Edit" placement="top" color="invert">
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
            
            {enableSetting && (
                <Tooltip size="sm" content="View" placement="top" color="invert">
                    <ActionIcon
                        as="span"
                        size="sm"
                        variant="outline"
                        className="cursor-pointer hover:text-gray-700"
                        onClick={() => handleSetting(row)}
                    >
                        <PiGear className="h-4 w-4" />
                    </ActionIcon>
                </Tooltip>
            )}
            {isDeleteAllowed && keysAreNotEmpty && user?.userId !== row?._id && (
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
