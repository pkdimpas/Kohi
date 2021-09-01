import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../actions/productActions';
import { useParams } from 'react-router-dom';
import Message from '../components/Message';
import Product from '../components/Product';
import Paginate from '../components/Paginate';
import Meta from '../components/Meta';
import ProductCarousel from '../components/ProductCarousel';
import ProductSkeleton from '../components/ProductSkeleton';
import ProductCard from '../components/ProductCard';

const HomeScreen = () => {
  const dispatch = useDispatch();
  const { keyword, pageNumber = 1 } = useParams();

  //redux state
  const productList = useSelector((state) => state.productList);
  const { loading, error, products, pages, page } = productList;

  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber));
  }, [dispatch, keyword, pageNumber]);

  if (error) return <Message variant='danger'>{error}</Message>;

  return (
    <>
      <Meta />
      {!keyword ? (
        <>
          <h1 className='h1-bestProducts'>Best Products</h1>
          <ProductCarousel />
        </>
      ) : (
        <Link to='/' className='btn btn-light'>
          Go Back
        </Link>
      )}

      <h1>Latest Products</h1>
      {loading ? (
        <Row>
          {[...Array(8)].map((val, idx) => (
            <ProductCard key={idx + 1} Component={<ProductSkeleton />} />
          ))}
        </Row>
      ) : (
        <Row className='transition'>
          {products.map((product) => (
            <ProductCard
              key={product._id}
              Component={<Product product={product} />}
            />
          ))}
        </Row>
      )}
      <Paginate pages={pages} page={page} keyword={keyword ? keyword : ''} />
    </>
  );
};

export default HomeScreen;
