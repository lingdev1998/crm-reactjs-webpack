import React, { useEffect, useState } from 'react';
import {
  Row, Col
} from 'reactstrap';
import { Table, Button, Popconfirm, Tooltip } from 'antd';
import { Input, Select } from 'antd';
import { DeleteOutlined, EditOutlined, PlusSquareOutlined,  } from '@ant-design/icons';
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
    width: "27%",
    dataIndex: 'className',
    key: 'className',
    render: (text, record) => record.classId + " - " + record.className,
  },

  {
    title: 'Cố vấn học tập',
    dataIndex: 'adviserId',
    width: "28%",
    key: 'adviserId',
  },
  {
    title: 'Sĩ số',
    dataIndex: 'totalMember',
    width: "10%",
    key: 'totalMember',
    align: "center",
  },
  {
    title: 'Thao tác',
    key: 'operation',
    width: "25%",
    align: "center",
    render: () =>
      <>
        <Button type="primary" icon={<EditOutlined />}  >
          Sửa
        </Button>{" "}
        {" "}
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

        <Col md={12} className="button_toolbar_list" sm={12} xs={12}>
          <Row >
            <Col md={2} sm={12} xs={12}>
              <Row
                style={{
                  padding: "0px",
                  position: "relative",
                  paddingRight: "0px",
                  marginLeft: "0px",
                  width: "100%",
                  display: "flex",
                  justifyContent: "flex-start",
                  lineHeight: "35px"
                }}
              >
                <div className="panel__title">
                  <h5 className="bold-text">Khoa<span className="panel__label badge badge-secondary"></span></h5>
                  <h5 className="subhead"></h5>
                </div>
              </Row>
            </Col>
            <Col md={10} sm={12} xs={12}>
              <Row style={{
                padding: "0px",
                position: "relative",
                paddingRight: "0px",
                marginLeft: "0px",
                width: "100%",
                display: "flex",
                justifyContent: "flex-end"
              }}>
                <Select
                  style={{
                    width: '35%',
                    height: "35px",
                    marginRight: "15px"
                  }}
                  placeholder="Chọn khoa..."
                  allowClear
                  value={props.departmentId}
                  onChange={
                    values => {
                      props.setDepartmentId(values);
                    }
                  }
                >
                  {
                    departmentState.departmentList.map(item =>
                      item !== undefined ? <Option key={"departmentId" + item.departmentId} value={item.departmentId}>{item.departmentName}</Option>
                        : ""
                    )
                  }
                </Select>

                <Input
                  style={{
                    width: '35%',
                    marginRight: "15px"
                  }}
                  values={props.keySearch}
                  placeholder="Nhập khoá..."
                  onChange={
                    e =>
                      props.setKeysearch(e.target.value)
                  }
                  addonBefore="Khoá: "
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
        </Col>
      </Row>
      <Table
        columns={columns}
        dataSource={departmentState.classList}
        bordered
        rowKey="studentId"
        scroll={{ y: 700 }}
        //rowSelection={{ ...rowSelection }}
        pagination={{
          showTotal: total => `Tổng cộng ${total} lớp`,
          defaultPageSize: 10,
          showSizeChanger: true,
          pageSizeOptions: ['10', '20', '30', '50', '100'],
          total: props.totalElements,
          //current: current,
          onChange: (page, pageSize) => {
            props.setPage(page - 1);
            props.setPageSize(pageSize);
          }
        }}
      />
    </>
  );
}
export default ClassList;