import React, { useEffect, useRef, useState } from 'react';
import { Form } from 'react-bootstrap';
import { useHistory, useLocation } from 'react-router-dom';

const SearchBox = () => {
  const [keyword, setKeyword] = useState('');
  const location = useLocation();
  const history = useHistory();
  const searchRef = useRef();

  const path = location.pathname;

  useEffect(() => {
    if (path.split('/search/')[0] === '/') {
      setKeyword('');
    }
  }, [path]);

  const submitHandler = (e) => {
    e.preventDefault();
    console.log(searchRef.current.value);
    if (keyword.trim()) {
      history.push(`/search/${keyword}`);
    } else {
      history.push('/');
    }
  };

  return (
    <Form onSubmit={submitHandler} className='d-flex p-2'>
      <Form.Control
        type='text'
        name='q'
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        placeholder='Search Product...'
        className='mr-sm-2 ml-sm-5 form-control-sm'
        ref={searchRef}
      />
    </Form>
  );
};

export default SearchBox;
