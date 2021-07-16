import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { Navbar, NavDropdown, Nav, Container } from 'react-bootstrap';
import { logout } from '../actions/userActions';
const Header = () => {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  let profile;
  const logoutHandler = () => {
    dispatch(logout());
  };

  profile = userInfo ? (
    <NavDropdown title={userInfo.name} id='username'>
      <LinkContainer to='/profile'>
        <NavDropdown.Item>Profile</NavDropdown.Item>
      </LinkContainer>
      <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
    </NavDropdown>
  ) : (
    <LinkContainer to='/login'>
      <Nav.Link active={false}>
        <i className='fas fa-user'></i> Sign in
      </Nav.Link>
    </LinkContainer>
  );

  return (
    <header>
      <Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect>
        <Container>
          <LinkContainer to='/'>
            <Navbar.Brand>ProShop</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='ms-auto'>
              <LinkContainer to='/cart'>
                <Nav.Link active={false}>
                  <i className='fas fa-shopping-cart'></i> Cart
                </Nav.Link>
              </LinkContainer>
              {profile}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
