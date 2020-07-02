import React from 'react';
import { Col, Row, Container } from 'reactstrap';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const background = `${process.env.PUBLIC_URL}/img/landing/header_bg.png`;
 
const Header = ({ onClick }) => (
  <div className="landing__header" style={{ backgroundImage: `url(${background})` }}>
    <Container>
      <Row>
        <Col md={12}>
          <h2 className="landing__header-title">  Trường đại học dân lập Phương Đông
            
          </h2>
          <p className="landing__header-subhead"> {' '}
            <Link className="landing__header-subhead-update" to="/documentation/changelog" target="_blank">
               
            </Link>
          </p>
          <Link className="landing__btn landing__btn--header" to="/documentation/introduction" target="_blank">
            Đăng ký xét tuyển
          </Link>
          <button type="button" className="landing__btn landing__btn--header" onClick={onClick}>
            Việc làm
          </button>
         </Col>
      </Row>
    </Container>
  </div>
);

Header.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default Header;
