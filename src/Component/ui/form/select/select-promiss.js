export const CompileSelectData = (data, serverKey, serverValue, getFieldName) => {
    return new Promise((resolve, reject) => {
        if (serverKey && serverValue) {
            var td = []
            data?.map((ele, index) => {
                if (ele?.[serverKey] === serverValue) {
                    var value = ele?.[getFieldName]
                    td.push({ label: value, value: value, id: ele?.id })
                }
            })
            resolve(td)
        } else {
            var td = []
            data?.map((ele, index) => {
                var value = ele?.[getFieldName]
                td.push({ label: value, value: value, id: ele?.id })
            })
            resolve(td)
        }

    });
};
