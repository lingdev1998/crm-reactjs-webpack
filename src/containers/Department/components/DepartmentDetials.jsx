import React, { useEffect, useState } from 'react';
import {
    Row, Col,
} from 'reactstrap';
import {
    Card
} from 'react-bootstrap';
import { Table, Button, Popconfirm, Tooltip } from 'antd';
import { Input, Select } from 'antd';
import { DeleteOutlined, EditOutlined, SearchOutlined, DownloadOutlined, PlusSquareOutlined, CloseOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';
import { useRecoilState } from 'recoil';
import { departmentGlobalState } from '../../../localState/departmentState';

const DepartmentDetails = (props) => {
    const {details} = props;
    return (
        <Card>
            <Card.Header>{""}</Card.Header>
            <Card.Body>
                <Card.Title>Title</Card.Title>
                <Card.Text>
                   Something here
                </Card.Text>
                <Button variant="primary">Go somewhere</Button>
            </Card.Body>
        </Card>
    );
}

export default DepartmentDetails;