import { Row, Col } from 'antd';

import homeStyles from './Home.module.scss';
import Filter from '../../components/Filter/Filter';
import ProductCard from '../../components/ProductCard/ProductCard';
import { getAllProduct } from '../../services/productService';
import { useEffect } from 'react';

const Home = () => {
  const getAllProducts = async () => {
    const res = await getAllProduct();
    return res;
  };
  useEffect(() => {
    getAllProducts();
  }, []);
  const filters = [
    {
      name: 'Category',
      selections: ['Design', 'Design', 'Programming', 'Photo'],
      type: 'checkbox',
    },
    {
      name: 'Price',
      selections: ['dưới 200.000', '200.000 đến 500.000', '500.000 đến 1tr', 'trên 1tr'],
      type: 'radio',
    },
    {
      name: 'Tag',
      selections: ['heels', 'clothes', 'shoes', 'electronics'],
      type: 'checkbox',
    },
  ];

  return (
    <div className={homeStyles['wrapper']}>
      <Row
        gutter={{
          sm: 16,
          md: 24,
        }}
      >
        <Col xs={6}>
          <Filter filters={filters} />
        </Col>
        <Col xs={18}>
          <Row
            gutter={[
              {
                sm: 16,
                md: 24,
              },
              {
                sm: 8,
                md: 16,
              },
            ]}
          >
            <Col xs={8}>
              <ProductCard />
            </Col>
            <Col xs={8}>
              <ProductCard />
            </Col>
            <Col xs={8}>
              <ProductCard />
            </Col>
            <Col xs={8}>
              <ProductCard />
            </Col>
            <Col xs={8}>
              <ProductCard />
            </Col>
            <Col xs={8}>
              <ProductCard />
            </Col>
            <Col xs={8}>
              <ProductCard />
            </Col>
            <Col xs={8}>
              <ProductCard />
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default Home;
