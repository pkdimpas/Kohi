import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Carousel, Image } from 'react-bootstrap';
import Loader from './Loader';
import Message from './Message';
import { listTopProducts } from '../actions/productActions';
import { formatter } from '../helpers/formatter';

const ProductCarousel = () => {
  const dispatch = useDispatch();

  const productTopRated = useSelector((state) => state.productTopRated);
  const { loading, error, products } = productTopRated;

  useEffect(() => {
    dispatch(listTopProducts());
  }, [dispatch]);

  if (error) return <Message variant='danger'>{error}</Message>;

  return (
    <Carousel pause='hover' className='bg-light' fade>
      {loading ? (
        <Carousel.Item style={{ height: '350px' }}>
          <Loader />
        </Carousel.Item>
      ) : (
        products.map((product) => (
          <Carousel.Item key={product._id} className='transition'>
            <Link to={`/product/${product._id}`}>
              <div className='img-div'>
                <Image src={product.image} alt={product.name} fluid />
              </div>

              <Carousel.Caption className='carousel-caption'>
                <h2>
                  {product.name} ({formatter.format(product.price)})
                </h2>
              </Carousel.Caption>
            </Link>
          </Carousel.Item>
        ))
      )}
    </Carousel>
  );
};

export default ProductCarousel;
