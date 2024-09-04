export const CompileSelectData = (data, getFieldName, type) => {


    return new Promise((resolve, reject) => {


        var td = []

        // if(type==='filter') { td.push({ label: 'all', value: 'all', id: 'all' })}
        if (type === 'custom') {
            data?.map((ele, index) => {
                var label = ele?.label
                var value = ele?.value
                var usedBy = ele?.usedBy
                var ele = ele
                td.push({ label: label, value: value, _id: ele?._id, usedBy : usedBy, ele : ele })
            })
        } else {
            data?.map((ele, index) => {
                var label = ele?.[getFieldName]
                var value = ele?.[getFieldName]
                var _id  = ele?._id
                var ele = ele
                td.push({ label: label, value: value, _id: _id, index : index, ele : ele})
            })
        }
        resolve(td)
    });
};
