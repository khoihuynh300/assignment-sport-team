import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { faBell } from '@fortawesome/free-regular-svg-icons';

import headerStyles from './Header.module.scss';
import Container from '../Container';

const Header = () => {
  return (
    <div className={headerStyles['header']}>
      <Container>
        <div className={headerStyles['wrapper']}>
          <div className={headerStyles['logo-content']}>
            <img src={process.env.PUBLIC_URL + '/logo.png'} className={headerStyles['logo']} />
            <div className={headerStyles['app-name']}>MyCourse.io</div>
          </div>
          <div className={headerStyles['search-wrapper']}>
            <input
              type="text"
              name="search"
              className={headerStyles['search']}
              placeholder="Tìm kiếm"
            />
          </div>
          <div className={headerStyles['user-panel']}>
            <div className={headerStyles['cart']}>
              <FontAwesomeIcon icon={faCartShopping} />
            </div>
            <div className={headerStyles['notify']}>
              <FontAwesomeIcon icon={faBell} />
            </div>
            <img src={process.env.PUBLIC_URL + '/user.png'} className={headerStyles['user']} />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Header;
