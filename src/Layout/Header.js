import Logo from "../Assets/logo";
import HamburgerButton from "./HamburgerButton";
import Sidebar from "./Sidebar";
import StickyHeader from "./sticky-header";

export default function Header() {
    //   const { colorPresetName } = useColorPresetName();
    let theme = 'light'

    return (
        <StickyHeader className="fixed start-0 top-0 z-[990] w-full bg-primary dark:bg-gray-100/50 dark:backdrop-blur-3xl 2xl:py-5 3xl:px-8 4xl:px-10">
            <div className="flex w-full max-w-2xl items-center">
                <HamburgerButton
                    className="text-gray-200 dark:text-gray-600"
                    view={<Sidebar className="static w-full 2xl:w-full" />}
                />
                <label
                    aria-label="Site Logo"
                    className="me-4 w-9 shrink-0 text-gray-900 hover:text-gray-800 lg:me-5 xl:hidden"
                >
                    <Logo iconOnly={true} className="invert dark:invert-0" />
                </label>
                <div className="hidden w-[270px] xl:inline-block 2xl:w-72">
                    <label
                        aria-label="Site Logo"
                        className="w-[155px] text-gray-900 hover:text-gray-800"
                    >
                        <Logo className="max-w-[155px] invert dark:invert-0" />
                    </label>
                </div>
            </div>
        </StickyHeader>
    );
}
