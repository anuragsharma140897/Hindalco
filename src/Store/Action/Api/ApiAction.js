
import { getAuthToken } from "../../../Storage/Storage";

export const SET_API_JSON = 'SET_API_JSON'

export const setApiJson = (data) => ({
    type: SET_API_JSON,
    value: data
});

export const HitApi = (json, api) => {
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
            .then(res => res.json())
            .then(
                (result) => {

                    if (result) {
                        resolve(result);
                    }
                },
                (error) => {

                    resolve(error);
                }
            )
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
                    console.log('error xml', error);
                    resolve(error);
                }
            )
    });

    return MyPromise;
}
