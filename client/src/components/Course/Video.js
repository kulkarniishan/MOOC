import React, { Component} from 'react'

export default function Video(props) {
    console.log(props);
    return (
        <div class="jumbotron">
            
            <h2 class="text-center">Basics of Python</h2>
                
            <div align="center" className="embed-responsive embed-responsive-16by9">
                                <video autoplay loop className="embed-responsive-item">
                                    <source src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" type="video/mp4" />
                                </video>
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
