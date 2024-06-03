import React, { useMemo } from 'react'
import PageHeader from '../../../shared/page-header'
import { useModal } from '../../../shared/modal-views/use-modal';
import ControlledTable from '../../../Component/ControlledTable/ControlledTable';
import { userData } from '../../../dummyData/user-data';
import { pageHeader } from '../../../config/pageHeader';
import { getUserColumns } from './user-column';
import { useColumn } from '../../../Hooks/use-column';
import { useSelector } from 'react-redux';
import { TableClass } from '../../../Constant/Classes/Classes';

export default function UserManagement() {
    const { openModal } = useModal();
    const columns = useMemo(() => getUserColumns({ userData, openModal }))
    const { visibleColumns } = useColumn(columns);
    const reduxPagination = useSelector(state => state.PaginationReducer)

    return (
        <div>
            <PageHeader metaTitle={'User Management'} btnText={'Add User'} children={<h1>H1 Tag</h1>} />
            
            <ControlledTable
                variant="modern"
                isLoading={false}
                showLoadingText={true}
                data={userData}
                columns={visibleColumns}
                className={TableClass}
            />
        </div>
    )
}
