export const CompileSelectData = (data, serverKey, serverValue, getFieldLabel, getFieldValue) => {
    return new Promise((resolve, reject) => {
        if (serverKey && serverValue) {
            var td = []
            data?.map((ele, index) => {
                if (ele?.[serverKey] === serverValue) {
                    var label = ele?.[getFieldLabel]
                    var value = ele?.[getFieldValue]
                    td.push({ label: label, value: value, id: ele?.id })
                }
            })
            resolve(td)
        } else {
            var td = []
            data?.map((ele, index) => {
                var label = ele?.[getFieldLabel]
                var value = ele?.[getFieldValue]
                td.push({ label: label, value: value, id: ele?.id })
            })
            resolve(td)
        }

    });
};
