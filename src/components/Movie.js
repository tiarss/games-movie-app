import React from 'react'
import { useHistory } from 'react-router-dom'
import '../css/Content.css'

function Movie({img,title,rating,duration,id}) {
    let history = useHistory()
    return (
        <div>
            <div className="content" >
                <div className="pic">
                    <img src={img} alt="gamess"/>
                </div>
                <h1>Title : {title}</h1>
                <h5>Rating : {rating}/10</h5>
                <h5>Duration : {duration}</h5>
                <p className="view" onClick={function(){history.push(`./movies/${id}`)}}>View More</p>
            </div>
        </div>
    )
}

export default Movie
