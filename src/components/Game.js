import React from 'react'
import { useHistory } from 'react-router-dom'
import '../css/Content.css'


function Game({img,title,genre,id}) {
    let history = useHistory()
    return (
        <div>
            <div className="content" >
                <div className="pic">
                    <img src={img}alt="gamess"/>
                </div>
                <h1>Title : {title} </h1>
                <h5>Genre : {genre} </h5>
                <p className="view" onClick={function(){history.push(`./games/${id}`)}} >View More</p>
            </div>
        </div>
    )
}

export default Game
