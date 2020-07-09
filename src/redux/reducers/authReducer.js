import { userConstants } from '../../config/constants';

let user = JSON.parse(localStorage.getItem('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'));
const initialState = user ? { loggedIn: true, user } : {};

export default function authentication(state = initialState, action) {
    switch (action.type) {
    case userConstants.LOGIN_REQUEST:
        const token = action.payload.data.jwt;
        if (token) {
          const jwt = token;
          localStorage.setItem("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", jwt);
        }
        return {
        loggingIn: true,
        user: action.user
        };
    case userConstants.LOGIN_SUCCESS:
        return {
        loggedIn: true,
        user: action.user
        };
    case userConstants.LOGIN_FAILURE:
        return {};
    case userConstants.LOGOUT:
        return {};
    default:
        return state
    }
}