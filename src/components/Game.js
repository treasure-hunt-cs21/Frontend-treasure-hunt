import React, { useState, useEffect } from 'react';
import axios from 'axios';
import axioswithAuth from '../helpers/axioswithAuth';

import explore from '../helpers/explore'

import GameScreen from './GameScreen'
import GameControls from './GameControls'

import './styles.scss'

function GameDisplay(props) {
    const [roomData, setroomData] = useState({});

    useEffect(() => {
        console.log('USE EFFECT!')
    }, []);

    const handleLocation = e => {
        e.preventDefault();
        console.log('Handling location');
        axioswithAuth().get('/init/')
            .then(res => {
                console.log(res)
                setroomData(res.data);
            })
            .catch(error => {
                console.error(error)
            })
    }

    const handleExplore = e => {
        e.preventDefault()
        explore()
    }

    return (
        <div className="game-display"> 
            <button onClick={handleExplore}> explore </button>
            <GameScreen roomData={roomData}/>
            <GameControls handleLocation={handleLocation} roomData={roomData}/>
        </div>
    )
}

export default GameDisplay