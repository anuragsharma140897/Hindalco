import React, { useEffect, useState } from 'react'
import { FilterCondition } from '../../../Constant/filters/Filter'
import { Badge, Button, Select, Text } from 'rizzui'; // Import the status classes
import { STATUS_CLASSES } from '../../../Constant/Colors/Color';
import { ScreenName } from '../../../Constant/Screen/Screen';
import { useDispatch } from 'react-redux';

export default function CustomFilter({ screen, json, setAction, ApiHit }) {
    const dispatch = useDispatch()
    const FilterItem = FilterCondition?.find(Obj => Obj?.screen === screen);

    const handleFilterChange = (e, serverKey) => {
        let { label, value, id } = e
        if (value === 'all') {
            Object.assign(json, { search: {} })
        } else {
            Object.assign(json.search, { [serverKey]: value })
        }

        dispatch(setAction(json))
        if (ApiHit) { ApiHit() }
    }

    const removeJson = () => {
        var tj = json
        Object.assign(json, { search: {} })
        dispatch(setAction(json))
        if (ApiHit) { ApiHit() }
    }

    return (
        <div className='grid grid-cols-4 gap-4'>
            {
                FilterItem?.condition?.map((ele, index) => <div key={index}>
                    {typeof ele.render === 'function'
                        ? ele.render((e) => handleFilterChange(e, ele?.serverKey))
                        : ele.render}
                </div>)
            }
            {Object.keys(json?.search)?.length > 0 && <div><Button onClick={() => removeJson()}>Remove Filter</Button></div>}
        </div>
    );
}