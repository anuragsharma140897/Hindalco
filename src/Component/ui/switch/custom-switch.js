import React from 'react'
import { useDispatch } from 'react-redux'
import { Switch } from 'rizzui'
import { setProductMasterApiJson } from '../../../Store/Action/master/product-master/product-master-action'

export default function CustomSwitch({ reduxState,name, label, value }) {

    const dispatch = useDispatch()

    const onClick = (value) =>{
        var oldJson = reduxState
        oldJson[name] = value;
        dispatch(setProductMasterApiJson(oldJson));
    }

    return (
        <div>
            <Switch
                label={label}
                checked={value}
                onClick={()=>onClick(value?false:true)}
                variant="outline"
            />
        </div>
    )
}
