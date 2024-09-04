import React from 'react'
import { FilterCondition } from '../../Constant/filters/Filter'
import { Button } from 'rizzui'
import cn from '../../Utils/class-names'
import { useDispatch } from 'react-redux'
import { setInventoryJson } from '../../Store/Action/Inventory-management/inventory-management-action'

export default function ButtonFilter({screen, json}) {
    const dispatch = useDispatch()
    var td = FilterCondition?.find(Obj=>Obj.screen === screen)

    const handleStatus = (value) =>{
        var t_json = json
        Object.assign(t_json.search, { type : value})
        dispatch(setInventoryJson(t_json))
    }

    const CreateButton = ({ele})=>{
        return <Button className={cn('mx-1 ', ele?.value === json?.search?.type ? 'bg-grey-dark text-white hover:text-white hover:border-grey-dark' : '')} variant='outline' onClick={()=>handleStatus(ele?.value)}>{ele?.title}</Button>
    }

    return (
        <div>
            {td?.condition?.map((ele, index)=><CreateButton key={index} ele={ele}/>)}
        </div>
    )
}
