import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { withTranslation } from 'react-i18next';
import 'antd/dist/antd.css';
import { ArrowUpOutlined } from '@ant-design/icons';
import {
    Button, Popconfirm, Tooltip, BackTop, Input, Select
} from 'antd';
import { DeleteOutlined, EditOutlined, PlusSquareOutlined, } from '@ant-design/icons';
import axios from 'axios';
import { useRecoilState } from 'recoil';
import { departmentGlobalState } from '../../../localState/departmentState';
import Panel from './Panel';
import ClassList from './ClassList';
import DepartmentDetails from './DepartmentDetials';
import VerticalTabsColored from './VerticalTabsColored';

const { Option } = Select;

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

const ClassListHomePage = (props) => {

    const [departmentState, setDepartmentState] = useRecoilState(departmentGlobalState);

    const [departmentId, setDepartmentId] = useState(undefined);

    const [page, setPage] = useState(0);

    const [pageSize, setPageSize] = useState(10);

    const [keySearch, setKeysearch] = useState("");

    const [totalElements, setTotalElement] = useState(0);

    useEffect(() => {
        axios.get("/department/getAll")
            .then(
                res => {
                    let departmentArray = [];
                    res.data.map(item => {
                        let object = {
                            departmentId: item.departmentId,
                            departmentName: item.departmentName
                        };
                        departmentArray.push(object);
                    });
                    let objectAssign = {
                        departmentList: departmentArray
                    };
                    setDepartmentState(Object.assign(departmentState, objectAssign));
                }
            )
            .catch(err => console.log(err));

    }, []);

    useEffect(() => {
        let formData = new FormData();
        formData.append("page", 0);
        formData.append("pageSize", 10);
        formData.append("departmentId", departmentId !== undefined ? departmentId : "");
        formData.append("keySearch1", keySearch);
        axios.post("class/getAll", formData).then(
            res => {
                let objectAssign = {
                    classList: res.data.content
                }
                setDepartmentState(Object.assign(departmentState, objectAssign));
                setTotalElement(res.data.totalElements)
            }
        ).catch(
            err => {
                console.log(err);
                let objectAssign = {
                    classList: []
                }
                setDepartmentState(Object.assign(departmentState, objectAssign));
                setTotalElement(0)
            }
        )
    }, [departmentId, keySearch]);


    useEffect(() => {
        let formData = new FormData();
        formData.append("page", page);
        formData.append("pageSize", pageSize);
        formData.append("departmentId", departmentId !== undefined ? departmentId : "");
        formData.append("keySearch1", keySearch);
        axios.post("class/getAll", formData).then(
            res => {
                let objectAssign = {
                    classList: res.data.content
                }
                setDepartmentState(Object.assign(departmentState, objectAssign));
                setTotalElement(res.data.totalElements)
            }
        ).catch(
            err => {
                console.log(err);
                let objectAssign = {
                    classList: []
                }
                setDepartmentState(Object.assign(departmentState, objectAssign));
                setTotalElement(0)
            }
        )
    }, [page, pageSize]);


    return (
        <Container className="dashboard">
            <Row style={{ paddingLeft: "0px" }}>

                <Panel lg={12} title={props.t('Khoa')}>
                    <Row style={{ paddingLeft: "0px" }}>
                        <Col
                            md={9} sx={12} sm={12}
                            style={{
                                minHeight: "680px",
                            }}
                        >
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
                            <ClassList
                                setDepartmentId={setDepartmentId}
                                setPage={setPage}
                                setPageSize={setPageSize}
                                totalElements={totalElements}
                                setKeysearch={setKeysearch}
                                keySearch={keySearch}
                            />

                        </Col>
                        <Col
                            md={3}
                            style={{
                                minHeight: "680px",
                                background: "white",
                                borderRadius: "2px"
                            }}
                        >
                            <DepartmentDetails />
                        </Col>
                    </Row>

                </Panel>

                <BackTop>
                    <div style={style}><ArrowUpOutlined /></div>
                </BackTop>
            </Row>


        </Container>
    );

}

export default (withTranslation('common')(ClassListHomePage));
