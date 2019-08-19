import {START_ERROR, UPDATE_SUBMIT, UPDATE_FIELD} from '../actions/types'

const InitialState = {
    submitEnable: true,
    solajitGuid: '0f8ce54d6d964ed493973ee200144678',
    vpp_operation_type: 'charge',
    power: 1.2,
    time: 30
}

export default function (state = InitialState, action) {

    switch(action.type) {

        case UPDATE_SUBMIT: 
            state = {...state}
            state[action.payload.key] = action.payload.value;
            console.log(state)
            return state;

        case UPDATE_FIELD: 
            state = {...state}
            state[action.payload.key] = action.payload.value;
            return state;

        case START_ERROR: 
            return {
                ...state,
                isSTARTError: action.isSTARTError
            };

        default:
            return state;
    }
}
