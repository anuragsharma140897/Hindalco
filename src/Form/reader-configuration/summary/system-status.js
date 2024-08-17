import React from 'react'
import { Title } from 'rizzui'
import { MdWifiTethering, MdWifiTetheringOff } from "react-icons/md";
import { FiWifi, FiWifiOff } from "react-icons/fi";
import { FaMicrochip } from 'react-icons/fa';



export default function SystemStatus({ title, data, activeIcon, InactiveIcon }) {

    console.log('data', data);


    return (
        <div>
            <h3 className="text-lg font-bold mb-4">{title}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                {Object.entries(data || []).map(([key, status]) => (
                    <div key={key} className="flex items-center p-4 rounded-lg bg-white">
                        <div className="text-2xl mr-3">
                            {status === 'connected' ? activeIcon : InactiveIcon}
                        </div>
                        <div>
                            <p className="font-semibold capitalize">{key}</p>
                            <p className="text-sm text-gray-600 capitalize">{status}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
