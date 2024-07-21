import React from 'react'
import '@fontsource/hind-vadodara/300.css';
import '@fontsource/hind-vadodara/400.css';
import '@fontsource/hind-vadodara/500.css';
import '@fontsource/hind-vadodara/600.css';
import '@fontsource/hind-vadodara/700.css';
import './App.css'
import Layout from './Layout/Layout';
import GlobalDrawer from './shared/drawer-views/container';
import GlobalModal from './shared/modal-views/container';
import Signin from './WebView/Account/Signin';

export default function App() {
const isloggedIn = true;


  return (
    <div>
      {
        isloggedIn ?
          <>
            <Layout />
            <GlobalDrawer />
            <GlobalModal />
          </>
          :
          <Signin />
      }

    </div >
  )
}
