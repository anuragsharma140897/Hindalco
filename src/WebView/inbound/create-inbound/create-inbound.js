import React, { useCallback, useState } from 'react'
import PageHeader from '../../../shared/page-header'
import DateAndTime from '../../../Component/ui/date-and-time/date-and-time'
import SearchableSelect from '../../../Component/ui/form/select/SearchableSelect'
import { searchGeneral } from '../../../Constant/Api/Api'
import { useDispatch, useSelector } from 'react-redux'
import { setInboundApiJson } from '../../../Store/Action/inbound/inbound-action'

function CreateInbound() {
  const [defaultDate, setDefaultDate] = useState(new Date());
  const dispatch = useDispatch();
  const reduxInboud = useSelector(state => state.InboundReducer);

  const handleOnChange = useCallback((e, name) => {
    const { id, value } = e;
    const newJson = { [name]: name === 'siteIds' ? id : value };
    const updatedJson = { ...reduxInboud?.apiJson, ...newJson };
    dispatch(setInboundApiJson(updatedJson));
  }, [dispatch, reduxInboud?.apiJson])

  console.log("reduxInboud", reduxInboud);

  const handleDateChange = (e, name) => {
    setDefaultDate(e)


    const formattedDate = e?.toISOString()?.slice(0, 19)




    let oldJson = reduxInboud?.apiJson
    let json = {
      [name]: formattedDate
    }

    Object.assign(oldJson, json)

    dispatch(setInboundApiJson(oldJson));

  }

  console.log("reduxInboud", reduxInboud);
  return (
    <div>
      <PageHeader metaTitle={'Inbound / Create'} disbleExport />
      {/* general */}
      <div>
        <div className='text-base text-black font-semibold'>General</div>
        <div className='bg-white p-10 rounded-xl grid grid-cols-4 mt-5 gap-x-8'>
          <DateAndTime label={"Order Date Time"} onChange={(e) => { handleDateChange(e, "orderDateTime") }} value={defaultDate} />
          <DateAndTime label={"Expected Arrival"} onChange={(e) => { handleDateChange(e, "expectedArrival") }} value={defaultDate} />
          <SearchableSelect name="orderType" label="Order Type" api={searchGeneral} checkServerKey={'fieldName'} checkServerValue={'ordertype'} getFieldName={'value'} onChange={(e) => handleOnChange(e, 'orderType')} />
          <SearchableSelect name="orderStatus" label="Order Status" api={searchGeneral} checkServerKey={'fieldName'} checkServerValue={'ordertype'} getFieldName={'value'} onChange={(e) => handleOnChange(e, 'orderType')} />
        </div>
      </div>
      <div className='mt-5'>
        <div className='text-base text-black font-semibold'>Customer </div>
        {/* <div className='bg-white p-10 rounded-xl grid grid-cols-4 mt-5 gap-x-8'>
          <DateAndTime label={"Order Date Time"} onChange={(e) => { handleDateChange(e, "orderDateTime") }} value={defaultDate} />
          <DateAndTime label={"Expected Arrival"} onChange={(e) => { handleDateChange(e, "expectedArrival") }} value={defaultDate} />
          <SearchableSelect name="orderType" label="Order Type" api={searchGeneral} checkServerKey={'fieldName'} checkServerValue={'ordertype'} getFieldName={'value'} onChange={(e) => handleOnChange(e, 'orderType')} />
          <SearchableSelect name="orderStatus" label="Order Status" api={searchGeneral} checkServerKey={'fieldName'} checkServerValue={'ordertype'} getFieldName={'value'} onChange={(e) => handleOnChange(e, 'orderType')} />
        </div> */}
      </div>
    </div>
  )
}

export default CreateInbound