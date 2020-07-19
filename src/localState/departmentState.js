import { atom } from 'recoil';

const DEPARTMENT_STATE = 'DEPARTMENT_STATE';
 
const departmentGlobalState = atom({
  key: DEPARTMENT_STATE,
  default: {
    departmentList:[]

  },
  dangerouslyAllowMutability:true
});

 

export { departmentGlobalState };