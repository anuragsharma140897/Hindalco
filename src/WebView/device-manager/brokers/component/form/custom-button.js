import React from 'react'
import { Button } from 'rizzui'
import cn from '../../../../../Utils/class-names'

export default function CustomButton({ title, onClick, LeftIcon, variant='flat', disabled }) {
    return (
        <Button onClick={onClick} className={cn('hover:bg-red-main hover:text-white disabled:hover:bg-gray-200 disabled:hover:text-gray-400')} variant={variant} disabled={disabled}>
            <span className='mr-1'>{LeftIcon}</span>
            {title}
        </Button>
    )
}
