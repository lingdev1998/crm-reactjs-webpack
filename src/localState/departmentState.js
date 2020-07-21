import { atom } from 'recoil';

const DEPARTMENT_STATE = 'DEPARTMENT_STATE';
 
const departmentGlobalState = atom({
  key: DEPARTMENT_STATE,
  default: {
    departmentList:[],
    classList : [],
    details:undefined
  },
  dangerouslyAllowMutability:true
});

 

export { departmentGlobalState };