import React from 'react';
import {
    Button, Tooltip
} from 'antd';
import { EyeOutlined } from '@ant-design/icons';
import {
    Col
} from 'reactstrap';
import {Link} from 'react-router-dom';

const CustomCard = (props) => {
    return (
        <Col className="card-custom"   >
            <h3 className="title">{props.departmentName}</h3>
            <div className="bar">
                <div className="emptybar"></div>
                <div className="filledbar"></div>
            </div>
            <div style={{ bottom: "0", position: "absolute", zIndex:"0",width:"%" }}>
                <Button type="primary" ><Link to={`/departments/${props.departmentId}`} ><EyeOutlined /> Xem</Link></Button>
            </div>
        </Col>
    );
}
export default CustomCard;