import React, { useEffect, useState } from 'react'
import { HitApi } from '../../../Store/Action/Api/ApiAction'
import { searchOrder, searchVehicle } from '../../../Constant/Api/Api'
import { useDispatch, useSelector } from 'react-redux';
import { setOutboundAddedVehicle, setOutboundApiJson } from '../../../Store/Action/outbound/outbound-action';
import CreateOutbound from '../create-outbound/create-outbound';
import { setSearchableSelectSelectedData } from '../../../Store/Action/common/searcheable-select/searcheable-select-action';

function EditOutbound() {

  const reduxOutbound = useSelector(state => state.OutboundReducer);
  
  const reduxSelect = useSelector(state => state.SearchableSelectReducer)
  const dispatch = useDispatch()



  useEffect(() => {
   
      loadData()
  
  }, [])

  const loadData = () => {

    const pathname = window.location.pathname
    const id = pathname.split('/')[3]

    var json = {
      page: 1,
      limit: 1,
      search: {
        id: id,
      }
    }
    HitApi(json, searchOrder).then(res => {


      var oldJson = reduxOutbound.apiJson
      oldJson = res?.content[0]


      dispatch(setOutboundApiJson(oldJson))


      var json = [{name:'dispatchFrom',value:res?.content?.[0]?.dispatchFromName},{name:'orderStatus',value:res?.content?.[0]?.orderStatus},{name:'saleType',value:res?.content?.[0]?.saleType} ,{name:'billTo',value:res?.content?.[0]?.billToName},{name:'dispatchTo',value:res?.content?.[0]?.dispatchToName}]


      res?.content?.[0]?.vehicleIds?.map((ele,i)=>{

        var json = {
          page:1,
          limit:10,
          search:{
            id:ele.vehicleId,
          }
        }



        HitApi(json,searchVehicle).then(res=>{



          dispatch(setOutboundAddedVehicle(res?.content))
        })
      })

      dispatch(setSearchableSelectSelectedData(json))

    })
  }



  return (
  
    <CreateOutbound />
  )
}

export default EditOutbound