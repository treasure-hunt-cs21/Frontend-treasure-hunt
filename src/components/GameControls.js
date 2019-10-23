import React, { useState, useEffect } from 'react';
import axios from 'axios';


import takeRoute from '../helpers/traversal'

import './styles.scss'

function GameControls(props) {
    
const [destination, setDestination] = useState('');
    

// Handles the destination traversal
// Will need to communicate with our back end in order to get the shortest path

const handleChanges = e => {
    e.preventDefault();
    setDestination(e.target.value);
}

const submitDestination = e => {
    e.preventDefault();
    //need to find room id of destination
    let dest = ''

    for (let i = 0; i < 500; i++) {
        if (props.map[i].title == destination){
            dest = i
        }
    }
    console.log('Heading towards:', dest);
    takeRoute(props.map, props.roomData.room_id, dest)
}


const submitItemDestination = e => {
    e.preventDefault();
    //need to find room id of destination
    let dest = ''

    for (let i = 0; i < 500; i++) {
        if (props.map[i].title == destination){
            dest = i
        }
    }
    console.log('Heading towards:', dest);
    takeRoute(props.map, props.roomData.room_id, dest)
}

    return (
        <div className="controls-container">
            <p> Click a direction to travel, or use the automated explore button to map the islands. </p>
            <div className="d-pad">
                    <button onClick={(e) => props.handleMove(e, "n")}> N </button>
                <div className='row'>
                    <button onClick={(e) => props.handleMove(e, "w")}> W </button>
                    <button onClick={(e) => props.handleMove(e, "e")}> E </button>
                </div>
                    <button onClick={(e) => props.handleMove(e, "s")}> S </button>
            </div>
            
            <div className="destination-buttons">
                <p>Enter to your Destination</p>
                <input className='destination-input'
                type='text'
                onChange={handleChanges} 
                placeholder='Destination'/>
                <button onClick={submitDestination}> 
                Traverse 
                </button>
                <button onClick={submitItemDestination}>Item Traverse </button>
            </div>

            <div className="misc-buttons">
                <button onClick={props.handleLocation}> Current Location </button>
            </div>
        </div>
    )
}

export default GameControls;