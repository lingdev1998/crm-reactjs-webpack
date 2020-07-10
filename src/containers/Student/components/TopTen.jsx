/* eslint-disable react/no-array-index-key,react/no-typos */
import React from 'react';
import {
  DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown, Table,
} from 'reactstrap';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import DotsHorizontalIcon from 'mdi-react/DotsHorizontalIcon';
import Panel from '../../../shared/components/Panel';
import { useRecoilValue } from 'recoil';
import { studentListState } from '../studentState';

const CustomTooltip = ({ active, payload }) => {
  if (active) {
    return (
      <div className="dashboard__total-tooltip">
        <p className="label">{`$${payload[0].value}`}</p>
      </div>
    );
  }

  return null;
};



const DropDownMore = ({ index, handleDeleteRow }) => (
  <UncontrolledDropdown className="dashboard__table-more">
    <DropdownToggle>
      <p><DotsHorizontalIcon /></p>
    </DropdownToggle>
    <DropdownMenu className="dropdown__menu">
      <Link to={`/dashboard_crypto/edit/${index}`}><DropdownItem>Edit</DropdownItem></Link>
      <DropdownItem onClick={handleDeleteRow}>Delete</DropdownItem>
    </DropdownMenu>
  </UncontrolledDropdown>
);

DropDownMore.propTypes = {
  index: PropTypes.number.isRequired,
  handleDeleteRow: PropTypes.func.isRequired,
};

const TopTen = ({ cryptoTable, onDeleteCryptoTableData, t }) => {
  const studentList = useRecoilValue(studentListState);
  return (
    <Panel lg={12} title={t('Danh sách sinh viên')}>

      <Table responsive className="table--bordered dashboard__table-crypto">
        <thead>
          <tr>
            <th>Mã sinh viên</th>
            <th>Họ và tên</th>
            <th>Giới tính</th>
            <th>Ngày sinh</th>
            <th>Dân tộc</th>
            <th>Lớp</th>
            <th>Khoa</th>
            <th>Số điện thoại</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {studentList.map((item, index) => (
            <tr key={index}>
              <td>{517100032}</td>
              <td>{"Đoàn Văn Linh"}</td>
              <td dir="ltr">{"Nam"}</td>
              <td dir="ltr">{"24/11/1998"}</td>
              <td dir="ltr">{"Kinh"}</td>
              <td dir="ltr">{"517101"}</td>
              <td>{"Công nghệ thông tin"}</td>
              <td className="dashboard__table-crypto-chart">
                {"0964708429"}
              </td>
              <td>
                <DropDownMore index={index} handleDeleteRow={e => onDeleteCryptoTableData(index, e)} />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Panel>
  );

}
export default withTranslation('common')(TopTen);
