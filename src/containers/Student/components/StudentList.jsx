import React, { useEffect, useState } from 'react';
import {
  Row, Col
} from 'reactstrap';
import { withTranslation } from 'react-i18next';
import Panel from '../../../shared/components/Panel';
import { Table, Button, Popconfirm, Tooltip } from 'antd';
import { Input, Cascader } from 'antd';
import { DeleteOutlined, EditOutlined,  DownloadOutlined, PlusSquareOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';

const columns = [
  {
    title: 'Mã sinh viên',
    width: "8%",
    dataIndex: 'studentId',
    key: 'studentId',
    render: text => <Tooltip placement="topLeft" title="Click để xem thông tin">
      <a href="">{text}</a>
    </Tooltip>,
    fixed: 'left',
  },
  {
    title: 'Họ và tên',
    width: "10%",
    dataIndex: 'fullName',
    key: 'fullName',
    fixed: 'left',
  },

  { title: 'Ngày sinh', dataIndex: 'dateBirth', width: "10%", key: 'dateBirth' },
  {
    title: 'Giới tính',
    dataIndex: 'sex',
    width: "5%",
    key: 'sex',
    render: text => <>{text !== null ? (text === '1' ? "Nữ" : "Nam") : ""}</>,
  },
  { title: 'Quê quán', dataIndex: 'homeAddress', width: "22%", key: 'homeAddress' },
  { title: 'Số điện thoại', dataIndex: 'phoneNumber', width: "10%", key: 'phoneNumber' },
  {
    title: 'Thao tác',
    key: 'operation',
    fixed: 'right',
    width: "10%",
    align:"center",
    render: () =>
      <>
        <Button type="primary" icon={<EditOutlined />}  >
          Sửa
        </Button>{" "}
        <Popconfirm title="Chắc chắn xoá？" okText="OK" cancelText="Huỷ">
          <Button type="dashed" icon={<DeleteOutlined />} danger>
            Xoá
          </Button>
        </Popconfirm>

      </>
  },
];

const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', { ...selectedRows });
  },
}

const StudentList = ({ t, studentList, departmentList, totalElements, current, setCurrent, setPageSize, setKeySearch1, setKeySearch2, setKeySearch3, setKeySearch4, setKeySearch5, setToInsertPage, setPrepareDepartmentList }) => {

  const [departmentOptions, setDepartmentOptions] = useState([]);

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  useEffect(() => {
    if (departmentList.length > 0) {
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
        <Row style={{ paddingLeft: "0px" }}>

          <Col md={9} sm={12} xs={12} >
            <div className="site-input-group-wrapper">
              <Input.Group compact>

                <Cascader
                  style={{ width: '60%' }}
                  options={departmentOptions}
                  onChange={e => onCascaderChange(e)}
                  placeholder="Tuỳ chọn tìm kiếm..."
                />

                <Input
                  style={{ width: '15%' }}
                  defaultValue=""
                  onChange={e => setKeySearch1(e.target.value)}
                  placeholder="Mã sinh viên..."
                  allowClear
                />

                <Input
                  style={{ width: '25%' }}
                  defaultValue=""
                  placeholder="Tên sinh viên..."
                  onChange={e => setKeySearch2(e.target.value)}
                  allowClear
                />

              </Input.Group>
            </div>
          </Col>
          <Col md={3} className="button_toolbar_list" style={{ position: "relative", display: "flex", justifyContent: "flex-end" }} sm={12} xs={12}>
            <Row style={{ padding: "0px", paddingRight: "15px", width: "100%", display: "flex", justifyContent: "flex-end" }}>
              <Button
                onClick={() => { setToInsertPage(true) }}
                type="primary"
                style={{
                  marginBottom: 16,
                  backgroundColor: "#52c41a",
                  borderColor: "#87e8de",
                  float: "right",
                  right: "0px",
                  marginRight:"15px"
                }}

              >
                <DownloadOutlined />Lưu
              </Button>
              {""}
              <Button
                onClick={() => { setToInsertPage(true) }}
                type="primary"
                style={{
                  marginBottom: 16,
                  float: "right !important",
                  right: "0"
                }}

              >
                <PlusSquareOutlined />Thêm
              </Button>
            </Row>
          </Col>

        </Row>

        <Table
          columns={columns}
          dataSource={studentList}
          scroll={{ x: 1300 }}
          bordered
          rowKey="studentId"
          rowSelection={{ ...rowSelection }}
          pagination={{
            showTotal: total => `Tổng cộng ${total} học sinh`,
            defaultPageSize: 10,
            showSizeChanger: true,
            pageSizeOptions: ['10', '20', '30', '50', '100'],
            total: totalElements,
            current: current,
            onChange: (page, pageSize) => {
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
