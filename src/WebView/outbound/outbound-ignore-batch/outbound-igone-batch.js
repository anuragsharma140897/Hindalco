import React, { useEffect, useMemo, useState } from 'react';
import { HitApi } from '../../../Store/Action/Api/ApiAction';
import { useDispatch, useSelector } from 'react-redux';
import { addOrder, searchRfidTag, updateBulkTags, updateOrder } from '../../../Constant/Api/Api';
import { setOutboundApiJson, setOutboundInventory } from '../../../Store/Action/outbound/outbound-action';
import ControlledTable from '../../../Component/ui/table/custom-table';
import { useColumn } from '../../../Hooks/use-column';
import { useModal } from '../../../shared/modal-views/use-modal';
import { TableClass } from '../../../Constant/Classes/Classes';
import { getOutboundIgoneBatchColumns } from './outbound-ignore-batch-column';
import { Status } from '../../../Constant/Status';
import CustomButton from '../../../Component/ui/buttons/custom-button';

function OutboundIgoneBatch() {
    const { openModal, closeModal } = useModal();
    const reduxPagination = useSelector((state) => state.PaginationReducer);
    const reduxOutbound = useSelector((state) => state.OutboundReducer);

    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const [selectedRows, setSelectedRows] = useState([]);
    let isEdit = false
    if(window.location.pathname.split('/')[2] === 'outbound-edit'){
       isEdit =true
    }

    const onRowSelect = (row) => {
        setSelectedRows((prevSelected) => {
            if (!prevSelected) return [row];
            const isSelected = prevSelected.some(item => item.id === row.id);
            if (isSelected) {
                return prevSelected.filter(item => item.id !== row.id);
            }
            return [...prevSelected, row];
        });
    };

    const columns = useMemo(() => getOutboundIgoneBatchColumns({
        openModal,
        closeModal,
        selectedRows: selectedRows || [],
        onRowSelect,
    }), [openModal, closeModal, selectedRows]);

    const { visibleColumns } = useColumn(columns);

    useEffect(() => {
        loadData();
    }, []);

    useEffect(() => {
        if (reduxOutbound?.apiJson?._id) {
            const json = {
                page: 1,
                limit: 20,
                search: {
                    orderId: reduxOutbound?.apiJson?._id
                }
            };
            HitApi(json, searchRfidTag).then((result) => {
                setSelectedRows(result?.content || []);
            });
        }
    }, [reduxOutbound?.apiJson?._id]); 

    const loadData = () => {
        const json = {
            page: 1,
            limit: reduxPagination?.doc?.limit,
            search: {}
        };

        HitApi(json, searchRfidTag).then((result) => {
            dispatch(setOutboundInventory(result?.content || []));
            const oldJson = reduxOutbound?.apiJson || {};
            const updatedJson = {
                ...oldJson,
                batchId: result?.content?.[0]?.batchId,
            };
            dispatch(setOutboundApiJson(updatedJson));
        });
    };

    const handleCreateOutbound = () => {
        const json = reduxOutbound?.apiJson || {};
        const updatedJson = {
            ...json,
            orderType: "OUTBOUND",
            orderStatus: Status.ORDER_INITIATED,
            movementStatus: Status.ENTRY_MOVEMENT_STATUS,
            status: json?.status || 'Active',
            batchID: null,
            id : json?._id
        };


        const apiToHit = isEdit ? updateOrder : addOrder;

        setLoading(true);
        HitApi(updatedJson, apiToHit).then((result) => {
            if (result.status === 200) {
                alert(result.message);

                const updateOrderIDArr = (selectedRows || []).map(row => ({
                    ...row,
                    orderId: result?.data?.id
                }));

                HitApi(updateOrderIDArr, updateBulkTags).then((updateResult) => {
                    setLoading(false);
                    if (updateResult.status === 200) {
                        alert(updateResult.message);
                        window.location.pathname = 'outbond/outbound-order';
                    }
                });
            } else {
                setLoading(false);
            }
        }).catch(() => {
            setLoading(false);
        });
    };

    return (
        <div>
            <ControlledTable
                variant="modern"
                isLoading={loading}
                showLoadingText={true}
                data={reduxOutbound?.inventories || []}
                columns={visibleColumns}
                className={TableClass}
            />

            <div className='flex justify-end gap-x-2 mt-3'>
                <CustomButton text={'Back'} variant={'flat'} onClick={() => window.location.pathname = '/inbond/outbound-order'} />
                <CustomButton 
                    type={'submit'} 
                    className={''} 
                    text={isEdit ? 'Update' : 'Submit'} 
                    onClick={handleCreateOutbound} 
                    loading={loading} 
                />
            </div>
        </div>
    );
}

export default OutboundIgoneBatch;