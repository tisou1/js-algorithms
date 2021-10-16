import LinkedList from "../linked-list/LinkedList.js";

export default class Stack {
    constructor(){
        this.LinkedList = new LinkedList()
    }
    /**
     * @return {boolean}
     */
    isEmpty() {
        return !this.LinkedList.head
    }

    /**
     * 
     * @returns {*}
     */
    peek(){
        if(this.isEmpty()){
            return null
        }
        
        return this.LinkedList.head.value
    }

    /**
     * 
     * @param {*} value 
     */
    push(value) {
        this.LinkedList.prepend(value)
    }

    /**
     * 
     * @returns {*}
     */
    pop() {
        const removeHead = this.LinkedList.deletehead()
        return removeHead ? removeHead.value : null
    }

    /**
     * 
     * @returns {*[]}
     */
    toArray(){
        return this.LinkedList.toArray().map(LinkedListNode => LinkedListNode.value)
    }

    /**
     * 
     * @param {function} callback 
     * @returns {string}
     */
    toString(callback){
        return this.LinkedList.toString(callback)
    }
}