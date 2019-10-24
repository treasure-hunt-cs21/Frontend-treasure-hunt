import axioswithAuth from './axioswithAuth'
import axios from 'axios'
import { Queue, Stack } from './utilities'

//axios base URLs
let production_url = 'https://lambda-treasure-hunt.herokuapp.com/api/adv'
let heroku_url = 'https://treasurebuildweek.herokuapp.com'


// Helps deal with cooldown
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

// BFS to find route to target room
function bfs(graph, starting_room, target_room) {
    let queue = new Queue()
    let visited = new Set()
    queue.enqueue([starting_room])

    while (queue.size() > 0) {
        let route = queue.dequeue()
        let room = route[route.length - 1]

        if (!visited.has(room)) {
            if (room === target_room) {
                return route
            } else {
                visited.add(room)
                for (let direction in graph[room]) {
                    let route_copy = [...route]
                    let next_room = graph[room][direction]
                    route_copy.push(next_room)
                    queue.enqueue(route_copy)
                }
            }               
        }
    }
}

// Function that will actually take the route and travel to the room.
async function takeItemRoute(graph, starting_room, target_room) {
    console.log("===== Travelling to room =====")
    console.log("Starting location:", starting_room)
    console.log("Target location:", target_room)


    console.log('====== Finding route =======')
    let route_to_take = bfs(graph, starting_room, target_room)
    console.log('Taking route:', route_to_take)

    let cooldown = 7.5
    let currentRoom = starting_room

    if (route_to_take) {
        route_to_take.shift()
        console.log('post-shift', route_to_take)
        let moved = false
        let foundItem = false

        while (route_to_take.length > 0 && !foundItem) {
            let room = route_to_take.shift()
            moved = false
            console.log('Travelling to room:', room)

            for (let direction in graph[currentRoom]) {
                if (!moved && !foundItem) {
                    if (graph[currentRoom][direction] === room) {
                        let movement_obj = {
                            "direction" : `${direction}`,
                            "next_room_id": `${room}`
                        }
                        
                        // console.log('cooldown pre-sleep:', cooldown)
                        await sleep(cooldown * 1000)
                        if (graph[room].terrain === 'MOUNTAIN') {
                            console.log("It's a mountain dumbo. FLY!!")
                            let flyResponse = await axioswithAuth().post(`${production_url}/fly/`, movement_obj)
                            cooldown = flyResponse.data.cooldown
                            currentRoom = flyResponse.data.room_id

                            
                            if (flyResponse.data.items && flyResponse.data.items.length > 0) {
                                console.log('items found in room:', currentRoom)
                                foundItem = true
                            }

                            moved = true
                            console.log('Flew to:', currentRoom)
                        } else {
                            let newResponse = await axioswithAuth().post(`${production_url}/move/`, movement_obj)
                            cooldown = newResponse.data.cooldown
                            currentRoom = newResponse.data.room_id

                            if (newResponse.data.items && newResponse.data.items.length > 0) {
                                console.log('items found in room:', currentRoom)
                                foundItem = true
                            }
                            moved = true
                            console.log('Moved to:', currentRoom)
                        }
                    }
                } 
            }
        }
        if (foundItem === true) {
            console.log(`Stopped because an item is present. Wait for a cooldown of ${cooldown} seconds before proceeding.`)
        } else {
            console.log(`Route to room finished. Please wait ${cooldown} seconds before proceeding.`)
        }
    }   
}

export default takeItemRoute