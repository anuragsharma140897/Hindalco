import React from 'react'
import SearchableSelect from '../../../Component/ui/form/select/SearchableSelect'
import CustomButton from '../../../Component/ui/buttons/custom-button'

export default function AddScreen({api, limit, name, label, getFieldName,getFieldLabel, getFieldValue, reduxState, setAction, onClick}) {
  return (
    <div className='p-10'>
        {/* <SearchableSelect api={api} limit={limit} /> */}
        <SearchableSelect name="roleName" label="Role" api={api} getFieldName={'value'} getFieldLabel={'value'} getFieldValue={'value'} />

        <CustomButton text={'Add'} onClick={onClick}/>
    </div>
  )
}
