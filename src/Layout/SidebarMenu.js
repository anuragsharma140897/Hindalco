import { Fragment } from "react";
import { Collapse, Title } from "rizzui";
import cn from '../Utils/class-names'
import { PiCaretDownBold, PiCommand } from 'react-icons/pi';
import { menuItems } from "./menu-items";
import { usePathname } from "../Hooks/use-pathname";
import { Colors } from "../Constant/Colors/Color";


const SidebarMenu = ({ colorPresetName, theme }) => {

    const pathname = usePathname()

    return menuItems?.map((item, index) => {
        const Icon = item.icon;
        const isActive = pathname === item.href;
        const isDropdownOpen = Boolean(item?.dropdownItems?.some(dropdownItem => dropdownItem.href === pathname));

        console.log("isDropdownOpen",isDropdownOpen);

        const renderItem = (href, isActive, children) => (

            <a href={href}
                className={cn(
                    'group relative mx-3 my-0.5 flex items-center justify-between rounded-md px-3 py-2 font-medium capitalize lg:my-1 2xl:mx-5 2xl:my-2',
                    isActive
                        ? 'bg-lightpink text-theme'
                        : 'text-black transition-colors duration-200 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-700/90'
                )}
            >
                <div className="flex w-full items-center truncate">
                    <div className={`flex items-center justify-center me-2 p-1 rounded-full ${isActive ? 'iconboxout' : ''} `}>
                        {Icon && (
                            <span
                                className={cn(
                                    ' inline-flex h-5 w-5 items-center justify-center rounded-md duration-200 [&>svg]:h-[20px] [&>svg]:w-[20px]',
                                    isActive
                                        ? 'text-theme'
                                        : 'text-gray-800 dark:text-gray-500 dark:group-hover:text-gray-700'
                                )}
                            >
                                {Icon}

                            </span>
                        )}
                    </div>
                    <span className="truncate">{children}</span>
                    {item?.shortcut && (
                        <span
                            className={cn(
                                'ms-auto hidden items-center gap-1 rounded px-1 duration-200 xl:inline-flex',
                                isActive
                                    ? 'bg-gray-100/30 dark:bg-gray-0/20'
                                    : 'bg-gray-100 group-hover:bg-gray-300'
                            )}
                        >
                            <kbd>
                                <PiCommand strokeWidth={1.3} className="h-[15px] w-[15px]" />
                            </kbd>
                            <kbd>{item.shortcut?.key}</kbd>
                        </span>
                    )}
                </div>
            </a>
        );

        const renderDropdownItem = (dropdownItem, isChildActive) => (
            <a
                href={dropdownItem.href}
                key={dropdownItem.name}
                className={cn(
                    'mx-3.5 mb-0.5 flex items-center justify-between rounded-md px-2 py-2 font-medium capitalize last-of-type:mb-1 lg:last-of-type:mb-2 2xl:mx-5',
                    isChildActive
                        ? 'text-theme bg-lightpink'
                        : 'text-gray-500 transition-colors duration-200 hover:bg-gray-100 hover:text-gray-900'
                )}
            >

                <div className="flex items-center justify-between gap-x-1">
                    <div className="p-[5px] rounded-full " style={{ background:isChildActive? Colors.CIRCULERPINK  :Colors.SUBICONBG}}>
                        {dropdownItem.icon}
                    </div>
                    <span className="flex items-center truncate text-xs">
                        {dropdownItem.name}
                    </span>

                </div>
            </a>
        );

        return (
            <Fragment key={item.name + '-' + index}>
                {item?.href ? (
                    item?.dropdownItems ? (
                        <Collapse
                            defaultOpen={isDropdownOpen}
                            header={({ open, toggle }) => (
                                <div
                                    onClick={toggle}
                                    className={cn(
                                        'group relative mx-3 flex cursor-pointer items-center justify-between rounded-md px-3 py-2 font-medium lg:my-1 2xl:mx-5 2xl:my-2',
                                        isDropdownOpen
                                            ? colorPresetName === 'black' && theme === 'dark'
                                                ? 'bg-gray-900 text-gray-0'
                                                : 'text-theme'
                                            : 'text-gray-700 transition-colors duration-200 hover:bg-gray-100 dark:text-gray-700/90 dark:hover:text-gray-700'
                                    )}
                                >
                                    <span className="flex items-center">
                                        {Icon && (
                                            <span
                                                className={cn(
                                                    'me-2 inline-flex h-5 w-5 items-center justify-center rounded-md [&>svg]:h-[20px] [&>svg]:w-[20px]',
                                                    isDropdownOpen
                                                        ? 'text-gray-0'
                                                        : 'text-gray-800 dark:text-gray-500 dark:group-hover:text-gray-700'
                                                )}
                                            >
                                                {Icon}
                                            </span>
                                        )}
                                        {item.name}
                                    </span>
                                    <PiCaretDownBold
                                        strokeWidth={3}
                                        className={cn(
                                            'h-3.5 w-3.5 -rotate-90 transition-transform duration-200 rtl:rotate-90',
                                            open && 'rotate-0 rtl:rotate-0',
                                            isDropdownOpen
                                                ? colorPresetName === 'black' && theme === 'dark'
                                                    ? 'text-gray-0 dark:text-gray-0'
                                                    : 'text-theme'
                                                : 'text-gray-800 dark:text-gray-500 dark:group-hover:text-gray-700'
                                        )}
                                    />
                                </div>
                            )}
                        >
                            {item.dropdownItems.map((dropdownItem, index) => {
                                const isChildActive = pathname === dropdownItem.href;
                                return renderDropdownItem(dropdownItem, isChildActive);
                            })}
                        </Collapse>
                    ) : (
                        renderItem(item.href, isActive, item.name)
                    )
                ) : (
                    <Title
                        as="h6"
                        className={cn(
                            'mx-6 mb-2 truncate text-xs font-normal uppercase tracking-widest text-gray-500 2xl:mx-8',
                            index !== 0 && 'mt-6 border-t border-gray-100 pt-6 2xl:pt-8 3xl:mt-7'
                        )}
                    >
                        {item.name}
                    </Title>
                )}
            </Fragment>
        );
    });
};

export default SidebarMenu;
