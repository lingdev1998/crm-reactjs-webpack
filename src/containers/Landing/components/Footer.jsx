import React from 'react';
import { Col, Row, Container } from 'reactstrap';

const background = `${process.env.PUBLIC_URL}/img/landing/footer_bg.png`;

const Footer = () => (
  <footer className="landing__footer">
    <img className="landing__footer-background" src={background} alt="" />
    <Container>
      <Row>
        <Col md={12}>
          <p className="landing__footer-text"><b>TRƯỜNG ĐẠI HỌC PHƯƠNG ĐÔNG</b>      </p>
          <p className="landing__footer-text"><b><i>Cơ sở 1:  </i>  </b> &nbsp;171 Trung Kính, Yên Hòa, Cầu Giấy, Hà Nội     </p>
          <p className="landing__footer-text"><b><i>Cơ sở 2:  </i>  </b> &nbsp;Cơ sở 2: Số 4 Ngõ Chùa Hưng Ký, phố Minh Khai, Quận Hai Bà Trưng, Thành phố Hà Nội     </p>
          <p className="landing__footer-text-end">Điện thoại: 024-3784-8513 (14/15/16/17/18) | Fax: 024-3784-8512 | Email: tspd@dhpd.edu.vn</p>

        </Col>
      </Row>
    </Container>
  </footer>
);

export default Footer;
