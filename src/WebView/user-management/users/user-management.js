import React, { useEffect, useMemo } from 'react'
import PageHeader from '../../../shared/page-header'
import { useModal } from '../../../shared/modal-views/use-modal';
import ControlledTable from '../../../Component/ControlledTable/ControlledTable';
import { userData } from '../../../dummyData/user-data';
import { getUserColumns } from './user-column';
import { useColumn } from '../../../Hooks/use-column';
import { TableClass } from '../../../Constant/Classes/Classes';
import AddUserMaster from '../../../Form/master/user-master/add-user-master';
import { useDispatch, useSelector } from 'react-redux';
import { HitApi } from '../../../Store/Action/Api/ApiAction';
import { searchUser } from '../../../Constant/Api/Api';
import { CompileUserMaster } from './promiss/user-promiss';
import { setUserData } from '../../../Store/Action/user-management/user-action';


export default function UserManagement() {
    const dispatch = useDispatch()
    const reduxUser = useSelector(state => state.UserReducer)
    const { openModal, closeModal } = useModal();
    const columns = useMemo(() => getUserColumns({ openModal, closeModal }))
    const { visibleColumns } = useColumn(columns);

    useEffect(() => {
        if (reduxUser?.doc === null) {
            loadData()
        }



    }, [])

    const loadData = () => {
        var json = reduxUser?.searchJson
        HitApi(json, searchUser).then((result) => {
            if (result) {
                CompileUserMaster(result).then((CompiledData) => {
                    dispatch(setUserData(CompiledData))
                })
            }
        })
    }

    return (
        <div>
            <PageHeader btnText={'Add User'} children={<AddUserMaster closeModal={closeModal} />} title={'Add User'} titleClass={'text-center'} customSize={700} />
            <ControlledTable variant="modern" isLoading={false} showLoadingText={true} data={reduxUser?.doc?.content} columns={visibleColumns} className={TableClass} />
        </div>
    )
}
