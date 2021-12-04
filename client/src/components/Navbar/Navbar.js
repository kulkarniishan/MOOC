<<<<<<< HEAD
import React from 'react';
import {Link} from 'react-router-dom';
=======
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
import { IoSettingsSharp } from 'react-icons/io5'
import { FaUserAlt } from 'react-icons/fa'
import { FiLogOut } from 'react-icons/fi'
import { axiosInstance } from '../../axiosSetup';


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
    await axiosInstance.get('/api/logout.php', { withCredentials: true })
      .then(response => {
        dispatch(logout())
      })
      .catch(error => {
        console.log(error.response)
      });
    setExpanded(false)
    history.push('/')
  }
>>>>>>> e6cfc4c9d8cb2e00db7b81e55ca0b12a1b72d641

  return (
<<<<<<< HEAD
    <nav className="navbar navbar-expand-lg navbar-light bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand text-white" href="#">MOOC</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav m-auto">
            <li class="nav-item">
              <Link className="nav-link active text-white text-uppercase me-3" aria-current="page" to="/home">Home&nbsp;<i class="fas fa-home"></i></Link>
            </li>
            <li className="nav-item">
              <Link class="nav-link text-white text-uppercase me-3" to="/about">About Us</Link>
            </li>
            <li className="nav-item">
              <Link class="nav-link text-white text-uppercase" to="/contact">Contact Us</Link>
            </li>
            
          </ul>
          <form inline >
            <button variant="primary" href="/login" className="btn btn-outline-primary me-3">Login</button>
            <button variant="outline-primary" href="/register" className="btn btn-outline-primary me-5">Register</button>
          </form>
        </div>
      </div>
    </nav>
=======
    <>
      <Navbar collapseOnSelect expanded={expanded} bg={'light'} variant={'light'} onToggle={setToggle} expand="md" className='mx-4'>
        <Navbar.Brand><Nav.Link eventKey="1" to="/" onClick={() => setExpanded(false)} exact as={NavLink} activeClassName="matched-profile" className="navbar-brand navbar-logo px-0 m-0 p-0"> Courses</Nav.Link></Navbar.Brand>
        <Nav className="ml-auto">
        </Nav>
        <>
          <Navbar.Toggle onClick={() => setExpanded(!expanded)} aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="ml-auto">
              <Nav.Item><Nav.Link eventKey="2" onClick={() => setExpanded(false)} to="/aboutUs" exact as={NavLink} active={false} className="mx-1 hoverPropfornavlink">About Us</Nav.Link></Nav.Item>

              {!user && (<>
                <Nav.Item><Nav.Link eventKey="4" onClick={() => { setExpanded(false); toggleloginModal() }} active={false} className="mx-1 hoverPropfornavlink">Login</Nav.Link></Nav.Item>
                <Nav.Item><Nav.Link eventKey="5" onClick={() => { setExpanded(false); togglesignupModal() }} active={false} className="mx-1 hoverPropfornavlink">Sign Up</Nav.Link></Nav.Item>
                <Login loginOpen={loginModalOn} toggleloginModal={toggleloginModal} toggleBetweenTheModals={toggleBetweenTheModals} />
                <SignUp signupOpen={signupModalOn} togglesignupModal={togglesignupModal} toggleBetweenTheModals={toggleBetweenTheModals} />
              </>)}
              {user && <>
                <Nav.Item><Nav.Link eventKey="6" onClick={() => setExpanded(false)} to="/dashbord" as={NavLink} active={false} className="mx-1 hoverPropfornavlink">Dashbord</Nav.Link></Nav.Item>
                <Nav.Item>
                  <NavDropdown title={
                    <div style={{ display: 'inline-block' }}>
                      <div className='row ml-0'>
                        <div className=" nav-image-cropper mr-3" style={{ display: 'inline-block' }}>
                          <img src={user.image || 'https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg'} alt="profile Pic" className='nav-profile-pic' />
                        </div>
                      </div>
                    </div>
                  } id="navbarScrollingDropdown">
                    {(user.type.toLowerCase() === 'submitter') &&
                      <NavDropdown.Item onClick={() => setExpanded(false)} as={NavLink} to='/profile' activeClassName=""><FaUserAlt /> View profile</NavDropdown.Item>}
                    <NavDropdown.Item onClick={() => setExpanded(false)} as={NavLink} to='/Users' activeClassName=""><IoSettingsSharp /> Account Settings</NavDropdown.Item>
                    <NavDropdown.Item onClick={handleLogout}><FiLogOut /> Logout</NavDropdown.Item>
                  </NavDropdown>
                </Nav.Item></>}
            </Nav>
          </Navbar.Collapse>
        </>
      </Navbar>
      {(warning && user) && (
        <div className={'alert alert-primary alert-' + warning.type + ' alert-dismissible fade show mb-0'} role="alert">
          <strong style={{ textTransform: 'uppercase' }}>{warning.type}!</strong> {warning.message}
          <button type="button" className="close" data-dismiss="alert" aria-label="Close" onClick={() => dispatch(setWarning(null))}>
            <span aria-hidden="true">&times;</span>
          </button>
        </div>)}
    </>
>>>>>>> e6cfc4c9d8cb2e00db7b81e55ca0b12a1b72d641
  )
}
