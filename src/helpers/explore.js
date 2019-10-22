/* eslint-disable no-loop-func */
import axioswithAuth from './axioswithAuth'
import axios from 'axios';


import { Queue, Stack } from './utilities'
// Exploration algorithm would go here?

let production_url = 'https://lambda-treasure-hunt.herokuapp.com/api/adv'
let heroku_url = 'https://treasurebuildweek.herokuapp.com'


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


    while (/*Object.keys(graph).length*/ abc < 5) {
        console.log("in while")
        // Start of movement
        await sleep(cooldown * 1000)
        let response = await axioswithAuth().get('/init/')
        
        let rawRoomdata = response.data
        console.log("rrd", rawRoomdata)
        
        let possible_moves = []

        cooldown = rawRoomdata.cooldown
        console.log("cooldown", cooldown)

        let currentRoom = {
            room_id: rawRoomdata.room_id,
            title: rawRoomdata.title,
            description: rawRoomdata.description,
            coordinates: rawRoomdata.coordinates,
            elevation: rawRoomdata.elevation,
            terrain: rawRoomdata.terrain,
        }

        // if current room isn't in graph
        if (!graph[currentRoom.room_id]) {
            graph[currentRoom.room_id] = {}
            rawRoomdata.exits.forEach(element => { 
                currentRoom[element] = 999
                graph[currentRoom.room_id][element] = 999
            })
        }

        if (prevRoom !== null && prevRoom.room_id !== null && prevMove !== null && prevRoom.room_id !== currentRoom.room_id) {
            // send post to update room directions
            // POST '/api/rooms/' currentRoom
            // PUT '/api/rooms/' ?currentRoom= ,previousRoom= ,previousDirection= ,

            axios.post(`${heroku_url}/api/rooms/`, currentRoom)
            // eslint-disable-next-line no-loop-func
            .then(res => {
                console.log(res)
                axios.put(`${heroku_url}/api/rooms?previousRoom=${prevRoom.room_id}&currentRoom=${currentRoom.room_id}&previousDirection=${prevMove}`)
                .then(res => {
                    console.log('Move updated.')
                    console.log(res)
                })
                .catch(error => {
                    console.log("error1", error)
                    console.error(error)
                })
            })
            .catch(error => {
                console.log("error2", error)
                console.error(error)
            })
        } else if (prevRoom === null) {
            axios.post(`${heroku_url}/api/rooms/`, currentRoom)
            // eslint-disable-next-line no-loop-func
            .then(res => {
                console.log("First room posted!")
            })
            .catch(error => {
                console.log("error2", error)
                console.error(error)
            })
        }

        // console.log(graph)
        // console.log(currentRoom)
        // console.log(graph[currentRoom.room_id])

        if (graph[currentRoom.room_id].n === 999 || graph[currentRoom.room_id].s === 999 || graph[currentRoom.room_id].w === 999 || graph[currentRoom.room_id].e === 999) {
            deadend = false
        } else {
            deadend = true
        }

        if (deadend === false) {
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
            console.log("cooldown2", cooldown)
            prevRoom = currentRoom
            prevMove = move
        }               
        // if we are at a deadend, we need to look for the closest room with an unexplored route in our map. 
        abc += 1
    }
}

 

    //     #if we are at a deadend, what do we do? We backtrack, and find the closest room with an unexplored route
    //     else:
    //         #use BFS to find the closest room with unexplored route. Will return a list of roomIDs
    //         route = bfs(graph, currentRoom)

    //         # because the route doesn't actually move us, we can simply move towards the rooms designated in
    //         # it in order to keep adding to our traversalPath
    //         if route is not None:
    //             # take off the first room (which is the current one)
    //             route.pop(0)
    //             for room in route:
    //                 moved = False
    //                 # print('Inside: ', player.currentRoom.id)
    //                 # print('Looking for: ', room)
    //                 for direction in graph[player.currentRoom.id]:
    //                     if moved is False:
    //                         # print('ROOM to', direction, 'IS: ', graph[player.currentRoom.id][direction])
    //                         if graph[player.currentRoom.id][direction] is room:
    //                             # print('MOVING ', direction, 'TO ROOM: ', graph[player.currentRoom.id][direction])
    //                             prevMove = direction
    //                             prevRoom = player.currentRoom.id
    //                             traversalPath.append(direction)
    //                             player.travel(direction)
    //                             # print('new current room after travel: ', player.currentRoom.id)
    //                             moved = True


export default explore