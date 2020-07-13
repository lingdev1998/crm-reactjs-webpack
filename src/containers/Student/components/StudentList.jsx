import React, { useEffect, useState } from 'react';
import {
  Row, Col
} from 'reactstrap';
import { withTranslation } from 'react-i18next';
import Panel from '../../../shared/components/Panel';
// import { useRecoilValue, useRecoilValueLoadable, selector } from 'recoil';
// import { studentListState } from '../../../localState/studentState';
import { Table, Button, Popconfirm } from 'antd';
import { Input, Cascader } from 'antd';
import { DeleteOutlined, EditOutlined, SearchOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';

const columns = [
  {
    title: 'Mã sinh viên',
    width: 80,
    dataIndex: 'studentId',
    key: 'studentId',
    render: text => <a href="">{text}</a>,
    fixed: 'left',
  },
  {
    title: 'Họ và tên',
    width: 150,
    dataIndex: 'fullName',
    key: 'fullName',
    fixed: 'left',
  },

  { title: 'Ngày sinh', dataIndex: 'dateBirth', width: 110, key: 'dateBirth' },
  {
    title: 'Giới tính',
    dataIndex: 'sex',
    width: 110,
    key: 'sex',
    render: text => <>{text !== null ? (text === '1' ? "Nữ" : "Nam") : ""}</>,
  },
  { title: 'Quê quán', dataIndex: 'homeAddress', width: 110, key: 'homeAddress' },
  { title: 'Số điện thoại', dataIndex: 'phoneNumber', width: 110, key: 'phoneNumber' },
  {
    title: '',
    key: 'operation',
    fixed: 'right',
    width: 100,
    render: () =>
      <>
        <Button type="primary" icon={<EditOutlined />}  >
          Sửa
        </Button>
        <Popconfirm title="Chắc chắn xoá？" okText="OK" cancelText="Huỷ">

          <Button type="dashed" icon={<DeleteOutlined />} danger>
            Xoá
          </Button>
        </Popconfirm>

      </>
  },
];


const StudentList = ({ t, studentList, departmentList, totalElements, current, setCurrent, setPageSize, setKeySearch1, setKeySearch2, setKeySearch3, setKeySearch4, setKeySearch5, setToInsertPage,setPrepareDepartmentList }) => {
  //const studentList = useRecoilValue(studentListState);
  //const studentList = useRecoilValueLoadable(fetchListStudent);
  //   if (studentList.state === 'hasError') {
  //     return <div> There is some problem! </div>
  // }

  const [departmentOptions, setDepartmentOptions] = useState([]);

  useEffect(() => {
    if (departmentList.length > 0) {
      console.log("preparing departmentList....", departmentList);
      var d = new Date();
      var n = d.getFullYear();
      var options = [];
      for (const i in departmentList) {
        if (departmentList[i].departmentType === 1) {
          var courseList = [];
          for (var j = 1; j <= n - departmentList[i].startYear; j++) {
            courseList.push(
              {
                value: j,
                label: "Khoá " + j,
                children: []
              }
            )
          }
          for (const a in departmentList[i].children) {
            let tempChild = {
              value: departmentList[i].children[a].classId,
              label: "Lớp: " + departmentList[i].children[a].classId + " " + departmentList[i].children[a].className
            }
            courseList[departmentList[i].children[a].courseNumber - 1].children.push(tempChild);
          }
          let x = {
            value: departmentList[i].departmentId,
            label: "Khoa " + departmentList[i].departmentName,
            children: courseList
          };
          options.push(x)
        }
      }
      console.log("Prepare done!", options);
      setDepartmentOptions(options);
      setPrepareDepartmentList(options)

    }
  }, [JSON.stringify(departmentList)])


  function onCascaderChange(value) {
    value[0] === undefined ? setKeySearch3('') : setKeySearch3(value[0]);
    value[1] === undefined ? setKeySearch5('') : setKeySearch5(value[1]);
    value[2] === undefined ? setKeySearch4('') : setKeySearch4(value[2]);

  }

  return (
    <>

      <Panel lg={12} title={t('Danh sách sinh viên')}>
        <Row style={{ paddingLeft: "0px", paddingRight: "35px" }}>

          <Col md={11} sm={8}>
            <div className="site-input-group-wrapper">
              <Input.Group compact>
                <Cascader style={{ width: '50%' }} options={departmentOptions} onChange={e => onCascaderChange(e)} placeholder="Tuỳ chọn tìm kiếm..." />
                <Input style={{ width: '20%' }} defaultValue="" onChange={e => setKeySearch1(e.target.value)} placeholder="Mã sinh viên..." />
                <Input style={{ width: '30%' }} addonAfter={<SearchOutlined />} defaultValue="" placeholder="Tên sinh viên..." onChange={e => setKeySearch2(e.target.value)} />

              </Input.Group>
            </div>
          </Col>
          <Col md={1} sm={5}>
            <Button
              onClick={() => { setToInsertPage(true) }}
              type="primary"
              style={{
                marginBottom: 16,
              }}

            >
              Thêm mới
          </Button>
          </Col>
        </Row>
        <Table columns={columns}
          dataSource={studentList}
          scroll={{ x: 1300 }}
          bordered
          pagination={{
            showTotal: total => `Tổng cộng ${total} bản ghi`,
            defaultPageSize: 10,
            showSizeChanger: true,
            pageSizeOptions: ['10', '20', '30', '50', '100'],
            total: totalElements,
            current: current,
            onChange: (page, pageSize) => {
              console.log(page)
              setCurrent(page);
              setPageSize(pageSize);
            }
          }}
        />
      </Panel>
    </>
  );

}
export default withTranslation('common')(StudentList);
