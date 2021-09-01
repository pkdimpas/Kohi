import { Card, Placeholder, Spinner } from 'react-bootstrap';

const ProductSkeleton = () => {
  return (
    <Card style={{ width: '25rem' }} className='my-3 mr-3 p-3 rounded'>
      <Card.Body>
        <Spinner animation='grow' />
        <Placeholder as={Card.Title} animation='glow'>
          <Placeholder xs={12} />
        </Placeholder>
        <Placeholder as={Card.Text} animation='glow'>
          <Placeholder xs={6} />
          <Placeholder xs={6} />
          <Placeholder xs={7} />
        </Placeholder>
      </Card.Body>
    </Card>
  );
};

export default ProductSkeleton;
