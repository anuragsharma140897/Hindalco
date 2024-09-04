import React, { useEffect, useState } from 'react'
import { FilterCondition } from '../../../Constant/filters/Filter'
import { Badge, Button, Select, Text } from 'rizzui'; // Import the status classes
import { STATUS_CLASSES } from '../../../Constant/Colors/Color';
import { ScreenName } from '../../../Constant/Screen/Screen';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchableSelectSelectedData } from '../../../Store/Action/common/searcheable-select/searcheable-select-action';

export default function CustomFilter({ screen, json, setAction, ApiHit }) {
    const dispatch = useDispatch()
    const FilterItem = FilterCondition?.find(Obj => Obj?.screen === screen);
    const reduxSelect = useSelector(state => state.SearchableSelectReducer)

    const handleFilterChange = (e, serverKey) => {
        let { label, value, _id } = e
        if (value === 'all') {
            Object.assign(json, { search: {} })
            dispatch(setSearchableSelectSelectedData([]))
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
        dispatch(setSearchableSelectSelectedData([]))
        if (ApiHit) { ApiHit() }
    }

    const handleClearFilter = (name) => {

        const existingIndex = reduxSelect?.selected?.findIndex(item => item.name === name);

        if (existingIndex !== -1) {
            const updatedSelected = reduxSelect?.selected.filter(item => item.name !== name);
            dispatch(setSearchableSelectSelectedData(updatedSelected));
            delete json?.search?.[name]
            if (ApiHit) { ApiHit() }
        }
    };

    return (
        <div className='grid grid-cols-4 gap-4'>
            {
                FilterItem?.condition?.map((ele, index) => <div key={index}>
                    {typeof ele.render === 'function'
                        ? ele.render(
                            (e) => handleFilterChange(e, ele?.serverKey),
                            () => handleClearFilter(ele?.serverKey)
                        )
                        : ele.render}
                </div>)
            }
            {Object.keys(json?.search)?.length > 0 && <div><Button onClick={() => removeJson()}>Remove Filter</Button></div>}
        </div>
    );
}