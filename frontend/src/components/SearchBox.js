import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

const SearchBox = () => {
  const [keyword, setKeyword] = useState('');
  const history = useHistory();

  const submitHandler = (e) => {
    e.preventDefault();
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
        onChange={(e) => setKeyword(e.target.value)}
        placeholder='Search Product...'
        className='mr-sm-2 ml-sm-5 form-control-sm'
      />
    </Form>
  );
};

export default SearchBox;
