import React, { useEffect } from 'react';
import { Col, Container, Row } from 'reactstrap';
import { withTranslation } from 'react-i18next';
import { connect } from 'react-redux'; 
import TopTen from './components/TopTen';
import { deleteCryptoTableData } from '../../redux/actions/cryptoTableActions'; 
import { ThemeProps, RTLProps } from '../../shared/prop-types/ReducerProps';
import axios from "axios";
const Student = (props)=>  {
 
  useEffect(()=>{
    var formData = new FormData();
    formData.append("page",0);
    formData.append("pageSize",10);

 
  },[])
  const onDeleteCryptoTableData = (index, e) => {
    const { dispatch, cryptoTable } =  props;
    e.preventDefault();
    const arrayCopy = [...cryptoTable];
    arrayCopy.splice(index, 1);
    dispatch(deleteCryptoTableData(arrayCopy));
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

export default connect(state => ({ 
  rtl: state.rtl,
  theme: state.theme,
}))(withTranslation('common')(Student));
