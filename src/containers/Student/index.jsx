import React, { useEffect, useState } from 'react';
import { Container, Row, } from 'reactstrap';
import { withTranslation } from 'react-i18next';
import StudentList from './components/StudentList';
import InsertStudent from './components/InsertStudent.jsx';
import axios from "axios";
import 'antd/dist/antd.css';
import { ArrowUpOutlined } from '@ant-design/icons';
import { BackTop } from 'antd';
import { useRecoilState } from 'recoil';
import { studentGlobalState } from '../../localState/studentState';

const style = {
  height: 40,
  width: 40,
  lineHeight: '40px',
  borderRadius: 4,
  backgroundColor: '#1088e9',
  color: '#fff',
  textAlign: 'center',
  fontSize: 14,
  right: "0px"
};

const Student = (props) => {
  //student global state
  const [studentState, setStudentState] = useRecoilState(studentGlobalState);

  const [studentList, setStudentList] = useState([]);

  const [departmentList, setDepartmentList] = useState([]);

  const [totalElements, setTotalElements] = useState(0);

  const [current, setCurrent] = useState(1);

  const [pageSize, setPageSize] = useState(10);

  const [keySearch1, setKeySearch1] = useState('');

  const [keySearch2, setKeySearch2] = useState('');

  const [keySearch3, setKeySearch3] = useState('');

  const [keySearch4, setKeySearch4] = useState('');

  const [keySearch5, setKeySearch5] = useState(0);

  //handle insert page
  const [toInsertPage, setToInsertPage] = useState(false);

  const [prepareDepartmentList, setPrepareDepartmentList] = useState([]);

  const [departmentId, setDepartmentId] = useState('');

  const [courseNumber, setCourseNumber] = useState('');

  const [classId, setClassId] = useState('');

  useEffect(() => {
    let data = new FormData();
    data.append('page', current - 1);
    data.append('pageSize', pageSize);
    data.append('keySearch1', keySearch1);
    data.append('keySearch2', keySearch2);
    data.append('keySearch3', keySearch3);
    data.append('keySearch4', keySearch4);
    data.append('keySearch5', keySearch5);

    axios.post("/student/getAll", data).then(
      response => {
        setStudentList(response.data.content);
        setTotalElements(response.data.totalElements);
        setCurrent(response.data.number + 1);
      }
    ).catch(
      err => console.log(err)
    );
    axios.get("/department/getAll").then(response => setDepartmentList(response.data)).catch(err => console.log(err));

  }, [pageSize, current]);

  useEffect(() => {
    let data = new FormData();
    data.append('page', 0);
    data.append('pageSize', 10);
    data.append('keySearch1', keySearch1);
    data.append('keySearch2', keySearch2);
    data.append('keySearch3', keySearch3);
    data.append('keySearch4', keySearch4);
    data.append('keySearch5', keySearch5);

    axios.post("/student/getAll", data).then(
      response => {
        setStudentList(response.data.content);
        setTotalElements(response.data.totalElements);
        setCurrent(response.data.number + 1);
      }
    ).catch(
      err => console.log(err)
    );
    axios.get("/department/getAll").then(response => setDepartmentList(response.data)).catch(err => console.log(err));

  }, [keySearch1, keySearch2, keySearch3, keySearch4, keySearch5]);

  useEffect(() => {

    axios.get("/country/findAll")
      .then(response => {
        let update = {
          countryList: response.data
        }
        setStudentState(Object.assign(studentState, update));
      })
      .catch(err => console.log(err));

    axios.get("/nationality/findAll")
      .then(response => {
        let update = {
          nationalityList: response.data
        }
        setStudentState(Object.assign(studentState, update));
      })
      .catch(err => console.log(err));

  }, []);



  return (
    <Container className="dashboard">
      <Row>
        {toInsertPage === false ?

          <StudentList
            studentList={studentList}
            departmentList={departmentList}
            totalElements={totalElements}
            current={current}
            setCurrent={setCurrent}
            setPageSize={setPageSize}
            setKeySearch1={setKeySearch1}
            setKeySearch2={setKeySearch2}
            setKeySearch3={setKeySearch3}
            setKeySearch4={setKeySearch4}
            setKeySearch5={setKeySearch5}
            setToInsertPage={setToInsertPage}
            setPrepareDepartmentList={setPrepareDepartmentList}
          />
          :
          <InsertStudent
            setToInsertPage={setToInsertPage}
            departmentList={departmentList}
            prepareDepartmentList={prepareDepartmentList}
          />
        }

        <BackTop>
          <div style={style}><ArrowUpOutlined /></div>
        </BackTop>
      </Row>

    </Container>
  );

}

export default (withTranslation('common')(Student));
