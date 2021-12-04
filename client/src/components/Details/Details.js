import React, { Component, useEffect, useState } from "react";
import image7 from '../../assets/images/7.png';
import { axiosInstance } from "../../axiosSetup";


export default function Details(props) {
    const [courseData, setcourseData] = useState(null)
    useEffect(() => {
        axiosInstance.get('/courses/getcourse.php?courseId=' + props.match.params.id, { withCredentials: true })
            .then((response) =>
            {
                console.log(response)
                setcourseData(response.data[0])
            })
            .catch((error) => console.log(error))
    }, [])

    const handleEnroll = ()=>{
    
    }
    return (<>{
        courseData ?
            <div class="jumbotron">
                <div class="container text-center text-lg-left">
                    <br></br><br></br><br></br>
                    <div class="p-3 mb-2 bg-black text-white">
                        <div class="row">
                            <div class="col-lg-8">
                                <h1 class="display-4">
                                    {courseData.name}
                                    <span class="highlight-word"></span></h1><br></br>
                                <p class="lead">Instructor(s): {courseData.instructor} </p>
                                <span class="text-center d-inline-block"><br></br><br></br>
                                    <button class="btn btn-success btn-lg w-100"  onClick={handleEnroll}>Enroll Now</button>
                                    <p class="text-muted">No credit card required</p>
                                </span>

                            </div>
                            <div class="col-lg-4 align-items-center d-flex">
                                <img src={courseData.thumbnail} alt="Fifth slide" class="img-fluid" />
                            </div>
                        </div>
                    </div>

                    <br></br>
                    <br></br>
                    <br></br><br></br>

                    <div class="row">
                        <div class="col-md-6">
                            <h1 class="display-8">
                                About this Course
                                <span class="highlight-word"></span></h1>
                            <p class="lead">10,000 recent views </p>
                            <span class="text-center d-inline-block">
                                {courseData.description}
                            </span>
                            <br></br><br></br><br></br>
                        </div>

                    </div>


                </div>
            </div> :
            <div>Course Not Found</div>
    }
    </>


    );
}
