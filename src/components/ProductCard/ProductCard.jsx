import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import productCardStyles from './ProductCard.module.scss';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';

const ProductCard = () => {
  return (
    <div className={productCardStyles['product-cart']}>
      <img
        src="https://cdn.shopify.com/s/files/1/0601/5782/1137/files/HTB14qqLHVXXXXcHXXXXq6xXFXXX4.webp?v=1695731581"
        alt=""
        width="100%"
        height="auto"
      />
      <div className={productCardStyles['card-content']}>
        <div className={productCardStyles['title']}>
          2017 Hot Sale Real Shoes Women Pumps Plus Size Shoes Women Zapatos Mujer Pumps High Heel
          Sandals Chaussure Femme Bottom Heels
        </div>
        <div className={productCardStyles['vendor']}>
          <FontAwesomeIcon icon={faUser} />
          <div>Kitaki Studio</div>
        </div>
        <div className={productCardStyles['price-and-cart']}>
          <div>$24</div>
          <FontAwesomeIcon icon={faCartPlus} className={productCardStyles['add-to-cart']} />
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
