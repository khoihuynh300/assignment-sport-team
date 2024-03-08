import { useEffect, useState } from 'react';
import { Row, Col } from 'antd';
import { useSelector } from 'react-redux';

import homeStyles from './Home.module.scss';
import Filter from '../../components/Filter/Filter';
import ProductCard from '../../components/ProductCard/ProductCard';
import { getAllProduct } from '../../services/productService';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [filterOptions, setFilterOptions] = useState({});
  const [isMobileFilterShow, setIsMobileFilterShow] = useState(false);
  useEffect(() => {
    isMobileFilterShow
      ? (document.body.style.overflow = 'hidden')
      : (document.body.style.overflow = 'auto');
  }, [isMobileFilterShow]);

  const filter = useSelector((state) => state.filter.selectedFilters);

  const getAllProducts = async () => {
    const res = await getAllProduct();
    getFilterOptions(res);
    setProducts(res);
  };

  const getFilterOptions = (productList) => {
    const options = {
      product_type: { name: 'Product Type', selections: [], type: 'checkbox' },
      price: {
        name: 'Price',
        selections: [
          {
            value: { lt: 20 },
            name: 'Under $20',
          },
          {
            value: { gte: 20, lte: 50 },
            name: 'From $20 to $ 50',
          },
          { value: { gt: 50 }, name: 'Over $50' },
        ],
        type: 'radio',
      },
      tags: { name: 'Tag', selections: [], type: 'checkbox' },
    };

    productList.forEach((product) => {
      const product_type = product.product_type.toLowerCase();
      const tags = product.tags.toLowerCase();

      if (product_type !== '' && product_type != null) {
        options.product_type.selections.push(product_type);
      }
      if (tags !== '' && tags != null) {
        options.tags.selections.push(tags);
      }
    });
    options.product_type.selections = [...new Set(options.product_type.selections)];
    options.tags.selections = [...new Set(options.tags.selections)];
    setFilterOptions(options);
  };

  const filterProducts = async () => {
    const res = await getAllProduct();
    const filteredProducts = await res.filter((product) => {
      let result = true;
      // filter product type
      if (filter.product_type.length > 0) {
        result = result && filter.product_type.includes(product.product_type.toLowerCase());
      }

      // filter tags
      if (filter.tags.length > 0) {
        result = result && filter.tags.includes(product.tags.toLowerCase());
      }

      // filter price
      if (filter.price.gte) {
        let checkPrice = false;

        product.variants.forEach((variant) => {
          checkPrice = checkPrice || variant.price >= filter.price.gte;
        });
        result = result && checkPrice;
      }
      if (filter.price.gt) {
        let checkPrice = false;

        product.variants.forEach((variant) => {
          checkPrice = checkPrice || variant.price > filter.price.gt;
        });
        result = result && checkPrice;
      }
      if (filter.price.lte) {
        let checkPrice = false;

        product.variants.forEach((variant) => {
          checkPrice = checkPrice || variant.price <= filter.price.lte;
        });
        result = result && checkPrice;
      }
      if (filter.price.lt) {
        let checkPrice = false;

        product.variants.forEach((variant) => {
          checkPrice = checkPrice || variant.price < filter.price.lt;
        });
        result = result && checkPrice;
      }
      return result;
    });
    setProducts(filteredProducts);
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  useEffect(() => {
    filterProducts();
  }, [filter]);

  const showMobileFilter = () => {
    setIsMobileFilterShow(true);
  };

  return (
    <>
      <div className={homeStyles['wrapper']}>
        <Row
          gutter={{
            sm: 16,
            md: 24,
          }}
        >
          <Col
            xs={0}
            lg={6}
            className={`${homeStyles['filter-wrapper']} ${
              isMobileFilterShow && homeStyles['show-on-mobile']
            }`}
          >
            <Filter setIsMobileFilterShow={setIsMobileFilterShow} filters={filterOptions} />
          </Col>

          <Col xs={24} lg={18}>
            <Row gutter={[24, 16]}>
              {products.map((product) => {
                return (
                  <Col xs={24} md={12} lg={8} key={product.id}>
                    <ProductCard product={product} />
                  </Col>
                );
              })}
            </Row>
          </Col>
          {/* mobile filter */}
          {!isMobileFilterShow && (
            <div className={homeStyles['show-filter-sort']}>
              <div className={homeStyles['content']}>
                <div className={homeStyles['left']} onClick={showMobileFilter}>
                  Filter
                </div>
                <div className={homeStyles['right']}>Sort</div>
              </div>
            </div>
          )}
        </Row>
      </div>
    </>
  );
};

export default Home;
