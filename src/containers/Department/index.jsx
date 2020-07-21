import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { withTranslation } from 'react-i18next';
import 'antd/dist/antd.css';
import { ArrowUpOutlined } from '@ant-design/icons';
import {
  BackTop, Select
} from 'antd';
import axios from 'axios';
import { useRecoilState } from 'recoil';
import { departmentGlobalState } from '../../localState/departmentState';
import Panel from './components/Panel';
import CustomCard from './components/Card';
import './components/Department.scss'

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

const Department = (props) => {

  const [departmentState, setDepartmentState] = useRecoilState(departmentGlobalState);

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

  return (
    <Container className="dashboard">
      <Row style={{ paddingLeft: "0px" }}>

        <Panel lg={12} title={props.t('Khoa')}>
          <Row style={{ paddingLeft: "0px" }}>
            <Col
              md={12} sx={12} sm={12}
              style={{
                minHeight: "680px",
              }}
              className="button_toolbar_list"
            >
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
              <Row
                style={{
                  marginTop: "20px"
                }}
              >
                <Col md={12} xs={12} sm={12}>
                  <Row
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      padding: "15px"
                    }}
                  >
                    {
                      departmentState.departmentList.map(item =>
                        item !== undefined ?
                          <CustomCard
                            departmentName={item.departmentName}
                            departmentId={item.departmentId}
                          /> : ""
                      )}
                  </Row>
                </Col>
              </Row>
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

export default (withTranslation('common')(Department));
