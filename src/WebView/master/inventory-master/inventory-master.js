// import { useDispatch } from "react-redux";
// import AddGeneralMaster from "../../../Form/master/general-master/add-general-master";
// import PageHeader from "../../../shared/page-header";



// export default function InventoryMaster() {
//   const dispatch = useDispatch()
//   const reduxGeneral = useSelector(state => state.GeneralMasterReducer)
//   const reduxPagination = useSelector(state => state.PaginationReducer)
//   const [loading ,setLoading ] = useState(false)


//   const { openModal, closeModal } = useModal();
//   const columns = useMemo(() => getGeneralMasterColumns({ openModal, closeModal ,loading,setLoading }))
//   const { visibleColumns } = useColumn(columns);

//   useEffect(() => {
//     if (reduxGeneral?.doc === null) {
//       loadData('init')
//     }
//   }, [])
//   const loadData = (type) => {
//     var json = reduxGeneral?.searchJson
//     if (type === 'init') {
//       Object.assign(json, { page: 1, limit: reduxPagination?.doc?.limit })
//     } else {
//       Object.assign(json, { page: reduxPagination?.doc?.number, limit: reduxPagination?.doc?.limit })
//     }


//     HitApi(json, searchGeneral).then((result) => {
//       if (result) {
//         CompileGeneralMaster(result).then((CompiledData) => {
//           dispatch(setGeneralMasterData(CompiledData))
//           var tp = { limit: json?.limit, totalPages: CompiledData?.totalPages, number: CompiledData?.number, totalElements: CompiledData?.totalElements }
//           dispatch(setPagination(tp))
//         })
//       }
//     })
//   }


//   return (
//     <div>
//       <PageHeader btnText={'Add General Master'} children={<AddGeneralMaster closeModal={closeModal} />} title={'Add General Master'} customSize={400} />
//       {/* <ControlledTable
//         variant="modern"
//         isLoading={false}
//         showLoadingText={true}
//         data={reduxGeneral?.doc?.content}
//         columns={visibleColumns}
//         className={TableClass}
//         ApitHit={loadData}

//       /> */}
//     </div>
//   )

// }



import React from 'react'
import PageHeader from "../../../shared/page-header";
import AddInventoryMaster from '../../../Form/master/inventory-master/add-inventory-master';
import { useModal } from '../../../shared/modal-views/use-modal';
import { useSelector } from 'react-redux';


function InventoryMaster() {
  const reduxUser = useSelector(state => state.UserMasterReducer)

  const { openModal, closeModal } = useModal();

  return (
    <div>
      <PageHeader btnText={'Add Batch'} children={<AddInventoryMaster closeModal={closeModal} />} title={'Add Batch'} customSize={400} />

    </div>
  )
}

export default InventoryMaster 
