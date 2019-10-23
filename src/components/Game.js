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
            graph[room.room_id]['n'] = room.n
            graph[room.room_id]['s'] = room.s
            graph[room.room_id]['e'] = room.e
            graph[room.room_id]['w'] = room.w
        })
        setMap(graph)
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
        axioswithAuth().post('/move/', {"direction": direction})
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
        e.preventDefault();
        console.log('Item picked');
        axioswithAuth().post('/take/', {"name": item})
            .then(res => {
                setCooldown(res.data.cooldown).then(() => {
                    sleep(cooldown * 1000)
                    updateStatus()
                })
            })
            .catch(error => {
                console.error(error)
            })
    }
    const dropItem = (e, item) => {
        e.preventDefault();
        console.log('Item dropped');
        axioswithAuth().post('/drop/', {"name": item})
            .then(res => {
                setCooldown(res.data.cooldown).then(() => {
                    sleep(cooldown * 1000)
                    updateStatus()
                })
            })
            .catch(error => {
                console.error(error)
            })
    }
    const sellItem = (e, item) => {
        e.preventDefault();
        console.log('Selling item');
        axioswithAuth().post('/sell/', {"name": item})
            .then(res => {
                setCooldown(res.data.cooldown).then(() => {
                    sleep(cooldown * 1000)
                    axioswithAuth().post('/sell/', {"name": item, "confirm": "yes"})
                    .then(res => {
                        // Check this res
                        setCooldown(res.data.cooldown).then(() => {
                            sleep(cooldown * 1000)
                            updateStatus()
                        })
                    })
                    .catch(error => {
                        console.error(error)
                    })
                })
            })
            .catch(error => {
                console.error(error)
            })
    }
    const updateStatus = e => {
        e.preventDefault()
        axioswithAuth().post('/status/')
        .then(results => {
            console.log("Updating Status")
            console.log(results.data)
            setStats(results.data).then(() => {
                setCooldown(results.data.cooldown)
            })
        })
    }
    return (
        <div className="game-display"> 
            <button onClick={handleExplore}> explore </button>
            <GameScreen roomData={roomData} cooldown={cooldown}/>
            <GameControls pickItem={pickItem} handleMove={handleMove} handleLocation={handleLocation} roomData={roomData}/>
            <GameInventory sellItem={sellItem} dropItem={dropItem} stats={stats} updateStatus={updateStatus} cooldown={cooldown} setCooldown={setCooldown}/>
        </div>
    )
}
export default GameDisplay