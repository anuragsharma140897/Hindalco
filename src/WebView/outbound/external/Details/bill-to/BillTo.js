import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { HitApi } from '../../../../../Store/Action/Api/ApiAction';
import { searchCustomer } from '../../../../../Constant/Api/Api';

const BillTo = () => {
    const reduxOutbound = useSelector(state => state.OutboundReducer);
    const [data, setData] = useState(null);

    useEffect(() => {
        if (!data && reduxOutbound?.apiJson?.billTo) {
            const json = {
                page: 1,
                limit: 1,
                search: { id: reduxOutbound.apiJson.billTo }
            };
            HitApi(json, searchCustomer).then(result => {
                setData(result?.content[0]);
            });
        }
    }, [data, reduxOutbound]);

    if (!data) return null;

    const fields = [
        { label: 'Customer Name', value: 'customerName' },
        { label: 'Customer Code', value: 'customerCode' },
        { label: 'Customer Group', value: 'customerGroup' },
        { label: 'Customer Email', value: 'customerEmail' },
        { label: 'Customer Type', value: 'customerType' },
        { label: 'Customer Address1', value: 'customerAddress1' },
        { label: 'Customer Address2', value: 'customerAddress2' },
        { label: 'Customer Country', value: 'customerCountry' },
        { label: 'Customer State', value: 'customerState' },
        { label: 'Customer City', value: 'customerCity' },
        { label: 'Customer Landmark', value: 'customerLandmark' },
        { label: 'Customer PostCode', value: 'customerPostCode' },
        { label: 'Customer Contact', value: 'customerContact' },
        { label: 'Customer GST', value: 'customerGst' },
        { label: 'Customer PAN', value: 'customerPan' },
        { label: 'Customer TAN', value: 'customerTan' },
        { label: 'Customer Status', value: 'customerStatus' },
        { label: 'Status', value: 'status' }
    ];

    return (
        <div>
            <div className='text-base text-black font-semibold'>Bill To Details</div>
            <div className='bg-white grid grid-cols-3 mt-3'>
                {fields.map(({ label, value }) => (
                    <div key={value} className='border w-full p-2'>
                        <div className='font-semibold'>{label}</div>
                        <div className='text-xs'>{data[value]}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BillTo;