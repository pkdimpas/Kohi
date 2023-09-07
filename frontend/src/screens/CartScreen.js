import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
//components
import { Row, Col, ListGroup } from 'react-bootstrap';
import { Image, Form, Button, Card } from 'react-bootstrap';
import Message from '../components/Message';
//actions
import { addToCart, removeFromCart } from '../actions/cartActions';

import { formatter } from '../helpers/formatter';

const CartScreen = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [total, setTotal] = useState(0);

  const { cartItems } = useSelector((state) => state.cart);

  useEffect(() => {
    setTotal(cartItems.reduce((acc, item) => acc + item.qty, 0));
  }, [cartItems]);

  const addToCartHandler = (product, qty) => {
    dispatch(addToCart(product, qty));
  };

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    history.push('/login?redirect=shipping');
  };

  return (
    <Row>
      <Col md={8}>
        <h1>Shopping Cart</h1>
        {cartItems.length === 0 && (
          <Message>
            Your Cart is empty <Link to='/'>Go Back</Link>
          </Message>
        )}

        {cartItems.length !== 0 && (
          <ListGroup variant='flush'>
            {cartItems.map((item) => (
              <ListGroup.Item key={item.product}>
                <Row>
                  <Col md={2}>
                    <Image src={item.image} alt={item.name} fluid rounded />
                  </Col>

                  <Col md={3}>
                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                  </Col>

                  <Col md={2}>${item.price}</Col>

                  <Col md={2}>
                    <Form.Select
                      value={item.qty}
                      onChange={(e) =>
                        addToCartHandler(item.product, Number(e.target.value))
                      }
                    >
                      {[...Array(item.countInStock).keys()].map((value) => (
                        <option key={value + 1} value={value + 1}>
                          {value + 1}
                        </option>
                      ))}
                    </Form.Select>
                  </Col>

                  <Col md={2}>
                    <Button
                      variant='light'
                      onClick={() => removeFromCartHandler(item.product)}
                    >
                      <i className='fas fa-trash'></i>
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>

      <Col md={4}>
        <Card>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>Subtotal ({total}) items</h2>
              <h5>
                {formatter.format(
                  cartItems.reduce(
                    (acc, item) => acc + item.qty * item.price,
                    0
                  )
                )}
              </h5>
            </ListGroup.Item>
            <ListGroup.Item>
              <Button
                className='w-100'
                disabled={cartItems.length === 0}
                onClick={checkoutHandler}
              >
                Proceed to Checkout
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  );
};

export default CartScreen;
