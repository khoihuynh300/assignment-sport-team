import { Link } from 'react-router-dom';
import { Col, Row } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { useSelector, useDispatch } from 'react-redux';

import cartStyles from './Cart.module.scss';
import ImageWrapper from '../../components/ImageWrapper';
import Checkbox from '../../components/Checkbox';
import { changeQuantity, removeItem, removeMultipleItem } from '../../features/cart/cartSlice';
import { useEffect, useRef, useState } from 'react';
import Button from '../../components/Button/Button';
import Modal from '../../components/Modal/Modal';

const Cart = () => {
  const [listChecked, setListChecked] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dialogConfirmDelete = useRef({ message: '', onOk: () => {} });

  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  // compute subtotal and total for checkout section
  useEffect(() => {
    let sum = 0;
    let amount = 0;
    listChecked.forEach((checkedId) => {
      cartItems.forEach((item) => {
        if (checkedId === item.id) {
          sum += Number(item.price * item.quantity);
          amount += Number(item.quantity);
        }
      });
    });
    setSubtotal(sum);
    setTotalItems(amount);
  }, [cartItems, listChecked]);

  // handle checkbox select one item
  const handleCheckItem = (e) => {
    const value = Number(e.target.value);
    if (listChecked.includes(value)) {
      const newListChecked = listChecked.filter((item) => item !== value);
      setListChecked(newListChecked);
    } else {
      setListChecked([...listChecked, value]);
    }
  };

  // handle checkbox select all items
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      const newListChecked = [];
      cartItems?.forEach((item) => {
        newListChecked.push(item.id);
      });
      setListChecked(newListChecked);
    } else {
      setListChecked([]);
    }
  };

  // handle change quantity of item
  const handleChangeQuantity = (id, quantity) => {
    quantity = Number(quantity);
    if (quantity >= 1 && quantity <= 999) {
      dispatch(changeQuantity({ id, quantity }));
    }
  };

  // remove item from cart
  const handleRemoveCartItem = (id) => {
    dispatch(removeItem({ id }));
  };

  // remove all item from cart
  const handleRemoveCartItems = () => {
    dispatch(removeMultipleItem({ itemsChecked: listChecked }));
  };

  // show dialog to confirm before remove a item
  const confirmRemoveCartItem = (id) => {
    dialogConfirmDelete.current = {
      message: 'Do you want to delete this item',
      onOk: () => {
        handleRemoveCartItem(id);
      },
    };
    setIsModalOpen(true);
  };

  // show dialog to confirm before remove all seleted item
  const confirmRemoveCartItems = () => {
    if (listChecked.length > 0) {
      dialogConfirmDelete.current = {
        message: 'Do you want to delete these items',
        onOk: handleRemoveCartItems,
      };
      setIsModalOpen(true);
    }
  };

  return (
    <div className={cartStyles['wrapper']}>
      <Row
        gutter={{
          sm: 16,
          md: 24,
        }}
        className={cartStyles['content']}
      >
        <Col xs={24} lg={16} className={cartStyles['col1']}>
          <div className={cartStyles['left-container']}>
            <div className={cartStyles['header-container']}>
              <div className={cartStyles['check-all']}>
                <Checkbox
                  onChange={handleSelectAll}
                  checked={listChecked?.length !== 0 && listChecked?.length === cartItems?.length}
                >
                  Select all
                </Checkbox>
              </div>
              <div
                className={`${cartStyles['delete-all']} no-select`}
                onClick={confirmRemoveCartItems}
              >
                <FontAwesomeIcon icon={faTrashCan} style={{ fontSize: '18px' }} />
                <span>Delete</span>
              </div>
            </div>
            <div className={cartStyles['list-cart']}>
              {cartItems.map((cartItem) => {
                return (
                  <div key={cartItem.id} className={cartStyles['item-cart']}>
                    <Checkbox
                      onChange={handleCheckItem}
                      value={cartItem.id}
                      checked={listChecked.includes(cartItem.id)}
                      style={{ transform: 'translateY(-50%)' }}
                    />
                    <Link to={`/product/${cartItem.id}`} className={cartStyles['image']}>
                      <ImageWrapper src={cartItem.image} alt={`product ${cartItem.id}`} />
                    </Link>
                    <div className={cartStyles['detail']}>
                      <Link to={`/product/${cartItem.id}`} className={cartStyles['title']}>
                        {cartItem.title}
                      </Link>
                      <div className={cartStyles['variations']}>
                        <div>Variations:</div>
                        <div>{cartItem.variations}</div>
                      </div>

                      <div className={cartStyles['price']}>${cartItem.price}</div>
                      <div className={cartStyles['quantity']}>
                        <div
                          className={`${cartStyles['minus']} ${
                            cartItem.quantity === 1 && cartStyles['disable']
                          } no-select`}
                          onClick={() => {
                            handleChangeQuantity(cartItem.id, cartItem.quantity - 1);
                          }}
                        >
                          <FontAwesomeIcon icon={faMinus} />
                        </div>
                        <input
                          type="text"
                          name="quantity"
                          value={cartItem.quantity}
                          onChange={(e) => {
                            handleChangeQuantity(cartItem.id, e.target.value);
                          }}
                        />
                        <div
                          className={`${cartStyles['plus']} ${
                            cartItem.quantity === 999 && cartStyles['disable']
                          } no-select`}
                          onClick={() => {
                            handleChangeQuantity(cartItem.id, cartItem.quantity + 1);
                          }}
                        >
                          <FontAwesomeIcon icon={faPlus} />
                        </div>
                      </div>
                    </div>

                    <FontAwesomeIcon
                      icon={faTrashCan}
                      style={{ fontSize: '18px', cursor: 'pointer' }}
                      onClick={() => {
                        confirmRemoveCartItem(cartItem.id);
                      }}
                      className="no-select"
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </Col>
        <Col xs={24} lg={8} className={cartStyles['col2']}>
          <div className={cartStyles['right-container']}>
            <div className={cartStyles['summary']}>
              <span className={cartStyles['summary-section-heading']}>Order Summary</span>
              <div className={cartStyles['checkout-summary-rows']}>
                <div className={cartStyles['checkout-summary-row']}>
                  <span>
                    Subtotal ({totalItems} item{listChecked.length > 1 && 's'})
                  </span>
                  <span className={cartStyles['price']}>${subtotal}</span>
                </div>
                <div className={cartStyles['checkout-summary-row']}>
                  <span>Shipping Fee</span>
                  <span className={cartStyles['price']}>$0</span>
                </div>
              </div>
              <div className={cartStyles['checkout-total']}>
                <span>Total</span>
                <span className={cartStyles['price']}>${subtotal}</span>
              </div>
              <Button primary>Checkout</Button>
            </div>
          </div>
        </Col>
      </Row>

      <Modal
        open={isModalOpen}
        onCancel={() => {
          setIsModalOpen(false);
        }}
        footer={
          <div style={{ display: 'flex', gap: '8px' }}>
            <Button
              style={{ width: '90px' }}
              onClick={() => {
                dialogConfirmDelete.current.onOk();
                setIsModalOpen(false);
              }}
            >
              Yes
            </Button>
            <Button
              style={{ width: '90px' }}
              primary
              onClick={() => {
                setIsModalOpen(false);
              }}
            >
              Cancel
            </Button>
          </div>
        }
      >
        {dialogConfirmDelete.current.message}
      </Modal>
    </div>
  );
};

export default Cart;
