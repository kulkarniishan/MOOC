import React, { useState, useEffect } from 'react'

export default function Video(props) {

    return (
        <div>
            <div className="container">
                <div className="row">
                    <div className="h1">Title</div>
                </div>
                <hr />
                <div className="row align-items-center justify-content-center">
                    <div className="col-8">
                        <video width="100%" className='mx-auto' src={props.details[props.match.params.id].url} controls autoplay />
                    </div>
                </div>

            </div>


        </div>
    )
}
