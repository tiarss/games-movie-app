import React from 'react'
import '../css/Content.css'

function Game({img,title,genre}) {
    return (
        <div>
            <div className="content" >
                <div className="pic">
                    <img src={img}alt="gamess"/>
                </div>
                <h1>Title : {title} </h1>
                <h5>Genre : {genre} </h5>
                <p className="view" >View More</p>
            </div>
        </div>
    )
}

export default Game
