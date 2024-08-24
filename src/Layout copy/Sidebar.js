import React from 'react'
import cn from '../Utils/class-names'
import SimpleBar from "../Component/ui/simplebar";
import { Title } from 'rizzui';
import SidebarMenu from './SidebarMenu';

export default function Sidebar({className}) {
  return (
    <aside
      className={cn(
        "fixed bottom-0 start-0 z-50 h-full w-[270px] shadow border-gray-100 bg-white 2xl:w-72 dark:bg-gray-100/50",
        className
      )}
    >
        <div className='mt-2'>
        <label
          href={"/"}
          aria-label="Site Logo"
          className="text-gray-800 hover:text-gray-900"
        >
        </label>
        </div>

      <SimpleBar className="h-[calc(100%-80px)]">
        <SidebarMenu/>
      </SimpleBar>
    </aside>
  )
}
