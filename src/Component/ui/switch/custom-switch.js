import React from 'react'
import { useDispatch } from 'react-redux'
import { Switch } from 'rizzui'

export default function CustomSwitch({ reduxState,name, label, value, disabled,setAction, position }) {

    const dispatch = useDispatch()

    const onClick = (value) =>{
        if(disabled !== true){
            var oldJson = reduxState
            oldJson[name] = value;
            dispatch(setAction(oldJson));
        }
    }

    return (
        <div>
            {position==='top' && <label className="block font-bold ">{label}</label> }
            <Switch
                label={position!=='top' && label}
                checked={value}
                onClick={()=>onClick(value?false:true)}
                variant="outline"
            />
            {disabled ? <span className='text-red-500 text-xs tracking-wide'>This field cannot be edited</span> : null}
        </div>
    )
}
