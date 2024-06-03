import React from 'react'
import Header from './Header'
import Sidebar from './Sidebar'
import CustomRoutes from './Routes'

export default function Layout() {
  return (
    <main className="flex min-h-screen flex-grow">
      <Sidebar className="fixed hidden xl:block dark:bg-gray-50" />
      <Header />
      <div className="flex w-full flex-col xl:ms-[270px] xl:w-[calc(100%-270px)] 2xl:ms-72 2xl:w-[calc(100%-288px)]">
        <div className="flex flex-grow flex-col px-4 pb-6 pt-[82px] sm:pt-[86px] md:px-5 lg:px-6 lg:pb-8 2xl:pt-[104px] 3xl:px-8 3xl:pt-28 4xl:px-10 4xl:pb-9">
          <CustomRoutes/>
        </div>
      </div>
    </main>
  )
}
