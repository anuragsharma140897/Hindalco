
export const LoginValidation = (json) => {

    const MyPromiss = new Promise((resolve, reject) => {

        var errorJson = {}
        if (json?.username === "" || json.username == undefined) {
            Object.assign(errorJson, { username: " Username cannot be empty *" })
        }
        if (json?.password === "" || json.password == undefined) {
            Object.assign(errorJson, { password: "Password  cannot be empty *" })
        }
        
        resolve(errorJson)

    })

    return MyPromiss;
}