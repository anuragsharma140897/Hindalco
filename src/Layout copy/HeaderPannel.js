import React, { useEffect, useState } from 'react';
import { FaBell } from "react-icons/fa";
import { Colors } from '../Constant/Colors/Color';
import { getHeadingFromPathname } from '../Utils/Utils';
import { useTranslation } from 'react-i18next';
import HeaderPopup from './HeaderPopup';
import { Dropdown, Button } from "rizzui";
import { FaChevronDown } from "react-icons/fa6";
import HeaderSiteDropdown from './HeaderSiteDropdown';


function HeaderPannel() {
  const [heading, setHeading] = useState("");
  const { t } = useTranslation();

  useEffect(() => {
    setHeading(getHeadingFromPathname());
  }, [window.location.pathname]);

  return (
    <div className='px-5 py-3 bg-[#f1f1f1] border border-l-0 mb-3'>
      <div className='flex justify-end md:justify-between items-center font-bold text-lg'>
        <div className='hidden md:flex'>{t(heading)}</div>
        <div>
          <div className='flex gap-x-5 items-center'>
            
            <div>
              <div className='p-2.5 bg-white rounded-full'>
                <FaBell color={Colors.LOGINRED} />
              </div>
            </div>
            <HeaderSiteDropdown/>
            <HeaderPopup />
          </div>
        </div>
      </div>
    </div>
  )
}

export default HeaderPannel;
