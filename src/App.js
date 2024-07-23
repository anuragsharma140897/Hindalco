import React from 'react'
import '@fontsource/hind-vadodara/300.css';
import '@fontsource/hind-vadodara/400.css';
import '@fontsource/hind-vadodara/500.css';
import '@fontsource/hind-vadodara/600.css';
import '@fontsource/hind-vadodara/700.css';
import './App.css'
import './custom.css'
import Layout from './Layout/Layout';
import GlobalDrawer from './shared/drawer-views/container';
import GlobalModal from './shared/modal-views/container';
import Login from './WebView/login/login';
import GlobalConfirmBox from './shared/confirm/container';
import { useSelector } from 'react-redux';

export default function App() {
  const isLogin  = true

  return (
    <div>
      {
      isLogin ? <>
        <Layout />
        <GlobalDrawer />
        <GlobalModal />
        <GlobalConfirmBox />
      </> : 
      <Login />
      }
      {/* <Layout/>
      <GlobalDrawer />
      <GlobalModal />
      <GlobalConfirmBox/> */}

    </div>
  )
}
