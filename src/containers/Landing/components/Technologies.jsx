import React from 'react';
import { Col, Container, Row } from 'reactstrap';
 
const logo = `${process.env.PUBLIC_URL}/img/landing/dhpd logo.png`;

const Technologies = () => (
  <section className="landing__section">
    <Container>
      <Row>
        <Col md={4}>
          <h3 className="landing__section-title">Tuyển sinh trang chủ
          </h3>
          <div className="landing__technology">
            <div className="landing__technology-img-wrap">
              <img className="landing__technology-img" src={logo} alt="react" />
            </div>
           </div>
        </Col>
        <Col md={4}>
          <h3 className="landing__section-title">Bản tin các khoa
          </h3>
          <div className="landing__technology">
            <div className="landing__technology-img-wrap">
              <img className="landing__technology-img" src={logo} alt="react" />
            </div>
           </div>
        </Col>
        <Col md={4}>
          <h3 className="landing__section-title">Thông báo quan trọng
          </h3>
          <div className="landing__technology">
            <div className="landing__technology-img-wrap">
              <img className="landing__technology-img" src={logo} alt="react" />
            </div>
           </div>
        </Col>
      </Row>
    </Container>
  </section>
);

export default Technologies;
