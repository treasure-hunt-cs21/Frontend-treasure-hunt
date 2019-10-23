/* eslint-disable no-loop-func */
import axioswithAuth from './axioswithAuth'
import axios from 'axios';


import { Queue, Stack } from './utilities'
// Exploration algorithm would go here?

let production_url = 'https://lambda-treasure-hunt.herokuapp.com/api/adv'
let heroku_url = 'https://treasurebuildweek.herokuapp.com'
let opp_moves = {'n' : 's', 's' : 'n', 'e': 'w', 'w': 'e'}

// helper function for taking breaks during cooldown
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }


// function bfs(Graph, Room) {

// let queue = new Queue()
// let visited = new Set()
// queue.enqueue([Room])

// while (queue.size() > 0) {
//     let route = queue.dequeue()
//     let room = route[-1]

//     if (visited.has(room) == false) {
//         visited.add(room)

//         //if we haven't visited it, check all it's neighbors
//         for (let direction in graph[room]) {
//             if graph[room][direction] is '?':
//                 return route
            
//             //if it's not ?, it's a possible route to a room with an undiscovered room. Add it to the queue.
//             // else:
//             //     route_copy = route.copy()
//             //     next_room = graph[room][direction]
//             //     route_copy.append(next_room)
//             //     queue.enqueue(route_copy)
//         }   
//         }
//     }
// }

