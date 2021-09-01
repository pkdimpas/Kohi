import { Col } from 'react-bootstrap';

const ProductCard = ({ Component, key }) => {
  return (
    <Col
      className='align-items-stretch d-flex'
      key={key}
      sm={12}
      md={6}
      lg={4}
      xl={3}
    >
      {Component}
    </Col>
  );
};

export default ProductCard;
