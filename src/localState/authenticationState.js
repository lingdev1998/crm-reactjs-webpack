import { atom } from 'recoil'; 
const AUTHENTICATION_STATE = "AUTHENTICATION_STATE";
const authenticationState = atom({
    key: AUTHENTICATION_STATE,
    default:{
      authenticated : false
    }
  });
export {authenticationState};