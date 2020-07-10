import React, { useEffect } from 'react';
import { Col, Container, Row } from 'reactstrap';
import { withTranslation } from 'react-i18next';
import { connect } from 'react-redux'; 
import TopTen from './components/TopTen'; 
import axios from "axios";
const Student = (props)=>  {
 
  useEffect(()=>{

 
  },[])
  const onDeleteCryptoTableData = (index, e) => {
  };
  const {
    t, cryptoTable, rtl, theme,
  } = props;
 

    return (
      <Container className="dashboard">
        <Row>
          <Col md={12}>
            <h3 className="page-title">Sinh viên</h3>
          </Col>
        </Row>
 
        <Row>
 
          <TopTen cryptoTable={cryptoTable} onDeleteCryptoTableData={onDeleteCryptoTableData} />
        </Row>
      </Container>
    );
 
}

export default (withTranslation('common')(Student));
