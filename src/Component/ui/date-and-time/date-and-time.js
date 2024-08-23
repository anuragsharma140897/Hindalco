import { useState } from 'react';
import DateTimePicker from 'react-datetime-picker';

function DateAndTime({ label ,important,onChange,value}) {
    return (
        <div>
            <div className="block font-bold mb-2">{label}{important === false ? '(Optional)' : ''}</div>
            <DateTimePicker onChange={onChange} value={value} clearIcon={null}  className="custom-datetime-picker w-full" />
        </div>
    );
}
export default DateAndTime;
