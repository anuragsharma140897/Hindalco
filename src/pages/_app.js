import "@/styles/globals.css";
import "@/styles/custom.css";
import { wrapper } from '@/redux/store'
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { ThemeProvider } from "@/components/theme-provider";
import HydrogenLayout from "@/layouts/hydrogen/layout";
import GlobalDrawer from "@/shared/drawer-views/container";
import GlobalModal from "@/shared/modal-views/container";
import SignIn from "./auth/signin";

function App({ Component, pageProps }) {

  const reduxAuth = useSelector(state => state.AuthReducer)

  useEffect(() => {
    console.log('reduxAuth', reduxAuth);

  }, [])

  return (
    <div>
      {/* {reduxAuth?.doc ?
        <ThemeProvider>
          <HydrogenLayout>
            <Component {...pageProps} />
          </HydrogenLayout>
          <GlobalDrawer />
          <GlobalModal />
        </ThemeProvider> : <SignIn />
      } */}
      <ThemeProvider>
        <HydrogenLayout>
          <Component {...pageProps} />
        </HydrogenLayout>
        <GlobalDrawer />
        <GlobalModal />
      </ThemeProvider>
    </div>
  )
}


export default wrapper.withRedux(App)
