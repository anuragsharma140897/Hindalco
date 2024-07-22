import React from 'react'
import { useMedia } from '../../../../Hooks/use-media';
import { Input } from 'rizzui';
import cn from '../../../../Utils/class-names';

export default function CustomInput({register, fieldName, errors, label, className}) {
    const isMedium = useMedia('(max-width: 1200px)', false);
    return (
        <Input type="text" size={isMedium ? 'lg' : 'xl'} label={label} placeholder={`Enter ${label}`} className={cn('[&>label>span]:font-medium ', className)} {...register(fieldName||'dummyData')} error={errors?.[fieldName]?.message} />
    )
}
