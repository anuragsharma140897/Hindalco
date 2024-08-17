import React from 'react'
import { useSelector } from 'react-redux'
import { Title } from 'rizzui'
import { getFormattedDate } from '../../Utils/Utils';
import { FaClock, FaThermometerHalf } from 'react-icons/fa';
import { FaClockRotateLeft } from "react-icons/fa6";
import { FiArrowUpRight } from 'react-icons/fi';
import TrendingUpIcon from '../../Constant/Icons/trending-up';
import cn from '../../Utils/class-names';

export default function DeviceStatus({ loading }) {
    const { readerLoginData } = useSelector(state => state.ReaderConfigurationReducer);
    const reduxReaderConfiguration = useSelector(state => state.ReaderConfigurationReducer)

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

    return (
        <div>
            <div className='flex justify-between'>
                <div>
                    <div className='flex items-center'>
                        <Title as='h6'>Device Status&nbsp;</Title>
                        <Title as='h6' className={statusColor}> : {statusText}</Title>
                    </div>
                </div>
                <div>
                    <div className='flex items-center'>
                        <FaClock />&nbsp;
                        <Title as='h6'>Last Fetched&nbsp;</Title>
                        <Title as='h6' className={'text-red-main'}> : {readerLoginData?.lastActive ? getFormattedDate(readerLoginData?.lastActive, ['date', 'month', 'year', 'hour', 'minute', 'second']) : null}</Title>
                    </div>
                </div>
            </div>
            <div>
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
        </div>

    );
}
