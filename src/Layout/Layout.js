import React from 'react'
import Header from './Header'
import Sidebar from './Sidebar'
import CustomRoutes from './Routes'
import HeaderPannel from './HeaderPannel';

export default function Layout() {
  return (
    <main className="flex min-h-screen flex-grow">
      <Sidebar className="fixed hidden xl:block dark:bg-gray-50" />
      <Header />
      <div className="flex w-full flex-col xl:ms-[270px] xl:w-[calc(100%-270px)] 2xl:ms-72 2xl:w-[calc(100%-288px)] bg-[#f1f1f1]">
        <div>
        <HeaderPannel/>
          <div className="flex flex-grow flex-col px-4 pb-6   md:px-5 lg:px-6 lg:pb-8  3xl:px-8  4xl:px-10 4xl:pb-9 bg-[#f1f1f1]">
            <CustomRoutes />
          </div>
        </div>
      </div>
    </main>
  )
}
