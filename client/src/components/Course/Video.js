import React from 'react'

export default function Video(props) {
    console.log(props);
    return (
        <div>
            <div className="container">
                <div className="row">
                    <div className="h1">Title</div>
                </div>
                <hr />
                <video width="100%" controls autoplay>
                    <source src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" type="video/mp4" />
                </video>
            </div>


        </div>
    )
}
