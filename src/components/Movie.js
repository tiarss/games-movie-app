import React from 'react'
import '../css/Content.css'

function Movie({img,title,rating,duration}) {
    return (
        <div>
            <div className="content" >
                <div className="pic">
                    <img src={img} alt="gamess"/>
                </div>
                <h1>Title : {title}</h1>
                <h5>Rating : {rating}/10</h5>
                <h5>Duration : {duration}</h5>
                <p className="view">View More</p>
            </div>
        </div>
    )
}

export default Movie
