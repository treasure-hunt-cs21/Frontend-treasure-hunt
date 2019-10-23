class Queue {
    constructor() {
        this.queue = []
    }

    enqueue(ele) {
        this.queue.push(ele)
    }

    dequeue() {
        if (this.queue.length > 0) {
            return this.queue.shift()
        }
        else {
            return null
        }
    }
    size() {
        return this.queue.length
    }
}

class Stack {
    constructor() {
        this.stack = []
    }

    push(ele) {
        this.stack.push(ele)
    }

    pop() {
        if (this.stack.length > 0) {
            return this.stack.pop()
        }
       else {
           return null
       }
    }

    size() {
        return this.stack.length
    }
}

export {
    Queue,
    Stack,
}