import { Col, Row } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons';

import footerStyles from './Footer.module.scss';
import Container from '../Container';

const Footer = () => {
  return (
    <div className={footerStyles['footer']}>
      <Container>
        <Row className={footerStyles['footer-first']}>
          <Col xs={6}>
            <div className={footerStyles['logo-content']}>
              <img
                src={process.env.PUBLIC_URL + '/logo.png'}
                alt="logo"
                className={footerStyles['logo']}
              />
              <div className={footerStyles['app-name']}>MyCourse.io</div>
            </div>
          </Col>
          <Col xs={6}>
            <ul>
              <li>
                <a href="#">Web Programming</a>
              </li>
              <li>
                <a href="#">Mobile Programming</a>
              </li>
              <li>
                <a href="#">Java Beginner</a>
              </li>
              <li>
                <a href="#">PHP Beginner</a>
              </li>
            </ul>
          </Col>
          <Col xs={6}>
            <ul>
              <li>
                <a href="#">Adobe Illustrator</a>
              </li>
              <li>
                <a href="#">Adobe Photoshop</a>
              </li>
              <li>
                <a href="#">Design Logo</a>
              </li>
            </ul>
          </Col>
          <Col xs={6}>
            <ul>
              <li>
                <a href="#">Writing Course</a>
              </li>
              <li>
                <a href="#">Photography</a>
              </li>
              <li>
                <a href="#">Video Making</a>
              </li>
            </ul>
          </Col>
        </Row>
        <Row className={footerStyles['footer-second']}>
          <div>Copyright © MyCourse.io 2024. All Rights Reserved</div>
          <div className={footerStyles['social-link']}>
            <a href="#">
              <FontAwesomeIcon icon={faTwitter} />
            </a>
            <a href="#">
              <FontAwesomeIcon icon={faInstagram} />
            </a>
            <a href="#">
              <FontAwesomeIcon icon={faFacebookF} />
            </a>
          </div>
        </Row>
      </Container>
    </div>
  );
};

export default Footer;
