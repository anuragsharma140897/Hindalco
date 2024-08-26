import React, { useMemo } from 'react'
import PageHeader from '../../../shared/page-header'
import ControlledTable from '../../../Component/ui/table/custom-table'
import OutboundAddVehicle from './outbound-add-vehicle'
import { getGeneralMasterColumns } from '../../master/general-master/general-column'
import { useColumn } from '../../../Hooks/use-column'
import { useModal } from '../../../shared/modal-views/use-modal'
import { useSelector } from 'react-redux'
import { TableClass } from '../../../Constant/Classes/Classes'

function AddVehicle() {
  const { openModal, closeModal } = useModal();
  const [loading, setLoading] = React.useState(false);
  const columns = useMemo(() => getGeneralMasterColumns({ openModal, closeModal ,loading,setLoading }))
  const { visibleColumns } = useColumn(columns);
  const reduxOutbound = useSelector((state) => state.OutboundReducer);

  console.log("reduxOutbound",reduxOutbound);

  return (
    <div className=' border-2 py-5 my-5 border-r-0 border-l-0 border-b-0'>
      <div className='text-lg font-bold'>Vehicle Allotted </div>
            <PageHeader btnText={'Add Vehicle'} children={<OutboundAddVehicle/>} title={'Add Vehicle'} disbleExport={true} customSize={800} />
            <ControlledTable
        variant="modern"
        isLoading={false}
        showLoadingText={true}
        data={reduxOutbound?.apiJson?.vehicleIds}
        columns={visibleColumns}
        className={TableClass}
        // ApitHit={loadData}

      />


    </div>
  )
}

export default AddVehicle