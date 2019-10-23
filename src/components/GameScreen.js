import React, { useState, useEffect } from 'react';
import './styles.scss'


function GameScreen(props) {
    return (
        <div className="game-screen"> 
            <p> You are currently in:</p>
            <p> {props.roomData.room_id} </p>
            <h3 className="room-title">{props.roomData.title ? props.roomData.title : "Initialize your location by pressing the Current Location button."}</h3>
            <h5 className="room-coordinates">{props.roomData.coordinates ? props.roomData.coordinates : ""}</h5>
            <h5> {props.roomData.description ? props.roomData.description: ''} </h5>
            <h5> {props.roomData.cooldown ? `Action Cooldown: ${props.cooldown}` : ''} </h5>
            <h5> {props.roomData.exits ? `There are exits to the: ${props.roomData.exits.map(exit => { return `${exit} `})}` : ''}</h5>
            {props.roomData.items ? 
                `The items in the room are: ${props.roomData.items.map(item => 
                    { 
                        return (
                            <div>
                                <p>{item}</p>
                                <button onClick={e => props.pickItem(e, item)}>Pick</button>
                            </div>
                        )
                    })}` 
                : 
                ''}
        </div>
    )
}
export default GameScreen;