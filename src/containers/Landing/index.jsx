/* eslint-disable max-len */
import React, { PureComponent } from 'react';
import { Col, Row, Container } from 'reactstrap';
import scrollToComponent from 'react-scroll-to-component';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from './components/Header';
import Technologies from './components/Technologies';
import Footer from './components/Footer';
// import Demos from './components/Demos';
// import Features from './components/Features';
// import Purchase from './components/Purchase';
//  import Testimonials from './components/Testimonials';
// import FeatureRequest from './components/FeatureRequest';
// import Feedback from './components/Feedback';
// import Code from './components/Code';
// import Applications from './components/Applications'; 
import { ThemeProps } from '../../shared/prop-types/ReducerProps';

const logo = `${process.env.PUBLIC_URL}/img/landing/dhpdlogo.png`;

class Landing extends PureComponent {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    theme: ThemeProps.isRequired,
  };
 

  render() {
    //const { theme } = this.props;

    return (
      <div className="landing">
        <div className="landing__menu"  >
          <Container>
            <Row>
              <Col md={12}>
                <div className="landing__menu-wrap">
                  <p className="landing__menu-logo">
                    <img src={logo} alt="" style={{ width: "154px", height: "74px" }} />
                  </p>
                  <nav className="landing__menu-nav">
                    <button
                      onClick={() => scrollToComponent(this.About, { offset: -50, align: 'top', duration: 1000 })}
                      type="button"
                    >
                      Giới thiệu
                    </button>
                    <button
                      onClick={() => scrollToComponent(this.Features, {
                        offset: -50,
                        align: 'top',
                        duration: 1500,
                      })}
                      type="button"
                    >
                      Đào tạo
                    </button>
                    <button
                      onClick={() => scrollToComponent(this.Demos, { offset: -50, align: 'top', duration: 2000 })}
                      type="button"
                    >
                      Tuyển sinh
                    </button>
                    <button
                      onClick={() => scrollToComponent(this.FeatureRequest, {
                        offset: -50,
                        align: 'top',
                        duration: 2500,
                      })}
                      type="button"
                    >
                      Đơn vị chức năng
                     </button>
                    <button
                      onClick={() => scrollToComponent(this.FeatureRequest, {
                        offset: -50,
                        align: 'top',
                        duration: 2500,
                      })}
                      type="button"
                    >
                      Đơn vị đào tạo
                     </button>
                    
                    <button
                      onClick={() => scrollToComponent(this.FeatureRequest, {
                        offset: -50,
                        align: 'top',
                        duration: 2500,
                      })}
                      type="button"
                    >
                      Đoàn thể
                     </button>
                    <button
                      onClick={() => scrollToComponent(this.FeatureRequest, {
                        offset: -50,
                        align: 'top',
                        duration: 2500,
                      })}
                      type="button"
                    >
                      Văn bản
                     </button>
                    <a
                      className="landing__btn"
                      target="_self"
                      rel="noopener noreferrer"
                      href="http://localhost:3000/student"
                    >
                      Đăng nhập
                    </a>
                  </nav>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
        <Header onClick={() => scrollToComponent(this.Demos, { offset: -50, align: 'top', duration: 2000 })} />
        <span ref={(section) => {
          this.About = section;
        }}
        />
        <Technologies /> 
        <Footer />
      </div>
    );
  }
}

export default  Landing ;
