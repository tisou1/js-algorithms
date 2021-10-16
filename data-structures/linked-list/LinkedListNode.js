export default class LinkedListNode {
    constructor(value, next = null){
        this.value = value
        this.next = next
    }

    toString(callback = null){
        return callback ? callback(this.value) : `${this.value}`
    }
}