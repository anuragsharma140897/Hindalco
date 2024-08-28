import React, { useEffect, useState } from 'react'
import { HitApi } from '../../../Store/Action/Api/ApiAction'
import { searchOrder } from '../../../Constant/Api/Api'
import { useDispatch, useSelector } from 'react-redux';
import { setOutboundApiJson } from '../../../Store/Action/outbound/outbound-action';
import CreateOutbound from '../create-outbound/create-outbound';

function EditOutbound() {

  const reduxOutbound = useSelector(state => state.OutboundReducer);
  const dispatch = useDispatch()


  const [data, setData] = useState(null)

  useEffect(() => {
    if (data === null) {
      loadData()
    }
  }, [])

  const loadData = () => {

    const pathname = window.location.pathname
    const id = pathname.split('/')[3]
    console.log('id', id);
    setData(id)
    var json = {
      page: 1,
      limit: 1,
      search: {
        id: id,
      }
    }
    HitApi(json, searchOrder).then(res => {

      console.log('res',res);

      var oldJson = reduxOutbound.apiJson
      oldJson.dispatchFrom = res?.content?.[0]?.dispatchFrom
      dispatch(setOutboundApiJson(oldJson))
      setData(res)
    })
  }

  console.log(data);

  return (
    data !== null &&
    <CreateOutbound />
  )
}

export default EditOutbound