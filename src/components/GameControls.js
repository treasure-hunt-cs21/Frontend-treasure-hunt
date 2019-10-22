import React, { useState, useEffect } from 'react';
import axios from 'axios';

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
    console.log('Heading towards:', );
}

    return (
        <div className="controls-container">
            <p> Click a direction to travel, or use the automated explore button to map the islands. </p>
            <div className="d-pad">
                    <button> N </button>
                <div className='row'>
                    <button> W </button>
                    <button> E </button>
                </div>
                    <button> S </button>
            </div>
            
            <div className="destination-buttons">
                <button> Explore Rooms </button>

                <p>Enter to your Destination</p>
                <input className='destination-input'
                type='text'
                onChange={handleChanges} 
                placeholder='Destination'/>
                <button onClick={submitDestination}> 
                Traverse 
                </button>
            </div>

            <div className="misc-buttons">
                <button onClick={props.handleLocation}> Current Location </button>
                <button> Maybe pick something up? </button>  
            </div>
        </div>
    )
}

export default GameControls;