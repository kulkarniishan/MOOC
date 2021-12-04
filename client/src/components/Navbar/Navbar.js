import React, { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { NavLink, useHistory } from 'react-router-dom';
import SignUp from './Modals/Signup';
import Login from './Modals/Login';
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { logout } from '../../Redux/features/userSlice'
import { setWarning } from '../../Redux/features/warningSlice'
import { FaUserAlt } from 'react-icons/fa'
import { FiLogOut } from 'react-icons/fi'
import { axiosInstance } from '../../axiosSetup';
import './NavigationBar.css'


export default function NavigationBar() {
  const [signupModalOn, setsignupModal] = useState(false)
  const [loginModalOn, setloginModal] = useState(false)
  const [expanded, setExpanded] = useState(false)
  const dispatch = useDispatch()
  const history = useHistory()
  const user = useSelector((state) => state.user.user)
  const warning = useSelector((state) => state.warning.warning)


  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    })
  }, [warning])

  const setToggle = () => {
    setExpanded(!expanded)
  }

  const togglesignupModal = () => {
    setsignupModal(!signupModalOn)
  };
  const toggleloginModal = () => {
    setloginModal(!loginModalOn)
  };

  const toggleBetweenTheModals = () => {
    setloginModal(!loginModalOn);
    setsignupModal(!signupModalOn);
  }

  const handleLogout = async () => {
    await axiosInstance.get('/auth/logout.php', { withCredentials: true })
      .then(response => {
        dispatch(logout())
      })
      .catch(error => {
        console.log(error.response)
      });
    setExpanded(false)
    history.push('/')
  }

  return (
    <>
      <Navbar collapseOnSelect expanded={expanded} bg={'light'} variant={'light'} onToggle={setToggle} expand="md" className='mx-4'>
        <Navbar.Brand><Nav.Link eventKey="1" to="/" onClick={() => setExpanded(false)} exact as={NavLink} activeClassName="matched-profile" className="navbar-brand navbar-logo px-0 m-0 p-0"> Courses</Nav.Link></Navbar.Brand>
        <Nav className="ml-auto">
        </Nav>
        <>
          <Navbar.Toggle onClick={() => setExpanded(!expanded)} aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className='w-100'>
              <Nav.Item><Nav.Link eventKey="2" onClick={() => setExpanded(false)} to="/aboutUs" exact as={NavLink} active={false} className="mx-1 hoverPropfornavlink">About Us</Nav.Link></Nav.Item>

              {!user && (<>
                <Nav.Item><Nav.Link eventKey="3" onClick={() => { setExpanded(false); toggleloginModal() }} active={false} className="mx hoverPropfornavlink">Login</Nav.Link></Nav.Item>
                <Nav.Item><Nav.Link eventKey="4" onClick={() => { setExpanded(false); togglesignupModal() }} active={false} className="mx-1 hoverPropfornavlink">Sign Up</Nav.Link></Nav.Item>
                <Login loginOpen={loginModalOn} toggleloginModal={toggleloginModal} toggleBetweenTheModals={toggleBetweenTheModals} />
                <SignUp signupOpen={signupModalOn} togglesignupModal={togglesignupModal} toggleBetweenTheModals={toggleBetweenTheModals} />
              </>)}
              {user && <>
                <Nav.Item className='ml-auto'>
                  <NavDropdown title={
                    <div style={{ display: 'inline-block' }}>
                      <div className='row ml-auto px-3'>
                        <div className=" nav-image-cropper mr-3" style={{ display: 'inline-block' }}>
                          <img src={user.image || 'https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg'} alt="profile Pic" className='nav-profile-pic' />
                        </div>
                      </div>
                    </div>
                  } id="navbarScrollingDropdown">
                    <NavDropdown.Item onClick={() => setExpanded(false)} as={NavLink} to='/profile' activeClassName=""><FaUserAlt /> View profile</NavDropdown.Item>
                    <NavDropdown.Item onClick={handleLogout}><FiLogOut /> Logout</NavDropdown.Item>
                  </NavDropdown>
                </Nav.Item></>}
            </Nav>
          </Navbar.Collapse>
        </>
      </Navbar>
      {(warning && user) && (
        <div className={' alert alert-primary alert-' + warning.type + ' alert-dismissible fade show mb-0 d-flex between align-items-center'} role="alert">
          <div className="col">
            <strong style={{ textTransform: 'uppercase' }}>{warning.type}!</strong> {warning.message}
          </div>
          <button type="button" className="btn close" data-dismiss="alert" aria-label="Close" onClick={() => dispatch(setWarning(null))}>
            <span className='h5 text-success' aria-hidden="true">&times;</span>
          </button>
        </div>)}
    </>
  )
}
