import React from 'react';
import {Carousel} from 'react-bootstrap';

import image1 from '../../assets/images/1.png';
import image2 from '../../assets/images/2.png';
import image3 from '../../assets/images/3.png';
import image4 from '../../assets/images/4.png';


const Home = () => {
    return (
        <Carousel controls={false} fade={true} pause={false}>
            <Carousel.Item interval={1000}>
                <img
                width={900} height={500} alt="900x500"
                className="d-block w-100"
                src={image1}
                alt="First slide"
                />
                <Carousel.Caption>
                <h3>First slide label</h3>
                <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item interval={500}>
                <img
                width={900} height={500} alt="900x500"
                className="d-block w-100"
                src={image2}
                alt="Second slide"
                />
                <Carousel.Caption>
                <h3>Second slide label</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img
                width={900} height={500} alt="900x500"
                className="d-block w-100"
                src={image3}
                alt="Third slide"
                />
                <Carousel.Caption>
                <h3>Third slide label</h3>
                <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img
                width={900} height={500} alt="900x500"
                className="d-block w-100"
                src={image4}
                alt="Fourth slide"
                />
                <Carousel.Caption>
                <h3>Fourth slide label</h3>
                <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                </Carousel.Caption>
            </Carousel.Item>
        </Carousel>
        <section className="search-bar">
        <div className="row">
          <div className="col-lg mx-auto"> 
  
            <form>
              <div>
                <div className="input-group">
                  <div className="homeBtn">
                  <h3>VIZZEY</h3> 
                  </div> 
                
                  <input type="search" placeholder="Search" className="form-control" />
                  <button className="searchBtn"><CgSearch /></button>
                  <div className="input-group-append buttons"></div>
                </div>
            </div>
            </form>
            </div>
            </div>
            </section>


        
    )
}

export default Home;

