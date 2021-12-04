import React, { useState } from 'react'
import { axiosInstance } from '../../axiosSetup'
import { Carousel } from 'react-bootstrap';

import image1 from '../../assets/images/1.png';
import image2 from '../../assets/images/2.png';
import image3 from '../../assets/images/3.png';
import image4 from '../../assets/images/4.png';


export default function Home() {
    const [searchField, setsearchField] = useState("")
    const [searchResults, setSearchResults] = useState([])
    console.log("sr", searchResults);
    const clickHandler = () => {
        axiosInstance.get("/courses/searchCourses.php?string=" + searchField)
            .then((response) =>
                setSearchResults(response.data && response.data !== "" && response.data !== "\r\n" ? response.data : [])
            )
            .catch((error) => console.log(error))
        console.log(searchResults.length);
    }
    return (
        <div className=''>
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



            <div className="row justify-content-center bg-secondary py-3">
                <div className="col-8">
                    <input type="text" className='form-control w-100 py-2' placeholder='search' value={searchField} onChange={(e) => setsearchField(e.target.value)} />
                </div>
                <div className="col-2">
                    <input type="button" className='btn btn-outline-info' value='search' onClick={clickHandler} />
                </div>
            </div>
            <div className="row justify-content-center mt-5">
                <div className="col-10">
                    {searchResults.length === 0 ?
                        "no results Found" :
                        searchResults.map((value, key) => <div key={key} >
                            <div class="card mb-3 w-100 shadow p-3 mb-5 bg-white rounded">
                                <div class="row no-gutters">
                                    <div class="col-md-4">
                                        <img src={value.thumbnail} class="card-img" alt="image" />
                                    </div>
                                    <div class="col-md-8">
                                        <div class="card-body">
                                            <h5 class="card-title">{value.name}</h5>
                                            <p class="card-text">{value.description}</p>
                                            <p class="card-text"><small class="text-muted">Instructor(s): {value.instructor}</small></p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>)
                    }
                </div>
            </div>
        </div>


    )
}
