import React from 'react'
import { useSelector } from 'react-redux'
import { Button, Title } from 'rizzui'
import { getFormattedDate } from '../../Utils/Utils';
import { FaClock, FaThermometerHalf } from 'react-icons/fa';
import { FaClockRotateLeft } from "react-icons/fa6";
import { FiArrowUpRight } from 'react-icons/fi';
import TrendingUpIcon from '../../Constant/Icons/trending-up';
import cn from '../../Utils/class-names';
import { Colors } from '../../Constant/Colors/Color';
import { HitApi } from '../../Store/Action/Api/ApiAction';
import { rebootReader } from '../../Constant/Api/Api';
import ButtonPopover from '../../shared/button-popover';
import { PiClockCounterClockwiseBold } from 'react-icons/pi';

export default function DeviceStatus({ loading }) {
    const { readerLoginData } = useSelector(state => state.ReaderConfigurationReducer);
    const reduxReaderConfiguration = useSelector(state => state.ReaderConfigurationReducer)
    const reduxDeviceReader = useSelector(state => state.DeviceReaderReducer)
    
    const { statusText, statusColor } = loading
        ? { statusText: 'Connecting to device...', statusColor: 'text-yellow-500' }
        : readerLoginData?.message
            ? { statusText: 'Connected', statusColor: 'text-green-buttonGreen' }
            : { statusText: 'Disconnected', statusColor: 'text-red-buttonRed' };

    const StatusItem = ({ icon: Icon, title, value, condition }) => {
        return (
            <div className='flex items-center my-1'>
                <h6 className='text-black flex items-center'>
                    <Icon className='h-4 w-4' />
                    &nbsp;{title} :
                </h6>
                <span className={cn('ml-1 font-bold', condition ? 'text-green-buttonGreen' : 'text-red-buttonRed')}>
                    {value}
                </span>
            </div>
        );
    };

    const hitRebootApi = () =>{
        var json = {
            token : readerLoginData?.message,
            ip : reduxDeviceReader?.doc?.readerIp
        }
        console.log('json',json);
        HitApi(json,rebootReader).then(res=>{
            console.log('res',res);
        })
    }

    console.log('reduxDeviceReader',reduxDeviceReader);

    return (
        <div className='flex justify-between'>

            <div>
                <div>
                    <div className='flex items-center'>
                        <Title as='h6'>Device Status&nbsp;</Title>
                        <Title as='h6' className={statusColor}> : {statusText}</Title>
                    </div>
                </div>
                <div className='flex flex-col'>
                    <StatusItem
                        icon={FaClockRotateLeft}
                        title="System Time"
                        value={reduxReaderConfiguration?.summary?.systemTime}
                        condition={reduxReaderConfiguration?.summary?.systemTime}
                    />
                    <StatusItem
                        icon={FaThermometerHalf}
                        title="Temperature"
                        value={reduxReaderConfiguration?.summary?.temperature}
                        condition={reduxReaderConfiguration?.summary?.temperature < 80}
                    />
                    <StatusItem
                        icon={TrendingUpIcon}
                        title="Uptime"
                        value={reduxReaderConfiguration?.summary?.uptime}
                        condition={reduxReaderConfiguration?.summary?.uptime}
                    />
                </div>
            </div>

            <div>
                <div className='flex justify-between'>
                    <div>
                        <div className='flex items-center'>
                            <FaClock />&nbsp;
                            <Title as='h6'>Last Fetched&nbsp;</Title>
                            <Title as='h6' className={'text-red-main'}> : {readerLoginData?.lastActive ? getFormattedDate(readerLoginData?.lastActive, ['date', 'month', 'year', 'hour', 'minute', 'second']) : null}</Title>
                        </div>
                    </div>
                </div>
                <div className='flex justify-end'>
                    <ButtonPopover style={{background:Colors.LOGINRED,color:Colors.WHITE}} onClick={()=>hitRebootApi()} icon={<PiClockCounterClockwiseBold className="me-1 h-[17px] w-[17px]" />} btnTitle={'Reboot Reader'} title={'Alert'} description={'Are you sure to reboot reader ?'}/>
                </div>
            </div>

        </div>

    );
}
