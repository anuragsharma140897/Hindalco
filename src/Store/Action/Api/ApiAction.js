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

        console.log(requestOptions);

        fetch(api, requestOptions)
            .then(res => res.json())
            .then(
                (result) => {
                    console.log('result', result);
                    if (result) {
                        resolve(result);
                    }
                },
                (error) => {
                    console.log("error ---- ", error);
                    resolve(error);
                }
            )
    });

    return MyPromise;
}
