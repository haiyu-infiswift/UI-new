import { LOGIN_USER_INFO, LOGIN_USER_SUCCESS } from "./types";


export const formUpdate = (key, value) => {
    console.log("key: " + key)
    console.log("value:" + value)
    return {
        type: LOGIN_USER_INFO,
        payload: {key, value}
    };
};

export const callLogin = (username, password) => {
    return async (dispatch) => {
        try {
            const response = await fetch('/api/login', {
           // const response = await fetch('http://localhost:3001/api/login', {
                method: 'POST',
                body: JSON.stringify({
                    username,
                    password
                }),
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            const data = await response.json()
            const token = data.token
            localStorage.setItem('token', data.token)
            dispatch({
                type: LOGIN_USER_SUCCESS,
                payload: {token}
                });
        } catch(e) {
            console.log(e)
        }
    }
};
