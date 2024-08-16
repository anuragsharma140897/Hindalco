import React from 'react'
import { Button } from 'rizzui'
import { useMedia } from '../../../Hooks/use-media';
import cn from '../../../Utils/class-names';


export default function CustomButton({text, variant='solid', color='secondary', onClick, className, disabled, type}) {
  const isMedium = useMedia('(max-width: 1200px)', false);;
  return (
    <Button type={type} className={cn(type==='submit'?'bg-red-main hover:border-red-main hover:bg-red-main':'hover:border-none hover:border-slate-800 hover:bg-gray-200 hover:text-gray-600',className)} size={isMedium ? 'lg' : 'md'}  variant={ variant ? variant :'solid'} color={color} onClick={onClick} disabled={disabled}>{text}</Button>
  )
}
