export const CompileInventoryMaster = (data) => {
    return new Promise((resolve, reject) => {
        var td = {
            content: data?.content?.map((ele, index) => Object.assign(ele, { index: index + 1 })),
            totalElements: data?.totalElements, number: data?.number + 1, totalPages: data?.totalPages,
        }
        resolve(td)
    })
}