import React from 'react';

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-dark">
      <div className="container-fluid">
        <a className="navbar-brand text-white" href="#">MOOC</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav m-auto">
            <li class="nav-item">
              <a className="nav-link active text-white text-uppercase me-3" aria-current="page" href="#">Home&nbsp;<i class="fas fa-home"></i></a>
            </li>
            <li className="nav-item">
              <a class="nav-link text-white text-uppercase me-3" href="#">About Us</a>
            </li>
            <li className="nav-item">
              <a class="nav-link text-white text-uppercase" href="#">Contact Us</a>
            </li>
            
          </ul>
          <form inline >
            <button variant="primary" href="/login" className="btn btn-outline-primary me-3">Login</button>
            <button variant="outline-primary" href="/register" className="btn btn-outline-primary me-5">Register</button>
          </form>
        </div>
      </div>
    </nav>
  )
}

export default Navbar;
