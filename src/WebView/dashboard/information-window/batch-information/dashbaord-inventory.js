import React, { useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { GetUserColumns } from '../../../user-management/users/user-column'
import { useColumn } from '../../../../Hooks/use-column'
import { useModal } from '../../../../shared/modal-views/use-modal'
import { GetDashboardInentoryColumns } from './dashboard-inventory-column'
import ControlledTable from '../../../../Component/ControlledTable/ControlledTable'
import { TableClass } from '../../../../Constant/Classes/Classes'

export default function DashbaordInventory() {
    const dispatch = useDispatch()
    const reduxBatch = useSelector(state => state.DashboardBatchReducer)
    const { openModal, closeModal } = useModal();
    const columns = useMemo(() => GetDashboardInentoryColumns())
    const { visibleColumns } = useColumn(columns);

    useEffect(() => {
        console.log('reduxBatch', reduxBatch?.inventory);
    }, [reduxBatch])

    return (
        <div>
            <ControlledTable
                variant="modern"
                showLoadingText={true}
                data={reduxBatch?.inventory?.content}
                columns={visibleColumns}
                className={TableClass}
            />
        </div>
    )
}
