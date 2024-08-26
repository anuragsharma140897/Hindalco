import React, { useCallback, useMemo, useState } from 'react'
import PageHeader from '../../../shared/page-header'
import ControlledTable from '../../../Component/ui/table/custom-table'
import OutboundAddVehicle from './outbound-add-vehicle'
import { getGeneralMasterColumns } from '../../master/general-master/general-column'
import { useColumn } from '../../../Hooks/use-column'
import { useModal } from '../../../shared/modal-views/use-modal'
import { useDispatch, useSelector } from 'react-redux'
import { TableClass } from '../../../Constant/Classes/Classes'
import { getaddVehicleColumns } from './add-vehicle-column'
import { Radio, RadioGroup } from 'rizzui'
import { searchBatch } from '../../../Constant/Api/Api'
import { setOutboundApiJson } from '../../../Store/Action/outbound/outbound-action'
import SearchableSelect from '../../../Component/ui/form/select/SearchableSelect'
import OutboundBatch from '../outbound-batch/outbound-batch'

function AddVehicle() {
  const { openModal, closeModal } = useModal();
  const [value, setValue] = useState("");

  const [loading, setLoading] = React.useState(false);
  const columns = useMemo(() => getaddVehicleColumns({ openModal, closeModal, loading, setLoading }))
  const { visibleColumns } = useColumn(columns);
  const reduxOutbound = useSelector((state) => state.OutboundReducer);
  const [selectedDetails, setSelectedDetails] = useState(null);




  console.log("reduxOutbound", reduxOutbound);

  return (
    <div className=' border-2 py-5 my-5 border-r-0 border-l-0 border-b-0'>
      <div className='text-lg font-bold'>Vehicle Allotted </div>
      <PageHeader btnText={'Add Vehicle'} children={<OutboundAddVehicle />} title={'Add Vehicle'} disbleExport={true} customSize={800} />
      <ControlledTable variant="modern" isLoading={false} showLoadingText={true} data={reduxOutbound?.vehicleAdded} columns={visibleColumns} className={TableClass} />
      <div className='mt-5'>
        <div className='text-base text-black font-semibold mb-5'>Batch / Without batch</div>
        <RadioGroup
          value={value}
          setValue={(newValue) => {
            setValue(newValue);
            setSelectedDetails(null);
          }}
          className="flex gap-4"
        >
          <Radio label="Batch" value="Batch" />
          <Radio label="Ignore batch" value="Ignorebatch" />
        </RadioGroup>
      </div>
      <div className='grid grid-cols-4'>
        <div className='mt-5 '>
          {value === "Batch" && <OutboundBatch />}

          {/* {value === "Batch" && <SearchableSelect name="batchId" label="Batch" api={searchBatch} getFieldName={'batchName'} onChange={(e) => handleOnChange(e, 'batchId')} />} */}
          {/* {value === "Ignorebatch" && <SearchableSelect name="supplierId" label="Supplier" api={searchSupplier} getFieldName={'supplierName'} onChange={(e) => handleOnChange(e, 'supplierId')} />} */}
        </div>
      </div>


    </div>
  )
}

export default AddVehicle