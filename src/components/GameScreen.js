import React, { useState, useEffect } from 'react';
import './styles.scss'


function GameScreen(props) {
    const [item, setItem] = useState('')
    const exit_names = {
        'e' : 'East',
        'w' : 'West',
        'n' : 'North',
        's' : 'South'
    }
    const handleChanges = e => { 
        e.preventDefault()
        // console.log(e.target.value)
        setItem(e.target.value)
    }

    return (
        <div className="game-screen"> 
            <div className="top-screen">
                <p> {props.roomData.room_id} </p>
                <h5 className="room-coordinates">{props.roomData.coordinates ? props.roomData.coordinates : ""}</h5>
            </div>
            
            <h3 className="room-title">{props.roomData.title ? props.roomData.title : "Initialize your location by pressing the Current Location button."}</h3>
            <p> {props.roomData.description ? props.roomData.description: ''} </p>
            <h5> {props.roomData.exits ? `Exit(s) to the: ${props.roomData.exits.map(exit => { return `${exit_names[exit]} `})}` : ''}</h5>
            <p> Players in the room: {props.roomData.players ? props.roomData.players.map(player => { return <li key={player}> {player} </li>}) : 'None'}</p>
            <div>Items in this room:
                <ul>
                    {props.roomData.items ? props.roomData.items.map(item => { return <li> {item} </li>}) 
                    : 'None'}
                </ul>
                <input type="text"
                placeholder="item"
                onChange={handleChanges}/>
                <button onClick={e => props.pickItem(e, item)}> Pick up item</button>
            </div>
            <h5> {props.roomData.cooldown ? `Action Cooldown: ${props.cooldown}` : ''} </h5>
        </div>
    )
}
export default GameScreen;