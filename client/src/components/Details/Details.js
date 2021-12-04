import React, { Component} from "react";
import image7 from '../../assets/images/7.png';

export default function Details() {
        return (
            <div class="jumbotron">
            <div class="container text-center text-lg-left">
            <br></br><br></br><br></br>
            <div class="p-3 mb-2 bg-black text-white">
                <div class="row">
                    <div class="col-lg-8">
                        <h1 class="display-4">
                        Python for Everybody
                        <span class="highlight-word"></span></h1><br></br>
                        <p class="lead">Instructor: Charles Russell Severance </p>
                        <span class="text-center d-inline-block"><br></br><br></br>
                        <a class="btn btn-success btn-lg w-100" href="#" role="button">Enroll Now</a>
                        <p class="text-muted">No credit card required</p>
                        </span>
                        
                    </div>
                    <div class="col-lg-4 align-items-center d-flex">
                        <img src={image7} alt="Fifth slide" class="img-fluid" />
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
                        This course aims to teach everyone the basics of programming computers using Python. We cover the basics of how one constructs a program from a series of simple instructions in Python.  The course has no pre-requisites and avoids all but the simplest mathematics. Anyone with moderate computer experience should be able to master the materials in this course.
                        </span>
                        <br></br><br></br><br></br>
                    </div>
                    
                    </div>

                
                </div>
            </div>
            
        );
}
