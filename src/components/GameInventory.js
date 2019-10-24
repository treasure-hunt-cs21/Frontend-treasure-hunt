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
    const [coins, setCoins] = useState('')
    let count = 0
    const updateLambdaCoins = e => {
        e.preventDefault()
        axioswithAuth().get('https://lambda-treasure-hunt.herokuapp.com/api/bc/get_balance/')
        .then(results => {
            console.log(results.data)
            // setCoins(results.data.messages)
        })
    }
    
    // async function sellAllHandler() {
    //     console.log(props.stats.inventory)
    //     for (let i = 0; i < props.stats.inventory.length; i++) {
    //         if (i === 0) {
    //             props.sellItem(props.stats.inventory[i])
    //         } else {
    //             setTimeout(() => props.sellItem(props.stats.inventory[i]), i * 8500)
    //         }
    //     }
    // }

    return (
        <div className="player-status">
            <button onClick={props.updateStatus}> Check Status</button>
            <p> Strength: { props.stats.strength ? props.stats.strength : ''}</p>
            <p> Encumbrance: {props.stats.encumbrance ? props.stats.encumbrance : ''}</p>
            <p> Speed: {props.stats.speed ? props.stats.speed : ''}</p>
            <p> Gold: {props.stats.gold ? props.stats.gold : ''}</p>
            <div className="player-inventory">
                Currently Carrying:
                {/* {props.stats.inventory ? <button onClick={sellAllHandler}> Sell All</button> : null} */}
                <ul>
                    {props.stats.inventory ? props.stats.inventory.map(item =>
                    {
                        count++
                        return (<div key={count}>
                            <li> {item} </li>
                            <button onClick={e => props.dropItem(item)}>Drop Item</button>
                            <button onClick = {e => props.sellItem(item)}>Sell Item</button> </div>
                        )}) : 'Nothing!'}
                </ul>
                </div>
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


// {props.stats.items ? 
//     `Items: ${props.stats.inventory.map(item => 
//         { 
//             return (
//                 <div>
//                     {item}
//                     <button onClick={e => props.dropItem(e, item)}>Drop</button>
//                     <button onClick={e => props.sellItem(e, item)}>sell</button>
//                 </div>
//             )
//         })}` 
//     : 
//     ''}

{/* <div className="player-inventory">
                Currently Carrying:
                <ul>
                    {stats}
                </ul>
</div> */}