async function explore() {
    
    console.log('exploring')
    let graph = {}
    let traversalPath = []
    let prevRoom = null
    let prevMove = null
    let deadend = false
    let cooldown = 0
    let abc = 0
    let rawRoomdata = {}
    let currentRoom = {}
    
    let graph_response = await axios(`${heroku_url}/api/rooms/`)
    console.log(graph_response.data)
    graph_response.data.forEach(room => {
        graph[room.room_id] = {}
        graph[room.room_id]['n'] = room.n
        graph[room.room_id]['s'] = room.s
        graph[room.room_id]['e'] = room.e
        graph[room.room_id]['w'] = room.w
    })

    // console.log(graph)

    let response = await axioswithAuth().get('/init/')
    rawRoomdata = response.data

    while (Object.keys(graph).length < 200) {
        console.log('==================top of while loop =======================')
        console.log('count is:', abc)
        abc += 1
        // Start of movement
        let possible_moves = []

        cooldown = rawRoomdata.cooldown
        console.log("cooldown", cooldown)
        currentRoom = {
            room_id: rawRoomdata.room_id,
            title: rawRoomdata.title,
            description: rawRoomdata.description,
            coordinates: rawRoomdata.coordinates,
            elevation: rawRoomdata.elevation,
            terrain: rawRoomdata.terrain,
        }

        console.log("currentRoom", currentRoom)
        console.log("prevRoom", prevRoom)
        console.log("prevMove", prevMove)

        // if current room isn't in graph
        if (!graph[currentRoom.room_id]) {
            graph[currentRoom.room_id] = {}
            rawRoomdata.exits.forEach(element => { 
                currentRoom[element] = 999
                graph[currentRoom.room_id][element] = 999
            })
        }

        if (prevRoom !== null && prevRoom.room_id !== null && prevMove !== null && prevRoom.room_id !== currentRoom.room_id) {
            console.log('================== INSIDE BIG CONDITIONAL. =======================')
            // send post to update room directions
            // POST '/api/rooms/' currentRoom
            // PUT '/api/rooms/' ?currentRoom= ,previousRoom= ,previousDirection= ,
            graph[prevRoom.room_id][prevMove] = currentRoom.room_id
            graph[currentRoom.room_id][opp_moves[prevMove]] = prevRoom.room_id

            //Copies.
            let current_copy = {...currentRoom}
            let previous_copy = {...prevRoom}
            let prev_move_copy = prevMove

            // updating local map
            try {
               let resp1 = await axios.post(`${heroku_url}/api/rooms/`, current_copy)
               let resp2 = await axios.put(`${heroku_url}/api/rooms?previousRoom=${previous_copy.room_id}&currentRoom=${current_copy.room_id}&previousDirection=${prev_move_copy}`)
               console.log(resp1)
               console.log(resp2)
            }
            catch (error) {
                console.log('Try-Catch Error')
                console.error(error)
            }
            
        } else if (prevRoom === null && !graph[currentRoom.room_id]) {
            try {
                let response = await axios.post(`${heroku_url}/api/rooms/`, currentRoom)
                console.log(response)
            }
            catch (error) {
                console.error(error)
            }
        }


        if (graph[currentRoom.room_id].n === 999 || graph[currentRoom.room_id].s === 999 || graph[currentRoom.room_id].w === 999 || graph[currentRoom.room_id].e === 999) {
            deadend = false
        } else {
            deadend = true
        }

        if (deadend === false) {
            console.log('================== NOT DEADEND =======================')
            // Find possible moves (moves towards an unexplored room)
            for (let direction in graph[currentRoom.room_id]) {
                if (graph[currentRoom.room_id][direction] === 999) {
                    possible_moves.push(direction)
                }
            }
            
            // Pick a move randomly
            let move = possible_moves[Math.floor(Math.random() * possible_moves.length)]
            traversalPath.push(move)
            // console.log(move)

            // ACTUALLY MOVE?!
            let movement_obj = {
                "direction": `${move}`
            }

            await sleep(cooldown * 1000)
            console.log("before second axios")

            let newResponse = await axioswithAuth().post(`${production_url}/move/`, movement_obj)
            cooldown = newResponse.data.cooldown
            rawRoomdata = newResponse.data
            // console.log("cooldown2", cooldown)
            prevRoom = {...currentRoom}
            prevMove = move
        } else {
            //is a deadend
            console.log('==================DEADEND BLOCK=======================')
            //find closest unexplored room
            let route_to_room = bfs(graph, currentRoom.room_id)
            if (route_to_room) {
                route_to_room.shift()
                console.log('post-shift', route_to_room)
                let moved = false
                while (route_to_room.length > 0) {
                    let room = route_to_room.shift()
                    moved = false
                    console.log('backtrack room', room)
                    for (let direction in graph[currentRoom.room_id]) {
                        if (!moved) {
                            if (graph[currentRoom.room_id][direction] === room) {
                                // console.log('current room ID', currentRoom.room_id)
                                // console.log('target room ID', room)
                                // console.log('Direction', direction)
                            
                                let movement_obj = {
                                    "direction": `${direction}`,
                                    "next_room_id": `${room}`
                                }
                                
                                console.log('cooldown pre-sleep:', cooldown)
                                await sleep(cooldown * 1000)
                                console.log("backtrack room")
                    
                                // move
                                let newResponse = await axioswithAuth().post(`${production_url}/move/`, movement_obj)
                                cooldown = newResponse.data.cooldown
                                console.log('cooldown set: ', cooldown)
                                rawRoomdata = newResponse.data

                                
                                prevMove = direction
                                prevRoom = {...currentRoom}

                                currentRoom = {
                                    room_id: rawRoomdata.room_id,
                                    title: rawRoomdata.title,
                                    description: rawRoomdata.description,
                                    coordinates: rawRoomdata.coordinates,
                                    elevation: rawRoomdata.elevation,
                                    terrain: rawRoomdata.terrain,
                                }
                                moved = true

                                console.log('backtrack - prevRoom', prevRoom)
                                console.log('backtrack - currentRoom', currentRoom)
                            }
                        }
                    }
                }
            }
        } 
    }              
}

function bfs(graph, Room) {

    let queue = new Queue()
    let visited = new Set()
    queue.enqueue([Room])

    while (queue.size() > 0) {
        let route = queue.dequeue()
        let room = route[route.length - 1]

        if (!visited.has(room)) {
            visited.add(room)
            // #if we haven't visited it, check all it's neighbors
            for (let direction in graph[room]) {
                if (graph[room][direction] === 999) {
                    return route
                }
                else {
                    let route_copy = [...route]
                    let next_room = graph[room][direction]
                    route_copy.push(next_room)
                    queue.enqueue(route_copy)
                }   
            }               
        }
    }
}

export default explore


// route_to_room.forEach(async (room) => {
    
// })