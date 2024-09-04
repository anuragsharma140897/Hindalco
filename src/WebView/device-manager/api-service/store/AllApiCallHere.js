import { getAuthToken } from "../../../../Storage/Storage";

export const AllApiCallHere = (json, api,xml) => {

    const MyPromise = new Promise((resolve, reject) => {
        if(!json?.search){
            Object.assign(json, { status: json?.status || 'active' })
        }
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: getAuthToken() ? `Bearer ${getAuthToken()}` : 'token',
            },
            body: JSON.stringify(json)
        };

        fetch(api, requestOptions)
            .then(res => {
                if (!res.ok) {
                    return res.json().then(err => {
                        console.log('err ---- ', err);
                        resolve({
                            success: false,
                            status: res.status,
                            statusText: res.statusText,
                            error: err,
                        });
                    });
                }
                if(xml){
                    return res.text()
                }else{
                    return res.json();
                }

                
            })
            .then(result => {
                if (result) {
                    resolve(result)
                }
            })
            .catch(err => {
                console.log('Error caught: ', err);
                resolve({
                    success: false,
                    message: 'An error occurred during the API call.',
                    error: err,
                });
            });
    });

    return MyPromise;
}