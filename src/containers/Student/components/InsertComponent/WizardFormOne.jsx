import React, { useState, useEffect } from 'react';
import { ButtonToolbar } from 'reactstrap';
import { Input, Cascader } from 'antd';
import { Button } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';
const WizardFormOne = (props) => {

  function onCascaderChange(value) {
    value[0] === undefined ? props.setDepartmentId('') : props.setDepartmentId(value[0]);
    value[1] === undefined ? props.setCourseNumber('') : props.setCourseNumber(value[1]);
    value[2] === undefined ? props.setClassId('') : props.setClassId(value[2]);

  }
  return (
    <div className="form form--horizontal  wizard__form" onSubmit={props.handleSubmit} style={{ marginBottom: "0px", maxWidth: "750px" }}  >

      <div style={{ width: "100%", marginBottom: "35px" }}>
        <Input.Group compact>
          <Cascader style={{ width: '100%' }}
            defaultValue={props.classId !== '' && props.departmentId !== '' && props.courseNumber !== '' ? [props.departmentId, props.courseNumber, props.classId] : []}
            options={props.prepareDepartmentList}
            onChange={e => onCascaderChange(e)}
            placeholder="Chọn khoa và lớp để tiếp tục..." />
        </Input.Group>
      </div>

      <ButtonToolbar className="form__button-toolbar wizard__toolbar" style={{ display: "flex", justifyContent: 'center', width: '100%', marginLeft: "0" }}>
        <Button type="primary" className="wizard_button" onClick={() => props.setToInsertPage(false)}><LeftOutlined />Quay lại</Button>
        <Button
          className="wizard_button"
          type="primary"
          disabled={!(props.classId !== '' && props.departmentId !== '' && props.courseNumber !== '')}
          onClick={() => {
            props.setIsNextStep(true);
            props.nextPage();
          }}
        >
          Tiếp
          <RightOutlined />
        </Button>
      </ButtonToolbar>

    </div>
  );
}

export default WizardFormOne;
