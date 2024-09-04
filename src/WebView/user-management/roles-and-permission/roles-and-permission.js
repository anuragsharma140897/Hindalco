import React, { useEffect, useMemo, useState } from 'react'
import { useModal } from '../../../shared/modal-views/use-modal';
import { useColumn } from '../../../Hooks/use-column';
import { useDispatch, useSelector } from 'react-redux';
import { GetRolesAndPermissionColumns } from './roles-and-permission-column';
import { TableClass } from '../../../Constant/Classes/Classes';
import PageHeader from '../../../shared/page-header';
import { roleData } from '../../../dummyData/role-and-permission-data';
import { Badge, Text, Title } from 'rizzui';
import AddRolesAndPermission from './add/add-roles-and-permission';
import { HitApi } from '../../../Store/Action/Api/ApiAction';
import { searchRole } from '../../../Constant/Api/Api';
import { setRolesAndPermissionApiJson, setRolesAndPermissionMainData } from '../../../Store/Action/RolesAndPermission/RolesAndPermissionAction';
import { CompileRolesAndPermission } from './promiss/roles-and-permission.promiss';
import useAlertController from '../../../Hooks/use-alert-controller';
import { ScreenName } from '../../../Constant/Screen/Screen';
import ControlledTable from '../../../Component/ui/table/custom-table';
import { setPagination } from '../../../Store/Action/Pagination/PaginationAction';

export const PermissionTypes = () => {
  return <div className='flex items-center gap-5'>
    <div><Title as="h6"> Permission Types </Title></div>
    <div className='flex gap-4 my-4'>
      <div className="flex items-center ">
        <Badge renderAsDot className="bg-yellow-500" />
        <Text className="ms-2 font-medium capitalize text-gray-600"> Read </Text>
      </div>
      <div className="flex items-center">
        <Badge renderAsDot className="bg-green-500" />
        <Text className="ms-2 font-medium capitalize text-gray-600"> Write </Text>
      </div>
      <div className="flex items-center">
        <Badge renderAsDot className="bg-red-500" />
        <Text className="ms-2 font-medium capitalize text-gray-600"> Delete </Text>
      </div>
    </div>
  </div>
}

export default function RolesAndPermission() {
  const { openModal, closeModal } = useModal();
  const dispatch = useDispatch()
  const reduxRolesAndPermission = useSelector(state => state.RolesAndPermissionReducer)
  const reduxPagination = useSelector(state => state.PaginationReducer);
  let rd = reduxRolesAndPermission?.mainData || []
  const { showCustomAlert } = useAlertController();
  const columns = useMemo(() => GetRolesAndPermissionColumns({ openModal, closeModal, showCustomAlert }))

  const { visibleColumns } = useColumn(columns);

  useEffect(() => {
    if (reduxRolesAndPermission?.mainData === null) {
      loadData('init')
    }

  }, [])

  const loadData = (type) => {
    var json = reduxRolesAndPermission?.searchJson
    if (type === 'init') {
      Object.assign(json, { page: 1, limit: reduxPagination?.doc?.limit });
    } else {
      Object.assign(json, { page: reduxPagination?.doc?.number, limit: reduxPagination?.doc?.limit });
    }

    HitApi(json, searchRole).then((result) => {
      if (result?.content?.length > 0)
        CompileRolesAndPermission(result).then((CompiledData) => {
          dispatch(setRolesAndPermissionMainData(CompiledData))
          dispatch(setPagination({
            limit: json?.limit,
            totalPages: CompiledData?.totalPages,
            number: CompiledData?.number,
            totalElements: CompiledData?.totalElements,
        }));
        })
    }).catch(err => {

    })
  }

  return (
    <div>
      <PageHeader screen={ScreenName?.roleAndPermission} btnText={'Add Role'} children={<AddRolesAndPermission closeModal={closeModal} />} customSize={800} title={'Add Roles and Permission'} />
      <PermissionTypes />
      <ControlledTable
        screen={ScreenName?.roleAndPermission}
        variant="modern"
        isLoading={false}
        showLoadingText={true}
        data={reduxRolesAndPermission?.mainData?.content}
        json={reduxRolesAndPermission?.searchJson}
        columns={visibleColumns}
        className={TableClass}
        setAction={setRolesAndPermissionApiJson}
        ApiHit={loadData}
      />
    </div>
  )
}
