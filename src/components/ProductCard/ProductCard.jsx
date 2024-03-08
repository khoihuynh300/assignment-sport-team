import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';

import productCardStyles from './ProductCard.module.scss';
import ImageWrapper from '../ImageWrapper/ImageWrapper';
import { addToCart } from '../../features/cart/cartSlice';
import Modal from '../Modal/Modal';
import Button from '../Button/Button';
import { notify } from '../../features/toast/toastSlice';

const variantsMap = {
  1: 'option1',
  2: 'option2',
  3: 'option3',
};

const ProductCard = ({ product }) => {
  const {
    id: product_id,
    image: { src: image },
    title,
    vendor,
    variants,
    options,
    images,
  } = product;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [optionsSelected, setOptionsSelected] = useState({});
  const [variantSelected, setVariantSelected] = useState(null);
  const [variantImage, setVariantImage] = useState(null);

  const dispatch = useDispatch();

  let minPrice = variants[0].price;
  let maxPrice = variants[0].price;
  let price;

  // calculate price arrange
  variants.forEach((variant) => {
    if (variant.price < minPrice) {
      minPrice = variant.price;
    }
    if (variant.price > maxPrice) {
      maxPrice = variant.price;
    }
  });

  if (minPrice === maxPrice) {
    price = `$${minPrice}`;
  } else {
    price = `$${minPrice} ~ $${maxPrice}`;
  }

  // store item seleted to shopping cart
  const handleAddToCart = () => {
    dispatch(
      addToCart({
        addedItem: {
          id: variantSelected.id,
          product_id,
          image: variantImage || image,
          title,
          vendor,
          price: variantSelected.price,
          quantity: 1,
          variations: variantSelected.title,
        },
      })
    );
    dispatch(notify({ message: 'Item has been added to your shopping cart' }));
    closeModalAddtoCart();
  };

  // close modal add to cart and clear selected option
  const closeModalAddtoCart = () => {
    setOptionsSelected({});
    setVariantSelected(null);
    setIsModalOpen(false);
  };

  // when select a option of product, set the product selected
  useEffect(() => {
    variants.every((variant) => {
      // .every return false for break  and return true for continue
      let isMatch = true;
      options.every((option) => {
        if (
          variant[variantsMap[option.position]] !== optionsSelected[variantsMap[option.position]]
        ) {
          isMatch = false;
          return false;
        }
        return true;
      });
      if (isMatch) {
        setVariantSelected(variant);

        return false;
      }
      return true;
    });
  }, [optionsSelected]);

  // when select a option of product, change image corresponding to the selection
  useEffect(() => {
    if (variantSelected) {
      for (let index = 0; index < images.length; index++) {
        if (images[index].id === variantSelected.image_id) {
          setVariantImage(images[index].src);
          return;
        }
      }
    }
  }, [variantSelected]);

  return (
    <div className={productCardStyles['product-cart']}>
      <ImageWrapper
        src={image}
        styleWrapper={{ paddingTop: '50%' }}
        alt={`product ${product_id}`}
      />
      <div className={productCardStyles['card-content']}>
        <div className={productCardStyles['title']}>{title}</div>
        <div className={productCardStyles['vendor']}>
          <FontAwesomeIcon icon={faUser} />
          <div>{vendor}</div>
        </div>
        <div className={productCardStyles['price-and-cart']}>
          <div>{price}</div>
          <FontAwesomeIcon
            icon={faCartPlus}
            className={productCardStyles['add-to-cart']}
            onClick={(e) => {
              e.stopPropagation();
              setIsModalOpen(true);
            }}
          />
        </div>
      </div>

      {/* show modal to choose variant type of product */}
      <Modal
        open={isModalOpen}
        onCancel={closeModalAddtoCart}
        bottomSheet
        footer={
          <Button
            style={{ padding: '0 30px' }}
            primary
            onClick={handleAddToCart}
            disabled={options.length === Object.keys(optionsSelected).length ? false : true}
          >
            Add to cart
          </Button>
        }
      >
        <div className={productCardStyles['add-to-cart']}>
          <div className={productCardStyles['header']}>
            <div className={productCardStyles['image']}>
              <ImageWrapper src={variantImage || image} alt={`product ${product_id}`} />
            </div>
            <div className={productCardStyles['detail']}>
              <div className={productCardStyles['title']}>{title}</div>
              <div className={productCardStyles['price']}>
                {variantSelected ? `$${variantSelected.price}` : price}
              </div>
            </div>
          </div>
          <div className={productCardStyles['body']}>
            {options.map((option, index) => {
              return (
                <div key={index} className={productCardStyles['option']}>
                  <div className={productCardStyles['option-name']}>{option.name}</div>
                  <div className={productCardStyles['option-value-wrapper']}>
                    {option.values.map((value) => {
                      return (
                        <div
                          key={value}
                          className={`${productCardStyles['option-value']} ${
                            optionsSelected[variantsMap[option.position]] === value &&
                            productCardStyles['active']
                          }`}
                          onClick={() => {
                            let optionSelected = {};
                            optionSelected[variantsMap[option.position]] = value;
                            setOptionsSelected({ ...optionsSelected, ...optionSelected });
                          }}
                        >
                          {value}
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ProductCard;
