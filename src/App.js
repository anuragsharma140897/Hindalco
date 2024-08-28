import React from 'react'
import '@fontsource/hind-vadodara/300.css';
import '@fontsource/hind-vadodara/400.css';
import '@fontsource/hind-vadodara/500.css';
import '@fontsource/hind-vadodara/600.css';
import '@fontsource/hind-vadodara/700.css';
import './App.css'
import './custom.css'
import 'react-loading-skeleton/dist/skeleton.css'
import Layout from './Layout/Layout';
import GlobalDrawer from './shared/drawer-views/container';
import GlobalModal from './shared/modal-views/container';
import Login from './WebView/login/login';
import GlobalConfirmBox from './shared/confirm/container';
import "./i18n";
import { getAuthenticatedUser } from './Storage/Storage';
import { Toaster } from 'react-hot-toast';
export default function App() {

 let user = getAuthenticatedUser()

  return (
    <div>
      {
        user ? <>
          <Layout />
          <GlobalDrawer />
          <GlobalModal />
          <GlobalConfirmBox />
          <Toaster position='top-right' />
        </> :
          <Login />
      }

    </div>
  )
}
