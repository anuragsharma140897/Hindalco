import "@/styles/globals.css";
import { wrapper } from '@/redux/store'
import HydrogenLayout from "@/layouts/hydrogen/layout";
import cn from "@/utils/class-names";
import { inter, lexendDeca } from "./fonts";
import { ThemeProvider } from "@/components/theme-provider";
import GlobalDrawer from "@/shared/drawer-views/container";
import GlobalModal from "@/shared/modal-views/container";

function App({ Component, pageProps, children }) {
  return (
    <ThemeProvider>
      <HydrogenLayout>
        <Component {...pageProps} />
      </HydrogenLayout>
      <GlobalDrawer />
      <GlobalModal />
    </ThemeProvider>
  )
}


export default wrapper.withRedux(App)