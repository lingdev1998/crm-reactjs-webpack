import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { withTranslation } from 'react-i18next';
import axios from "axios";
import 'antd/dist/antd.css';
import { ArrowUpOutlined } from '@ant-design/icons';
import { BackTop } from 'antd';
import Panel from '../../shared/components/Panel';
import ProfileMain from './components/ProfileMain'; 
import { Button, Input } from "antd"; 

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

  useEffect(() => {


  }, []);

  return (
    <Container className="dashboard">
      <Row style={{ paddingLeft: "0px" }}>
        <Panel lg={12} title={props.t('Khoa')}>
          <Row style={{ paddingLeft: "0px" }}>
            <Col
              md={9}
              style={{
                border: "2px solid",
                minHeight: "680px"
              }}
            >
 
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
