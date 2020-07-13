import React, { useEffect, useState } from 'react';
import { Container, Row, } from 'reactstrap';
import { withTranslation } from 'react-i18next';
import StudentList from './components/StudentList';
import InsertStudent from './components/InsertStudent.jsx';
import axios from "axios";
import 'antd/dist/antd.css';
import {ArrowUpOutlined} from '@ant-design/icons';
import { BackTop } from 'antd';

const style = {
  height: 40,
  width: 40,
  lineHeight: '40px',
  borderRadius: 4,
  backgroundColor: '#1088e9',
  color: '#fff',
  textAlign: 'center',
  fontSize: 14,
  right:"0px"
};

const Student = (props) => {

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
    console.log(toInsertPage)
    // var myHeaders = new Headers();
    // myHeaders.append("Authorization", "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ2YW5kb2FuNTQ3IiwiZXhwIjoxNTk2MjA1MTIzLCJpYXQiOjE1OTQ0MDUxMjN9.iLQe6HOfDwRdbrq_9X1yp3NjY1WCu8fsz3HB0kiMib8Q6QK8Tcve6p7GIpss8Wd9CqE-Z13h-cSrJSshH9_xrA");
    // myHeaders.append("Cookie", "JSESSIONID=5C954C00241B0A5933DB3CA5B14A9EB0");

    // var formdata = new FormData();
    // formdata.append("page", "1");
    // formdata.append("pageSize", "5");

    // var requestOptions = {
    //   method: 'post',
    //   headers: myHeaders,
    //   body: formdata,
    //   redirect: 'follow'
    // };

    // fetch("http://localhost:8080/student/getListStudent", requestOptions)
    //   .then(res => res.json())
    //   .then(result => { console.log(result); setStudentList(result.content) })
    //   .catch(error => console.log('error', error));


    let data = new FormData();
    data.append('page', current - 1);
    data.append('pageSize', pageSize);
    data.append('keySearch1', keySearch1);
    data.append('keySearch2', keySearch2);
    data.append('keySearch3', keySearch3);
    data.append('keySearch4', keySearch4);
    data.append('keySearch5', keySearch5);

    // let config = {
    //   method: 'post',
    //   url: 'http://localhost:8080/student/getListStudent',
    //   headers: {
    //     'Authorization': 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ2YW5kb2FuNTQ3IiwiZXhwIjoxNTk2MjA1MTIzLCJpYXQiOjE1OTQ0MDUxMjN9.iLQe6HOfDwRdbrq_9X1yp3NjY1WCu8fsz3HB0kiMib8Q6QK8Tcve6p7GIpss8Wd9CqE-Z13h-cSrJSshH9_xrA',
    //     'Cookie': 'JSESSIONID=5C954C00241B0A5933DB3CA5B14A9EB0' 
    //   },
    //   data: data
    // };

    // axios(config)
    //   .then((response) => {
    //     setStudentList(response.data.content)
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
    axios.post("/student/getAll", data).then(
      response => {
        setStudentList(response.data.content);
        setTotalElements(response.data.totalElements);
        console.log(response.data.totalElements);
        setCurrent(response.data.number + 1);
      }
    ).catch(
      err => console.log(err)
    );
    axios.get("/department/getAll").then(response => setDepartmentList(response.data)).catch(err => console.log(err));

  }, [pageSize, current, keySearch1, keySearch2, keySearch3, keySearch4, keySearch5]);

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
            setDepartmentId={setDepartmentId}
            departmentId={departmentId}
            setCourseNumber={setCourseNumber}
            courseNumber={courseNumber}
            setClassId={setClassId}
            classId={classId}
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
