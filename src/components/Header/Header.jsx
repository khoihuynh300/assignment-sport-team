import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faArrowLeft, faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { faBell } from '@fortawesome/free-regular-svg-icons';

import headerStyles from './Header.module.scss';
import Container from '../Container';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useSelector } from 'react-redux';

const Header = () => {
  const cartItems = useSelector((state) => state.cart.items);

  const [search, setSearch] = useState('');

  return (
    <div className={headerStyles['header']}>
      <Container>
        <div className={headerStyles['wrapper']}>
          <div className={headerStyles['left']}>
            <Link to="/" className={headerStyles['logo-content']}>
              <div className={headerStyles['return']}>
                <FontAwesomeIcon
                  style={{ fontSize: '20px', paddingRight: '10px' }}
                  icon={faArrowLeft}
                />
              </div>

              <img src={process.env.PUBLIC_URL + '/logo.png'} className={headerStyles['logo']} />
              <div className={headerStyles['app-name']}>MyCourse.io</div>
            </Link>

            <div className={`${headerStyles['browser']} no-select`}>
              <label>Browse</label>
              <FontAwesomeIcon icon={faAngleDown} className={headerStyles['angle-down']} />
            </div>
          </div>
          <div className={headerStyles['search-wrapper']}>
            <input
              type="text"
              name="search"
              placeholder="Tìm kiếm"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <div
              className={`${headerStyles['clear']} no-select`}
              onClick={() => {
                setSearch('');
              }}
            >
              &times;
            </div>
          </div>
          <div className={headerStyles['user-panel']}>
            <Link to="#" className={headerStyles['become-instructor']}>
              Become Instructor
            </Link>
            <Link to="/cart" className={headerStyles['cart']}>
              <FontAwesomeIcon icon={faCartShopping} />
              {cartItems.length > 0 && (
                <div className={headerStyles['badge']}>{cartItems.length}</div>
              )}
            </Link>
            <div className={headerStyles['notify']}>
              <FontAwesomeIcon icon={faBell} />
            </div>
            <img src={process.env.PUBLIC_URL + '/user.png'} className={headerStyles['user']} />
            <div className={headerStyles['close']}>&times;</div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Header;
