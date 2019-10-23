import React, { useState, useEffect } from 'react';
import './styles.scss'


function GameScreen(props) {
    const [item, setItem] = useState('')

    const handleChanges = e => { 
        e.preventDefault()
        console.log(e.target.value)
        setItem(e.target.value)
    }

    return (
        <div className="game-screen"> 
            <p> You are currently in:</p>
            <p> {props.roomData.room_id} </p>
            <h3 className="room-title">{props.roomData.title ? props.roomData.title : "Initialize your location by pressing the Current Location button."}</h3>
            <h5 className="room-coordinates">{props.roomData.coordinates ? props.roomData.coordinates : ""}</h5>
            <h5> {props.roomData.description ? props.roomData.description: ''} </h5>
            <h5> {props.roomData.cooldown ? `Action Cooldown: ${props.cooldown}` : ''} </h5>
            <h5> {props.roomData.exits ? `There are exits to the: ${props.roomData.exits.map(exit => { return `${exit} `})}` : ''}</h5>
            <div>Items in this room:
                <ul>
                    {props.roomData.items ? props.roomData.items.map(item => { return <li> {item} </li>}) 
                    : ''}
                </ul>
                <input type="text"
                placeholder="item"
                onChange={handleChanges}/>
                <button onClick={e => props.pickItem(e, item)}> Pick up item</button>
            </div>
        </div>
    )
}
export default GameScreen;

// {props.roomData.items  ? 
//     `The items in the room are: ${props.roomData.items.map(item => 
//         { 
//             console.log(item)
//             return (
//                 <>
//                     <p> {item} </p>
//                     {/* <button onClick={e => props.pickItem(e, item)}>Pick</button> */}
//                 </>
//             )
//         })}` 
//     : ''}