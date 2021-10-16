import DoublyLinkedListNode from "./DoublyLinkedListNode.js";
import Comparator from '../../utils/comparator/Comparator.js'

export default class DoublyLinkedList {
    /**
     * 
     * @param {Function} comparatorFunction 
     */
    constructor(comparatorFunction) {
        /**@var DoublyLinkedListNode */
        this.head = null

        /**@var DoublyLinkedListNode */
        this.tail = null

        this.compare = new Comparator(comparatorFunction)
    }


    /**
     * @param {*} value
     * @return {DoublyLinkedList}
     * 头插
     */
    prepend(value) {
        //创建头结点
        const newNode = new DoublyLinkedListNode(value, this.head)

        if (this.head) {
            this.head.previous = newNode
        }
        this.head = newNode

        if (!this.tail) {
            this.tail = newNode
        }

        return this
    }

    /**
     * 
     * @param {*} value 
     * @returns {DoublyLinkedList}
     */
    append(value) {
        const newNode = new DoublyLinkedListNode(value)

        //不存在头结点的话, 直接设置为头结点
        if (!this.head) {
            this.head = this.tail = newNode
            return this
        }

        //插入到尾部,tail.next指向新创的节点
        this.tail.next = newNode
        //新节点的previous指向tail
        newNode.previous = this.tail
        //tail后移
        this.tail = newNode

        return this
    }

    /**
     * 
     * @param {*} value 
     * @returns {DoublyLinkedListNode}
     */
    delete(value) {
        if (!this.head) {
            return null
        }

        let deleteNode = null
        let currentNode = this.head

        while (currentNode) {
            if (this.compare.equal(currentNode.value, value)) {
                deleteNode = currentNode

                if (deleteNode === this.head) {
                    //如果头结点要删除的话,head后移

                    this.head = deleteNode.next

                    //设置新的头结点previous为null
                    if (this.head) {
                        this.head.previous = null
                    }

                    //删除尾结点的话
                    if (deleteNode === this.tail) {
                        this.tail = null
                    }
                } else if (deleteNode === this.tail) {
                    //要删除尾结点的话
                    this.tail = deleteNode.previous
                    this.tail.next = null
                } else {
                    //如果中间节点要被删除
                    const previousNode = deleteNode.previous
                    const nextNode = deleteNode.next

                    previousNode.next = nextNode
                    nextNode.previous = previousNode
                }
            }

            currentNode = currentNode.next
        }

        return deleteNode
    }

     /**
     * @param {Object} findParams
     * @param {*} findParams.value
     * @param {function} [findParams.callback]
     * @return {DoublyLinkedListNode}
     */
    find({ value = undefined, callback = undefined }) {
        if (!this.head) {
            return null
        }

        let currentNode = this.head

        while (currentNode) {
            //制定了回调函数,则通过回调函数寻找
            if (callback && callback(currentNode.value)){
                return currentNode
            }

            //未指定回调函数,则通过value寻找
            if(value !== undefined && this.compare.equal(currentNode.value, value)){
                return currentNode
            }

            currentNode = currentNode.next
        }

        return null
    }

    /**
     * 
     * @returns {DoublyLinkedLinkNode}
     */
    deleteTail() {
        if(!this.tail){
            return null
        }

        if(this.head === this.tail){
            const deleteTail = this.tail
            this.head = this.tail = null
            
            return deleteTail
        }

        const deleteTail = this.tail

        //新的tail指向前一个节点
        this.tail = this.tail.previous
        this.tail.next = null

        return deleteTail
    }

    /**
     * 
     * @returns  {DoublyLinkedLinkNode}
     */
    deleteHead(){
        if(!this.head){
            return null
        }

        const deleteHead = this.head

        if(this.head.next){
            //新的头结点指向下一个
            this.head = this.head.next
            this.head.previous = null
        } else {
            this.head = this.tail = null
        }
     
        return deleteHead
    }

    /**
     * 
     * @returns {DoublyLinkedLinkNode[]}
     */
    toArray() {
        const nodes = []
        let currentNode = this.head

        while(currentNode){
            nodes.push(currentNode)
            currentNode = currentNode.next
        }

        return nodes
    }

    /**
     * @param {*[]} values - Array of values that need to be converted to linked list.
     * @return {DoublyLinkedList}
     */
    fromArray(values){
        values.forEach(value => this.append(value))
        return this
    }

    /**
     * 
     * @param {function} callback 
     * @returns {string}
     */
    toString(callback){
        return this.toArray().map(node => node.toString(callback).toString())
    }

    reverse(){
        let currNode = this.head
        let prevNode = null
        let nextNode = null

           // while(currNode){
        //     //保存下一次的节点
        //     nextNode = currNode.next
        //     currNode.next = preNode

        //     preNode = currNode
        //     currNode = nextNode
        // }
        //1.头插法翻转
        // const newNode = new DoublyLinkedListNode(null)
        // while(currNode){
        //     nextNode = currNode.next
        //     prevNode = currNode.previous
        //     currNode.next = newNode.next
        

        //     currNode.next = newNode.next
        //     //由于是双链表,需要特殊判断一下当前节点的前一个节点存不存在
        //     if(prevNode){
        //         prevNode.previous = currNode//
        //     }
        //     newNode.next = currNode
        //     currNode.previous = newNode

        //     prevNode = currNode
        //     currNode = nextNode
        // }

        while(currNode){
            //2.就地反转
            nextNode = currNode.next
            prevNode = currNode.previous

            currNode.next = prevNode
            currNode.previous = nextNode

            prevNode = currNode
            currNode = nextNode
        }

        this.tail = this.head
        this.head = prevNode

        return this
    }
}