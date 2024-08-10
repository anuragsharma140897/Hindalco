
export const HitApi = (json, api, token) => {
    const MyPromise = new Promise((resolve, reject) => {
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: "Bearer " + token,

            },
            body: JSON.stringify(json)
        };

        fetch(api, requestOptions)
            .then(res => res.json())
            .then(
                (result) => {
                    if (result) {
                        resolve(result);
                    }
                },
                (error) => {
                    console.log("error", error);
                    resolve(error);
                }
            )
    });

    return MyPromise;
}
