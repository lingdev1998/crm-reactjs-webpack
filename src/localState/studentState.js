import { atom } from 'recoil';

const STUDENT_LIST_STATE = 'STUDENT_LIST_STATE';
 
const studentGlobalState = atom({
  key: STUDENT_LIST_STATE,
  default: {
    countryList:[],
    cityList:[],
    districtList:[],
    communeList:[],
    nationalityList:[],
    ethnicList:[],

  },
  dangerouslyAllowMutability:true
});

 

export { studentGlobalState };