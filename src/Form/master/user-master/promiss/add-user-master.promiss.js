export const CompileRoleForSelect = (data) =>{
    return new Promise((resolve, reject)=>{
        var td=[]
        data?.content?.map((ele, index)=>{
            td.push({
                _id : ele?._id,
                label : ele?.roleName,
                value : ele?.roleName
            })
        })
        resolve(td)
    })
}