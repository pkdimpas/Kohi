import React from 'react';
import { Pagination } from 'react-bootstrap';
import { useLocation } from 'react-router';
import { LinkContainer } from 'react-router-bootstrap';

const Paginate = ({ pages, page, keyword = '' }) => {
  const location = useLocation();
  const path = location.pathname;
  const baseUrl =
    path.split('/page/')[0] === '/' ? '' : path.split('/page/')[0];

  if (pages <= 1) return null;

  return (
    <Pagination className='justify-content-center my-3'>
      {[...Array(pages).keys()].map((x) => (
        <LinkContainer key={x + 1} to={`${baseUrl}/page/${x + 1}`}>
          <Pagination.Item active={x + 1 === page}>{x + 1}</Pagination.Item>
        </LinkContainer>
      ))}
    </Pagination>
  );
};
export default Paginate;
