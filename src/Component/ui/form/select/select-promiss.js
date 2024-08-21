export const CompileSelectData = (data, getFieldName, serverKey, serverValue) => {
    return new Promise((resolve, reject) => {
        if (serverKey && serverValue) {
            var td = []
            data?.map((ele, index) => {
                if (ele?.[serverKey] === serverValue) {
                    var label = ele?.[getFieldName]
                    var value = ele?.[getFieldName]
                    td.push({ label: label, value: value, id: ele?.id })
                }
            })
            resolve(td)
        } else {
            var td = []
            data?.map((ele, index) => {
                var label = ele?.[getFieldName]
                var value = ele?.[getFieldName]
                td.push({ label: label, value: value, id: ele?.id })
            })
            resolve(td)
        }

    });
};
