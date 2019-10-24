import React, { useState, useEffect } from 'react';

import axioswithAuth from '../helpers/axioswithAuth'

import './styles.scss'

function GameInventory(props) {
    const [coins, setCoins] = useState('')
    let count = 0
    const updateLambdaCoins = e => {
        e.preventDefault()
        axioswithAuth().get('https://lambda-treasure-hunt.herokuapp.com/api/bc/get_balance/')
        .then(results => {
            let coin_string = results.data.messages
            // console.log(coin_string[0].match(/(\d+)/g)[0])
            setCoins(coin_string[0].match(/(\d+)/g)[0])
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