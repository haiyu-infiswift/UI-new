import { LOGIN_USER_INFO, LOGIN_USER_SUCCESS } from '../actions/types'

const InitialState = {
    email: '',
    password: '',
    token: ''
}

export default (state = InitialState, action) => {
    console.log(action);
    switch (action.type) {
        case  LOGIN_USER_INFO:
            state = {...state}
            state[action.payload.key] = action.payload.value;
            console.log(state)
            return state;
        case  LOGIN_USER_SUCCESS:
            state = {...state}
            state['token'] = action.payload.token;
            return state;
        default:
            console.log('in auth reducer default');
            return state;
    }
}