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
            graph[room.room_id]['n'] = room.n
            graph[room.room_id]['s'] = room.s
            graph[room.room_id]['e'] = room.e
            graph[room.room_id]['w'] = room.w
        })
        setMap(graph)

        updateStatus()
        sleep(1000)
        handleLocation()
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
    const handleExplore = e => {
        e.preventDefault()
        explore()
    }
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
    const pickItem = (e, item) => {
        console.log('Item picked');
        axioswithAuth().post('/take/', {"name": item})
            .then(res => {
                console.log(res)
                setCooldown(res.data.cooldown)
                sleep(1000)
                updateStatus()
            })
            .catch(error => {
                console.error(error)
            })
    }
    const dropItem = (e, item) => {
        console.log('Item dropped');
        axioswithAuth().post('/drop/', {"name": item})
            .then(res => {
                setCooldown(res.data.cooldown)
                sleep(2000)
                updateStatus()
            })
            .catch(error => {
                console.error(error)
            })
    }
    const sellItem = (e, item) => {
        console.log('Selling item');
        axioswithAuth().post('/sell/', {"name": item})
            .then(res => {
                console.log('Confirming Item Sale.')
                sleep(1000)
                axioswithAuth().post('/sell/', {"name": item, "confirm": "yes"})
                    .then(res => {
                        console.log('Item Sold.')
                        console.log(res.data)
                        setCooldown(res.data.cooldown)
                        sleep(1000)
                        updateStatus()
                    })
                    .catch(error => {
                        console.error(error)
                    })
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