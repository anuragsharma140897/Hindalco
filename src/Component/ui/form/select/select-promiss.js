export const CompileSelectData = (data, getFieldName, type) => {


    return new Promise((resolve, reject) => {


        var td = []

        // if(type==='filter') { td.push({ label: 'all', value: 'all', id: 'all' })}
        if (type === 'custom') {

            data?.map((ele, index) => {
                var label = ele?.label
                var value = ele?.value
                var usedBy = ele?.usedBy
                td.push({ label: label, value: value, _id: ele?._id, usedBy })
            })
        } else {

            data?.map((ele, index) => {
                var label = ele?.[getFieldName]
                var value = ele?.[getFieldName]
                td.push({ label: label, value: value, _id: ele?._id })
            })
        }
        resolve(td)
    });
};
