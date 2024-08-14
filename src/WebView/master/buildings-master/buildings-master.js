import React, { useMemo } from 'react'
import PageHeader from '../../../shared/page-header'
import ControlledTable from '../../../Component/ControlledTable/ControlledTable'
import { useModal } from '../../../shared/modal-views/use-modal'
import { useColumn } from '../../../Hooks/use-column'
import { getBuildingMasterColumns } from './building-column'
import { TableClass } from '../../../Constant/Classes/Classes'
import AddBuildingMaster from '../../../Form/master/building-master/add-building-master'
import { buildingData } from '../../../dummyData/building-data'

export default function BuildingsMaster() {
  const { openModal, closeModal } = useModal();
  const columns = useMemo(() => getBuildingMasterColumns({ buildingData, openModal, closeModal }))
  const { visibleColumns } = useColumn(columns);

  return (
    <div>
      <PageHeader  btnText={'Add Building'} children={<AddBuildingMaster closeModal={closeModal} />} title={'Add Building'} titleClass={'text-center'} customSize={700} />
      <ControlledTable variant="modern" isLoading={false} showLoadingText={true} data={buildingData} columns={visibleColumns} className={TableClass}/>
    </div>
  )
}
