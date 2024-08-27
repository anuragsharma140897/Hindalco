import React, { useEffect, useMemo, useState } from 'react'
import ControlledTable from '../../../Component/ControlledTable/ControlledTable'
import PageHeader from '../../../shared/page-header'
import { useModal } from '../../../shared/modal-views/use-modal';
import { useColumn } from '../../../Hooks/use-column';
import { userData } from '../../../dummyData/user-data';
import { getSiteMasterColumns } from './site-column';
import { TableClass } from '../../../Constant/Classes/Classes';
import AddSiteMaster from '../../../Form/master/site-master/add-site-master';
import { HitApi } from '../../../Store/Action/Api/ApiAction';
import { searchSite } from '../../../Constant/Api/Api';
import { useDispatch, useSelector } from 'react-redux';
import { CompileSiteMaster } from './promiss/site-master.promiss';
import { setSiteMasterData } from '../../../Store/Action/master/site-master/site-master-action';
import useAlertController from '../../../Hooks/use-alert-controller';

export default function SiteMaster() {
  const dispatch = useDispatch()
  const reduxSite = useSelector(state => state.SiteMasterReducer)
  const { openModal, closeModal } = useModal();
  const { showCustomAlert } = useAlertController();
  const [loading, setLoading] = useState(false)

  const loadData = () => {
    var json = reduxSite?.searchJson

    console.log('json', json);
    setLoading(true)
    HitApi(json, searchSite).then((result) => {
      if (result) {
        CompileSiteMaster(result).then((CompiledData) => {
          dispatch(setSiteMasterData(CompiledData))
          setLoading(false)
        })
      }
    })
  }

  const columns = useMemo(() => getSiteMasterColumns(openModal, closeModal, loadData, showCustomAlert))
  const { visibleColumns } = useColumn(columns);

  useEffect(() => {
    if (reduxSite?.doc === null) {
      loadData()
    }
  }, [])

  return (
    <div>
      <PageHeader metaTitle={'Site Master'} btnText={'Add Site'} children={<AddSiteMaster closeModal={closeModal} ApiHit={loadData} />} title={'Add Site'} customSize={400} />
      <ControlledTable
      
        variant="modern"
        isLoading={loading}
        showLoadingText={true}
        data={reduxSite?.doc?.content}
        columns={visibleColumns}
        className={TableClass}
      />
    </div>
  )
}
