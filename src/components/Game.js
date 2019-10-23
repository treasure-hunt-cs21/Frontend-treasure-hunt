import React, { useState, useEffect } from 'react';
import axios from 'axios';

import axioswithAuth from '../helpers/axioswithAuth';

import explore from '../helpers/explore'

import GameScreen from './GameScreen'
import GameControls from './GameControls'
import GameInventory from './GameInventory'

import './styles.scss'

function GameDisplay(props) {
    const [roomData, setroomData] = useState({});
    const [cooldown, setCooldown] = useState(0);
    // const [graph, setGraph] = useState([]);

    useEffect(() => {
        // axioswithAuth().get('/init/')
        // .then(res => {
        //     console.log(res)
        //     setroomData(res.data)
        //     setCooldown(res.data.cooldown)
        // })
        // .catch(err => {
        //     console.error(err)
        // })
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
            <GameScreen roomData={roomData} cooldown={cooldown}/>
            <GameControls handleLocation={handleLocation} roomData={roomData}/>
            <GameInventory cooldown={cooldown} setCooldown={setCooldown}/>
        </div>
    )
}

export default GameDisplay