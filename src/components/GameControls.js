import React, { useState, useEffect } from 'react';
import axios from 'axios';

import './styles.scss'

function GameControls(props) {

    return (
        <div className="controls-container">
            <div className="d-pad">
                    <button> N </button>
                <div className='row'>
                    <button> W </button>
                    <button> E </button>
                </div>
                    <button> S </button>
            </div>
            
            <div className="misc-buttons">
                <button> Explore! </button>
                <button> Traverse to Destination </button>
            </div>
        </div>
    )
}

export default GameControls;