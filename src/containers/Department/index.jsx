import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { withTranslation } from 'react-i18next';
import 'antd/dist/antd.css';
import { ArrowUpOutlined } from '@ant-design/icons';
import { BackTop } from 'antd';
import Panel from '../../shared/components/Panel';
import ClassList from './components/ClassList';
import axios from 'axios';

import { useRecoilState } from 'recoil';
import { departmentGlobalState } from '../../localState/departmentState';

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
            departmentList : departmentArray
          };
          setDepartmentState(Object.assign(departmentState,objectAssign));
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
              md={9}
              style={{
                minHeight: "680px",
              }}
            >
              <ClassList />

            </Col>
            <Col
              md={3}
              style={{
                border: "2px solid",
                minHeight: "680px"
              }}
            >
              col9
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
