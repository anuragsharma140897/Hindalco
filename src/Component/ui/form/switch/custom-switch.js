import React from 'react'
import { Switch } from 'rizzui'

export default function CustomSwitch({ register, fieldName, errors, label, labelPlacement }) {
    return (
        <div>
            <Switch
                label={label}
                variant="outline"
                labelPlacement={labelPlacement||'right'}
            />
        </div>
    )
}
