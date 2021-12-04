import React, { useState } from 'react'
import { axiosInstance } from '../../axiosSetup'

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
        <div className='py-5'>
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
