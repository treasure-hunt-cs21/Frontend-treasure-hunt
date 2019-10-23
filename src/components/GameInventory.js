import React, { useState, useEffect } from 'react';

import axioswithAuth from '../helpers/axioswithAuth'

import './styles.scss'

/**
 * curl -X POST -H 'Authorization: Token xxxxxxxxxx' 
 * -H "Content-Type: application/json" https://lambda-treasure-hunt.herokuapp.com/api/adv/status/
 * 
 * 
 * 
 * {
  "name": "br80",
  "cooldown": 2.0,
  "encumbrance": 2,  // How much are you carrying?
  "strength": 10,  // How much can you carry?
  "speed": 10,  // How fast do you travel?
  "gold": 400,
  "inventory": ["Small Treasure"],
  "status": [],
  "errors": [],
  "messages": []
}


curl -X GET -H 'Authorization: Token 7a375b52bdc410eebbc878ed3e58b2e94a8cb607'
 https://lambda-treasure-hunt.herokuapp.com/api/bc/get_balance/

 {
   "cooldown": 1.0,
   "messages": ["You have a balance of 35.0 Lambda Coins"],
   "errors": []
}
 */

function GameInventory(props) {
    const [stats, setStats] = useState({})
    const [coins, setCoins] = useState('')

    const updateStatus = e => {
        e.preventDefault()
        axioswithAuth().post('/status/')
        .then(results => {
            console.log("Updating Status")
            console.log(results.data)
            setStats(results.data)
        })
    }

    const updateLambdaCoins = e => {
        e.preventDefault()
        axioswithAuth().get('https://lambda-treasure-hunt.herokuapp.com/api/bc/get_balance/')
        .then(results => {
            console.log(results.data)
            // setCoins(results.data.messages)
        })
    }
    
    return (
        <div className="game-inventory">
            <button onClick={updateStatus}> Check Status</button>
            <p> Strength: { stats.strength ? stats.strength : ''}</p>
            <p> Encumbrance: {stats.encumbrance ? stats.encumbrance : ''}</p>
            <p> Speed: {stats.speed ? stats.speed : ''}</p>

            <p> Gold: {stats.gold ? stats.gold : ''}</p>

            <div className="lambda-coins-display"> 
                <button onClick={updateLambdaCoins}
                className="lambda-coin-update-btn"> 
                    Check Lambda Coins
                </button>
                <p> Lambda Coin: {coins ? coins : ''} </p>

            </div>
        </div>
    )
}

export default GameInventory;