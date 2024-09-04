
import { getAuthToken } from "../../../Storage/Storage";

export const SET_API_JSON = 'SET_API_JSON'

export const setApiJson = (data) => ({
    type: SET_API_JSON,
    value: data
});

export const HitApi = (json, api) => {

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

                        resolve({
                            success: false,
                            status: res.status,
                            statusText: res.statusText,
                            error: err,
                        });
                    });
                }
                return res.json();
            })
            .then(result => {
                if (result) {
                    resolve(result)
                }
            })
            .catch(err => {

                resolve({
                    success: false,
                    message: 'An error occurred during the API call.',
                    error: err,
                });
            });
    });

    return MyPromise;
}



export const HitApiXML = (json, api) => {
    const MyPromise = new Promise((resolve, reject) => {
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: getAuthToken() ? `Bearer ${getAuthToken()}` : 'token',
            },
            body: JSON.stringify(json)
        };
        fetch(api, requestOptions)
            .then(res => res.text())
            .then(
                (result) => {
                    if (result) {
                        resolve(result)
                    }
                },
                (error) => {

                    resolve(error);
                }
            )
    });

    return MyPromise;
}
