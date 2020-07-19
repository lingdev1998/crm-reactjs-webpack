import React, { useEffect, useState } from 'react';
import {
  Row, Col
} from 'reactstrap';
import { Table, Button, Popconfirm, Tooltip } from 'antd';
import { Input, Select } from 'antd';
import { DeleteOutlined, EditOutlined, SearchOutlined, DownloadOutlined, PlusSquareOutlined, CloseOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';

import { useRecoilState } from 'recoil';
import { departmentGlobalState } from '../../../localState/departmentState';

const { Option } = Select;

const columns = [
  {
    title: 'Mã lớp',
    width: "10%",
    dataIndex: 'classId',
    key: 'classId',
    render: text => <Tooltip placement="topLeft" title="Click để xem thông tin">
      <a href="">{text}</a>
    </Tooltip>,
  },
  {
    title: 'Tên lớp',
    width: 50,
    dataIndex: 'className',
    key: 'className',
  },

  {
    title: 'Cố vấn học tập',
    dataIndex: 'adviserId',
    width: 50,
    key: 'adviserId'
  },
  {
    title: 'Số lượng S.viên',
    dataIndex: 'totalMember',
    width: "15%",
    key: 'totalMember',
  },
  {
    title: '',
    key: 'operation',
    width: 20,
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



const ClassList = (props) => {

  const [departmentState, setDepartmentState] = useRecoilState(departmentGlobalState);

  return (
    <>
      <Row style={{ paddingLeft: "0px" }}>

        <Col md={12} className="button_toolbar_list" style={{ position: "relative", display: "flex", justifyContent: "flex-end" }} sm={12} xs={12}>
          <Row style={{ padding: "0px", paddingRight: "15px", width: "100%", display: "flex", justifyContent: "flex-end" }} >
            <Select defaultValue="" style={{ width: '25%', height: "35px" }} placeholder="Chọn khoa..." allowClear>
              <Option value="">Chọn khoa...</Option>
              {
                departmentState.departmentList.map(item=>
                  item !== undefined ? <Option value={item.departmentId}>{item.departmentName}</Option>
                  :""
                )
              }
            </Select>

            <Input
              style={{ width: '25%', marginRight:"15px" }}
              defaultValue=""
              placeholder="Nhập khoá..."
              onChange={e => { }}
              allowClear
            />
            {" "}
            <Button
              onClick={() => { }}
              type="primary"
              style={{
                marginBottom: 16,
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
        //dataSource={studentList}
        bordered
        rowKey="studentId"
        //rowSelection={{ ...rowSelection }}
        pagination={{
          showTotal: total => `Tổng cộng ${""} học sinh`,
          defaultPageSize: 10,
          showSizeChanger: true,
          pageSizeOptions: ['10', '20', '30', '50', '100'],
          //total: totalElements,
          //current: current,
          onChange: (page, pageSize) => {
            // setCurrent(page);
            //setPageSize(pageSize);
          }
        }}
      />
    </>
  );
}
export default ClassList;