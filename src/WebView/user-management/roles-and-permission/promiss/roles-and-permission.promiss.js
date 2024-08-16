export const CompileRolesAndPermission = (data) => {
    return new Promise((resolve, reject) => {
        var td = {
            docs: data?.content?.map((ele, index) => Object.assign(ele, { index: index + 1 })),
            totalDocs: data?.totalElements, page: data?.number + 1, totalPages: data?.totalPages
        }
        resolve(td)
    })
}