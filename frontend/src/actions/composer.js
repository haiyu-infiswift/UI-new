import { UPDATE_SUBMIT, UPDATE_FIELD} from './types'

export const startAction = (thedata, socket)=> {
    console.log("socket emit");
    console.log(thedata)
    socket.emit('submitForm', thedata);
    return (dispatch) => {
        dispatch({
            type: UPDATE_SUBMIT,
            payload: {key: 'submitEnable', value: false}
        });
        socket.on('done', (response) => {
        dispatch({
        type: UPDATE_SUBMIT,
        payload: {key: 'submitEnable', value: true}
        });
    });
    };
};


export const formUpdate = (key, value) => {
    console.log("key: " + key)
    console.log("value:" + value)
    return {
        type: UPDATE_FIELD,
        payload: {key, value}
    };
};


export const initComposer = (socket) => {
    console.log('initComposer');
    return (dispatch) => {
        socket.on('getResponse',(response)=>{
            dispatch({
                type: UPDATE_SUBMIT,
                payload: response === 'success' ? true : false
            });
        });
    };
};