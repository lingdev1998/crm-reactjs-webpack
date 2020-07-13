import { atom } from 'recoil';

const STUDENT_LIST = 'studentList';


const studentListState = atom({
  key: STUDENT_LIST,
  default: [{}]
});

export { studentListState };