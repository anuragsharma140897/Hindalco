import React, { useMemo } from 'react'
import PageHeader from '../../../shared/page-header'
import { useModal } from '../../../shared/modal-views/use-modal';
import ControlledTable from '../../../Component/ControlledTable/ControlledTable';
import { userData } from '../../../dummyData/user-data';
import { getUserColumns } from './user-column';
import { useColumn } from '../../../Hooks/use-column';
import { TableClass } from '../../../Constant/Classes/Classes';
import AddUserMaster from '../../../Form/master/user-master/add-user-master';

const initialValues = {
    siteName: '',
    building: '',
    area: ''
};

export default function UserManagement() {
    const { openModal, closeModal } = useModal();
    const columns = useMemo(() => getUserColumns({ userData, openModal }))
    const { visibleColumns } = useColumn(columns);

    return (
        <div>
            <PageHeader  btnText={'Add User'} children={<AddUserMaster closeModal={closeModal} />} title={'Add User'} titleClass={'text-center'} customSize={700} />
            <ControlledTable variant="modern" isLoading={false} showLoadingText={true} data={userData} columns={visibleColumns} className={TableClass} />
        </div>
    )
}
