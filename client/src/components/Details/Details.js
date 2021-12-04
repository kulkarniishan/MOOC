import React, { Component} from "react";
import image5 from '../../assets/images/5.png';

class Details extends Component {
    render() {
        return (
            <div class="jumbotron">
            <div class="container text-center text-lg-left">
                
                <div class="row">
                    <div class="col-lg-8">
                        <h1 class="display-4">The fast & visual way
                        to <span class="highlight-word">understand your users</span></h1>
                        <p class="lead">This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information.</p>
                        <span class="text-center d-inline-block">
                        <a class="btn btn-primary btn-lg w-100" href="#" role="button">Try it free</a>
                        <p class="text-muted">No credit card required</p>
                        </span>
                        
                    </div>
                    <div class="col-lg-4 align-items-center d-flex">
                        <img src={image5} alt="Fifth slide" class="img-fluid" />
                    </div>
                    </div>

                
                </div>
            </div>
        );
    }
}

export default Details;