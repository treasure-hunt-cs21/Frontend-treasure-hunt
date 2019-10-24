import React, { useState, useEffect } from 'react';
import axios from 'axios';
import axioswithAuth from '../helpers/axioswithAuth';
import explore from '../helpers/explore'
import GameScreen from './GameScreen'
import GameControls from './GameControls'
import GameInventory from './GameInventory'
import './styles.scss'

let heroku_url = 'https://treasurebuildweek.herokuapp.com'


function GameDisplay(props) {
    const [roomData, setroomData] = useState({});
    const [cooldown, setCooldown] = useState(0);
    const [stats, setStats] = useState({})
    const [map, setMap] = useState({});


    const sleep = (ms) => {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    useEffect(() => {
        let graph = {}
        console.log("===== Getting map data =====")
        axios.get(`${heroku_url}/api/rooms/`)
        .then(response => {
            console.log(response.data)
            response.data.forEach(room => {
            graph[room.room_id] = {}
            graph[room.room_id]['title'] = room.title
            graph[room.room_id]['terrain'] = room.terrain 
            graph[room.room_id]['n'] = room.n
            graph[room.room_id]['s'] = room.s
            graph[room.room_id]['e'] = room.e
            graph[room.room_id]['w'] = room.w
        })
        setMap(graph)

        updateStatus()
        })
        .catch(err => {
            console.error(err)
            console.log('Error retrieving the map.')
        })
    }, []);


    const handleLocation = e => {
        e.preventDefault();
        console.log('Handling location');
        axioswithAuth().get('/init/')
            .then(res => {
                console.log(res)
                setroomData(res.data);
                setCooldown(res.data.cooldown)
            })
            .catch(error => {
                console.error(error)
            })
    }

    // Was a one time use to store the map in our PG database.
    const handleExplore = e => {
        e.preventDefault()
        explore()
    }

    // Normal movement without dashing/flying
    const handleMove = (e, direction) => {
        e.preventDefault();
        console.log('Moving');
        console.log(roomData)
        axioswithAuth().post('/move/', {"direction": direction,  "next_room_id": `${map[roomData.room_id][direction]}`})
            .then(res => {
                console.log(res)
                setroomData(res.data)
                setCooldown(res.data.cooldown)
            })
            .catch(error => {
                console.error(error)
            })
    }

    // Pick up item
    const pickItem = (e, item) => {
        console.log('Item picked');
        axioswithAuth().post('/take/', {"name": item})
            .then(res => {
                console.log(res)
                setCooldown(res.data.cooldown)
                setTimeout(() => updateStatus(), 7600)
            })
            .catch(error => {
                console.error(error)
            })
    }

    // Drop Item
    const dropItem = (item) => {
        console.log('Item dropped');
        axioswithAuth().post('/drop/', {"name": item})
            .then(res => {
                console.log(res.data)
                setCooldown(res.data.cooldown)
                setTimeout(() => updateStatus(), 7600)
            })
            .catch(error => {
                console.error(error)
            })
    }

    // Sell item to shop. Must be at Shop to sell.
    const sellItem = (item) => {
        console.log('Selling item', item);
        axioswithAuth().post('/sell/', {"name": item})
            .then(res => {
                console.log('Confirming Item Sale.')
                console.log(res.data)
                setTimeout(() => confirmSale(item), 3500)
                })
            .catch(error => {
                console.error(error)
            })
    }

    // Updates player information (not roomData)
    const confirmSale = (item) => {
        console.log('inside confirmSale')
        let confirm_obj = {
            'name': `${item}`,
            'confirm': "yes",
        }

        console.log(confirm_obj)
        axioswithAuth().post('/sell/', confirm_obj)
            .then(res => {
                console.log('Item Sold.')
                console.log(res.data)
                setCooldown(res.data.cooldown)
                setTimeout(() => updateStatus(), 3500)
                })
            .catch(error => {
                console.error(error)
                })
    }

    const updateStatus = e => {
        axioswithAuth().post('/status/')
        .then(results => {
            console.log("Updating Status")
            console.log(results.data)
            setStats(results.data)
            setCooldown(results.data.cooldown)
        })
    }

    return (
        <div className="game-display"> 
            {/* <button onClick={handleExplore}> explore </button> */}
            <GameScreen 
                roomData={roomData} 
                cooldown={cooldown} 
                pickItem={pickItem}/>

            <GameControls 
                pickItem={pickItem} 
                handleMove={handleMove} 
                handleLocation={handleLocation} 
                roomData={roomData} 
                map={map}/>

            <GameInventory 
                sellItem={sellItem} 
                dropItem={dropItem} 
                stats={stats} 
                updateStatus={updateStatus} 
                cooldown={cooldown} 
                setCooldown={setCooldown}/>
        </div>
    )
}
export default GameDisplay