import React, { useState, useEffect, Component } from "react";
import { NavLink, Route, Switch, Redirect } from "react-router-dom";
import image8 from '../../assets/images/8.jpg';
import { axiosInstance } from "../../axiosSetup";
import Video from "./Video";

export default function Course(props) {

    const [courseVideoData, setcourseVideoData] = useState(null)
    useEffect(() => {
        axiosInstance.get('/course_has_videos/getCourseVideos.php?courseId=' + props.match.params.id, { withCredentials: true })
            .then((response) => {
                console.log(response)
                setcourseVideoData(response.data)
                
            })
            .catch((error) => console.log(error))
    }, [])

    return (<>
        {courseVideoData && courseVideoData.length > 0 ?
            <>
                <div class="container-fluid">
                    <div class="row flex-nowrap">
                        <div class="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark">
                            <div class="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
                                <a href="/" class="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-white text-decoration-none">
                                    <span class="fs-5 d-none d-sm-inline">Menu</span>
                                </a>
                                <ul class="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">
                                    {
                                        courseVideoData.map((value, key) =>
                                            <li className="w-100 mb-2" key={key}><NavLink to={`/course/${props.match.params.id}/video/${key}`} class="nav-link text-decoration-none" activeClassName='text-light text-decoration-none' style={{ textDecoration: 'none' }}>{value.title}</NavLink></li>
                                        )
                                    }
                                </ul>
                            </div>
                        </div>
                        <div class="col py-3">
                            <Switch>
                                <Redirect from={`/course/${props.match.params.id}`} exact to={`/course/${props.match.params.id}/video/0`} />
                                <Route path={`/course/${props.match.params.id}/video/:id`} exact render={(props) => <Video {...props} details={courseVideoData} />} />
                            </Switch>
                        </div>
                    </div>
                </div>
            </>
            :
            <>Loading ...</>}
    </>
    );
}