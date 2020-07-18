/* eslint-disable react/no-array-index-key,react/no-typos */
import React, { useState } from 'react';
import {
    Col, Card, Row, CardBody,
} from 'reactstrap';
import { withTranslation } from 'react-i18next';
import Panel from '../../../shared/components/Panel';
import InsertCompoent from './InsertComponent/InsertStepOne';
import 'antd/dist/antd.css';
const InsertStudent = (props) => {

    const [page, setPage] = useState(1);

    const nextPage = () => {
        setPage(page + 1);
    };

    const previousPage = () => {
        setPage(page - 1);
    };


    return (
        <>
            <Panel lg={12} title={props.t('Thêm sinh viên')}>
                <Row>
                    <Col md={12} lg={12}>
                        <Card>
                            <CardBody className="wizard">
                                {page === 1
                                    && (
                                        <div className=""  >

                                            <InsertCompoent
                                                nextPage={nextPage}
                                                setToInsertPage={props.setToInsertPage}
                                                prepareDepartmentList={props.prepareDepartmentList}
                                                setForceRerender={props.setForceRerender}
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
