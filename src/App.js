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

export default function App() {
  return (
    <div>
      <Layout/>
      <GlobalDrawer />
      <GlobalModal />
    </div>
  )
}
