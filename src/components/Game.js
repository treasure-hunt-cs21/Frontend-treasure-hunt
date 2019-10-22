import React, { useState, useEffect } from 'react';
import axios from 'axios';

import GameScreen from './GameScreen'
import GameControls from './GameControls'

import './styles.scss'

function GameDisplay(props) {
    const [data, setData] = useState({});

    useEffect(() => {
        console.log('USE EFFECT!')
    }, []);

    return (
        <div className="game-display"> 
            <GameScreen />
            <GameControls />
        </div>
    )
}

export default GameDisplay