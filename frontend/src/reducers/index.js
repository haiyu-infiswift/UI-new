import { combineReducers } from 'redux';
import Composer from './composer'
import Auth from './auth'

export default combineReducers ({
    composer: Composer,
    auth: Auth
});