import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../actions/productActions';
import { useParams } from 'react-router-dom';
import Message from '../components/Message';
import Loader from '../components/Loader';
import Product from '../components/Product';
import Paginate from '../components/Paginate';
import Meta from '../components/Meta';
import ProductCarousel from '../components/ProductCarousel';
import ProductSkeleton from '../components/ProductSkeleton';
import ProductCard from '../components/ProductCard';

const HomeScreen = () => {
  const dispatch = useDispatch();
  const { keyword, pageNumber = 1 } = useParams();
  const [delay, setDelay] = useState(true);

  //redux state
  const productList = useSelector((state) => state.productList);
  const { loading, error, products, pages, page } = productList;

  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber));
  }, [dispatch, keyword, pageNumber, delay]);
  setTimeout(() => setDelay(false), 5000);
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
      <Row className='transition'>
        {loading
          ? [...Array(8)].map(() => (
              <ProductCard Component={<ProductSkeleton />} />
            ))
          : products.map((product) => (
              <ProductCard
                key={product.id}
                Component={<Product product={product} />}
              />
            ))}
      </Row>
      <Paginate pages={pages} page={page} keyword={keyword ? keyword : ''} />
    </>
  );
};

export default HomeScreen;
