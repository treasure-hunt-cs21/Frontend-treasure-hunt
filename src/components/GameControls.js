import React, { useState, useEffect } from 'react';
import axioswithAuth from '../helpers/axioswithAuth'
import axios from 'axios';


import takeRoute from '../helpers/traversal'
import takeItemRoute from '../helpers/itemtraversal'

import './styles.scss'

function GameControls(props) {
    
const [destination, setDestination] = useState('');
const [examine, setExamine] = useState('');
    

// Handles the destination traversal
// Will need to communicate with our back end in order to get the shortest path

const handleChanges = e => {
    e.preventDefault();
    setDestination(e.target.value);
}

const handleExamineChanges = e => {
    e.preventDefault();
    setExamine(e.target.value)
}

const submitNameDestination = e => {
    e.preventDefault();
    //need to find room id of destination
    let dest = ''

    console.log("Searching for room by Title.")

    for (let i = 0; i < 500; i++) {
        if (props.map[i].title == destination){
            dest = i
        }
    }
    console.log('Heading towards:', dest);
    takeRoute(props.map, props.roomData.room_id, dest)
}


const submitIDDestination = e => {
    e.preventDefault()
    console.log(destination)
    console.log('Searching for room by Room ID.')
    let target = +destination
    console.log('target type', typeof(target))
    console.log('room_id type:', typeof(props.roomData.room_id))
    takeRoute(props.map, props.roomData.room_id, target)
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
    takeItemRoute(props.map, props.roomData.room_id, dest)
}

const submitExamine = e => {
    e.preventDefault();
    let examine_obj = {
        "name" : examine
    }
    axioswithAuth().post('/examine/', examine_obj)
    .then(results => {
        console.log(results.data)
        console.log(results.data.description)
    })
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
                <button onClick={submitNameDestination}> 
                Travel by Name
                </button>
                <button onClick={submitIDDestination}> Travel by ID </button>
                <button onClick={submitItemDestination}>Item Traverse </button>
            </div>

            <div className="misc-buttons">
                <input type="text"
                placeholder="Examine"
                className="examine-input"
                onChange={handleExamineChanges} />
                <button onClick={submitExamine}> Examine </button>
                <button onClick={props.handleLocation}> Current Location </button>
            </div>
        </div>
    )
}

export default GameControls;