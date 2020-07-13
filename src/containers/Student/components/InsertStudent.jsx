/* eslint-disable react/no-array-index-key,react/no-typos */
import React, { useEffect, useState } from 'react';
import {
    Col, Card, Row, CardBody,
} from 'reactstrap';
import { withTranslation } from 'react-i18next';
import Panel from '../../../shared/components/Panel';
import WizardFormOne from './InsertComponent/WizardFormOne.jsx';
import WizardFormTwo from './InsertComponent/WizardFormTwo';
import WizardFormThree from './InsertComponent/WizardFormThree';
import 'antd/dist/antd.css';
const InsertStudent = (props) => {

    const [page, setPage] = useState(1);
    const [isNextStep, setIsNextStep] = useState(false);

    const nextPage = () => {
        setPage(page + 1);
    };

    const previousPage = () => {
        setPage(page - 1);
    };

    return (
        <>
            <Panel lg={12} title={props.t('Thêm sinh viên')}>

                <Row style={{ marginLeft: "20px", marginRight: "20px" }}>
                    <div className="wizard__steps" style={{ width: "100%" }}>
                         <div className={`wizard__step${page === 1 ? ' wizard__step--active' : ''}`}><p>Thông tin sinh viên</p></div>
                        <div className={`wizard__step${page === 2 ? ' wizard__step--active' : ''}`}><p>Ảnh</p></div>
                    </div>


                </Row>
                <Row>
                    <Col md={12} lg={12}>
                        <Card>
                            <CardBody className="wizard">
 
                                {page === 1
                                    && (
                                        <div className=""  >

                                            <WizardFormTwo
                                                nextPage={nextPage}
                                                prevPage={previousPage}
                                                prepareDepartmentList={props.prepareDepartmentList}

                                                departmentId={props.departmentId}
                                                courseNumber={props.courseNumber}
                                                classId={props.classId}
                                                setClassId={props.setClassId}
                                            />
                                        </div>
                                    )}
                                {page === 3
                                    && (
                                        <div className="wizard__form-wrapper"  >

                                            <WizardFormThree


                                            />
                                        </div>

                                    )}
                            </CardBody>
                        </Card>
                    </Col>

                </Row>
            </Panel>
        </>
    );

}
export default withTranslation('common')(InsertStudent);
