import React, { useState, useEffect } from 'react'

export default function Video(props) {

    return (
        <div class="jumbotron">
            <div className="container">
                <div className="row">
                    <div className="h1">{props.details[props.match.params.id].title}</div>
                </div>
                <hr />
                <div className="row align-items-center justify-content-center">
                    <div className="col-8">
                        <video width="100%" className='mx-auto' src={props.details[props.match.params.id].url} controls autoplay />
                    </div>
                </div>
            </div>
        </div>



    );
}

        // <div>
        //     <div className="container">
        //         <div className="row">
        //             <div className="h1">Title</div>
        //         </div>

        //         <video width="100%" controls autoplay>
        //             <source src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" type="video/mp4" />
        //         </video>
        //     </div>


        // </div>
 //   )
//}
