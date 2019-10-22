import React, { useState, useEffect } from 'react';

import './styles.scss'


function GameScreen(props) {
    return (
        <div className="game-screen"> 
            <p> You are currently in:</p> 
            <h3 className="room-title">{props.roomData.title ? props.roomData.title : "Initialize your location to begin"}</h3>
            <h5 className="room-coordinates">{props.roomData.coordinates ? props.roomData.coordinates : ""}</h5>
            <h5> {props.roomData.description ? props.roomData.description: ''} </h5>
        </div>
        
    )
}

export default GameScreen;