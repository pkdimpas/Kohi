import { Fragment, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory, useParams } from 'react-router-dom';
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  Form,
} from 'react-bootstrap';
//components
import Rating from '../components/Rating';
import Loader from '../components/Loader';
import Message from '../components/Message';
//actions
import {
  listProductDetails,
  createProductReview,
  resetCreateReviewProduct,
} from '../actions/productActions';
import Meta from '../components/Meta';
import { addToCart } from '../actions/cartActions';

const ProductScreen = () => {
  //redux state
  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  const productReviewCreate = useSelector((state) => state.productReviewCreate);
  const { error: errorReview, success: successReview } = productReviewCreate;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  //react-router-dom hooks
  const { id: paramId } = useParams({});
  const dispatch = useDispatch();

  //local state
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  useEffect(() => {
    resetCreateReviewProduct();
    if (successReview) {
      alert('Review Submitted!');
      setRating(0);
      setComment('');
      resetCreateReviewProduct();
    }

    dispatch(listProductDetails(paramId));
  }, [dispatch, paramId, successReview]);

  const addToCartHandler = () => {
    dispatch(addToCart(paramId, Number(qty)));
  };

  const addCommentHandler = (e) => {
    e.preventDefault();
    dispatch(
      createProductReview(paramId, {
        rating,
        comment,
      })
    );
  };

  return (
    <Fragment>
      <Link className='btn btn-light my-3' to='/'>
        Go Back
      </Link>

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Meta title={product.name} />
          <Row>
            <Col md={6}>
              <Image src={product.image} alt={product.name} fluid />
            </Col>
            <Col md={3}>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <h3>{product.name}</h3>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Rating
                    value={product.rating}
                    text={`${product.numReviews} reviews`}
                  />
                </ListGroup.Item>
                <ListGroup.Item>Price: ${product.price}</ListGroup.Item>
                <ListGroup.Item>
                  Description: {product.description}
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={3}>
              <Card>
                <ListGroup variant='flush'>
                  <ListGroup.Item>
                    <Row>
                      <Col>Price:</Col>
                      <Col>
                        <strong>${product.price}</strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <Row>
                      <Col>Status:</Col>
                      <Col>
                        {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  {product.countInStock > 0 && (
                    <ListGroup.Item>
                      <Row>
                        <Col>Qty</Col>
                        <Col>
                          <Form.Select
                            value={qty}
                            onChange={(e) => setQty(e.target.value)}
                          >
                            {[...Array(product.countInStock).keys()].map(
                              (value) => (
                                <option key={value + 1} value={value + 1}>
                                  {value + 1}
                                </option>
                              )
                            )}
                          </Form.Select>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  )}
                  <ListGroup.Item>
                    <Button
                      onClick={addToCartHandler}
                      className='w-100'
                      disabled={!product.countInStock}
                      block
                    >
                      Add to Cart
                    </Button>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <h2>Reviews</h2>
              {product.reviews.length === 0 && <Message>No Reviews</Message>}
              <ListGroup variant='flush'>
                {product.reviews.map((review) => (
                  <ListGroup.Item key={review._id}>
                    <strong>{review.name}</strong>
                    <Rating value={review.rating} />
                    <p>{review.createdAt.substring(0, 10)}</p>
                    <p>{review.comment}</p>
                  </ListGroup.Item>
                ))}
                <ListGroup.Item>
                  <h2>Write a Review</h2>
                  {errorReview && (
                    <Message variant='danger'>{errorReview}</Message>
                  )}
                  {userInfo ? (
                    <Form onSubmit={addCommentHandler}>
                      <Form.Group controlId='rating'>
                        <Form.Label>Rating</Form.Label>
                        <Form.Select
                          value={rating}
                          onChange={(e) => setRating(e.target.value)}
                        >
                          <option value=''>Select...</option>
                          <option value='1'>1 - Poor</option>
                          <option value='2'>2 - Fair</option>
                          <option value='3'>3 - Good</option>
                          <option value='4'>4 - Very Good</option>
                          <option value='5'>5 - Excellent</option>
                        </Form.Select>
                      </Form.Group>
                      <Form.Group>
                        <Form.Label>Comment</Form.Label>
                        <Form.Control
                          as='textarea'
                          row='3'
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                      <Button className='my-2' type='submit' variant='primary'>
                        Submit
                      </Button>
                    </Form>
                  ) : (
                    <Message>
                      Please <Link to='/login'>sign in</Link> to write a review
                    </Message>
                  )}
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
        </>
      )}
    </Fragment>
  );
};

export default ProductScreen;
