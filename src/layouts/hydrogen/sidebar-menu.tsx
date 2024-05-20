'use client';

import Link from 'next/link';
import { Fragment } from 'react';
import { usePathname } from 'next/navigation';
import { Title, Collapse } from 'rizzui';
import cn from '@/utils/class-names';
import { PiCaretDownBold, PiCommand } from 'react-icons/pi';
import { useTheme } from 'next-themes';
import { menuItems } from './menu-items';

export function SidebarMenu() {
    const pathname = usePathname();
    return (
        <div className="mt-4 pb-3 3xl:mt-6">
            {menuItems.map((item, index) => {
                const isActive = pathname === (item?.href as string);
                // @ts-ignore
                const pathnameExistInDropdowns: any = item?.dropdownItems?.filter(
                    (dropdownItem: any) => dropdownItem.href === pathname
                );
                const isDropdownOpen = Boolean(pathnameExistInDropdowns?.length);

                return (
                    <Fragment key={item.name + "-" + index}>
                        {item?.href ? (
                            <Link
                                href={item?.href}
                                className={cn(
                                    'group relative mx-3 my-0.5 flex items-center justify-between rounded-md px-3 py-2 font-medium capitalize lg:my-1 2xl:mx-5 2xl:my-2',
                                    isActive
                                        ? 'bg-primary text-gray-0'
                                        : 'text-gray-700 transition-colors duration-200 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-700/90'
                                )}
                            >
                                <div className="flex items-center truncate">
                                    {item?.icon && (
                                        <span
                                            className={cn(
                                                'me-2 inline-flex h-5 w-5 items-center justify-center rounded-md duration-200 [&>svg]:h-[20px] [&>svg]:w-[20px]',
                                                isActive
                                                    ? 'text-gray-0'
                                                    : 'text-gray-800 dark:text-gray-500 dark:group-hover:text-gray-700'
                                            )}
                                        >
                                            {item?.icon}
                                        </span>
                                    )}
                                    <span className="truncate">{item.name}</span>
                                </div>
                            </Link>
                        ) : (
                            <Title
                                as="h6"
                                className={cn(
                                    "mb-2 truncate px-6 text-xs font-normal uppercase tracking-widest text-gray-500 2xl:px-8",
                                    index !== 0 && "mt-6 3xl:mt-7"
                                )}
                            >
                                {item.name}
                            </Title>
                        )}
                    </Fragment>
                );
            })}
        </div>
    );
}
