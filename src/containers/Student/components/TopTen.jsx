/* eslint-disable react/no-array-index-key,react/no-typos */
import React, { useEffect, useState } from 'react';
import {
  DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown, Table,
} from 'reactstrap';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import DotsHorizontalIcon from 'mdi-react/DotsHorizontalIcon';
import Panel from '../../../shared/components/Panel';
import { useRecoilValue, useRecoilValueLoadable, selector } from 'recoil';
import { studentListState } from '../studentState';
import axios from 'axios';
var token = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ2YW5kb2FuNTQ3IiwiZXhwIjoxNTk2MjA4MjM0LCJpYXQiOjE1OTQ0MDgyMzR9.OPKN9SWmGfl_7IApC2yJBJLPObH4GBn1GZv_NEVir8O-Bqqk5Qb81hUdWT5zbN0fkJsYwv1K93m-Q-k9ks9F7g";

//axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
//axios.defaults.baseURL = "http://localhost:8080/";
// const fetchListStudent = selector({
//   key: 'listStudent1234',
//   get: async ({ get }) => {
//          var formData = new FormData();
//         formData.append("page",1);
//         formData.append("pageSize", 10);
//          const rs = await axios.post("/getListStudent",formData,{
//           headers: {
//             'Authorization': `Bearer ${"eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ2YW5kb2FuNTQ3IiwiZXhwIjoxNTk1OTE4MjEzLCJpYXQiOjE1OTQxMTgyMTN9.HciNSiimeF8I54vmRZYTP6IL5VsZ9bYgbcIi0J7QsYfyY0ludIRTsMGKbl6A3crcgPsI-qlYF-fVUGw8ms8hhw"}` 
//           }
//         }).then(res => res.data).catch(err => err)
//   }
// });

const CustomTooltip = ({ active, payload }) => {
  if (active) {
    return (
      <div className="dashboard__total-tooltip">
        <p className="label">{`$${payload[0].value}`}</p>
      </div>
    );
  }

  return null;
};



const DropDownMore = ({ index, handleDeleteRow }) => (
  <UncontrolledDropdown className="dashboard__table-more">
    <DropdownToggle>
      <p><DotsHorizontalIcon /></p>
    </DropdownToggle>
    <DropdownMenu className="dropdown__menu">
      <Link to={`/dashboard_crypto/edit/${index}`}><DropdownItem>Edit</DropdownItem></Link>
      <DropdownItem onClick={handleDeleteRow}>Delete</DropdownItem>
    </DropdownMenu>
  </UncontrolledDropdown>
);

DropDownMore.propTypes = {
  index: PropTypes.number.isRequired,
  handleDeleteRow: PropTypes.func.isRequired,
};

const TopTen = ({ cryptoTable, onDeleteCryptoTableData, t }) => {
  //const studentList = useRecoilValue(studentListState);
  //const studentList = useRecoilValueLoadable(fetchListStudent);
  //   if (studentList.state === 'hasError') {
  //     return <div> There is some problem! </div>
  // }

  const [studentList, setStudentList] = useState([]);
  useEffect(() => {
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
    data.append('page', '1');
    data.append('pageSize', '5');

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
      axios.post("/student/getListStudent",data).then(response => setStudentList(response.data.content));
  }, []);
  return (
    <Panel lg={12} title={t('Danh sách sinh viên')}>

      <Table responsive className="table--bordered dashboard__table-crypto">
        <thead>
          <tr>
            <th>Mã sinh viên</th>
            <th>Họ và tên</th>
            <th>Giới tính</th>
            <th>Ngày sinh</th>
            <th>Dân tộc</th>
            <th>Lớp</th>
            <th>Khoa</th>
            <th>Số điện thoại</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {studentList.map((item, index) => (
            item !== undefined ?
              <tr key={index}>
                <td>{item.studentId}</td>
                <td>{item.firstName + " " +  item.lastName}</td>
                <td dir="ltr">{"Nam"}</td>
                <td dir="ltr">{"24/11/1998"}</td>
                <td dir="ltr">{"Kinh"}</td>
                <td dir="ltr">{"517101"}</td>
                <td>{"Công nghệ thông tin"}</td>
                <td className="dashboard__table-crypto-chart">
                  {"0964708429"}
                </td>
                <td>
                  <DropDownMore index={index} handleDeleteRow={e => onDeleteCryptoTableData(index, e)} />
                </td>
              </tr> : ""
          ))}
        </tbody>
      </Table>
    </Panel>
  );

}
export default withTranslation('common')(TopTen);
