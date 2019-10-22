import React, { useState, useEffect } from 'react';
import axios from 'axios';
import axioswithAuth from '../helpers/axioswithAuth';

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

    return (
        <div className="game-display"> 
            <GameScreen roomData={roomData}/>
            <GameControls handleLocation={handleLocation} roomData={roomData}/>
        </div>
    )
}

export default GameDisplay