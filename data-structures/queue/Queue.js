import LinkedList from "../linked-list/LinkedList";

export default class Queue {
    constructor(){
        this.LinkedList = new LinkedList()
    }
    
    /**
     * 
     * @returns {Boolean} 
     */
    isEmpty(){
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
     * @param {*}
     */
    enqueue(value){
        //尾部放入队列
        this.LinkedList.append(value)
    }

    /**
     * 
     * @returns {*}
     */
    dequeue(){
        //头部删除节点
        const removedHead = this.LinkedList.deletehead()
        return removedHead ? removedHead.value : null
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