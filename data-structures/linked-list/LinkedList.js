import LinkedListNode from "./LinkedListNode.js"
import Comparator from "../../utils/comparator/Comparator.js"

export default class LinkedList {

    /**
     * 
     * @param {Function} comparatorFunction 
     */
    constructor(comparatorFunction){
        /**@var LinkedListNode */
        this.head = null

        /**@var LinkedListNode */
        this.tail = null

        this.compare = new Comparator(comparatorFunction)
    }

   /**
    * 
    * @param {*} value 
    * @returns {LinkedList}
    * 类似于头部放入
    */
    prepend(value){
        //声明一个头结点
        const newNode = new LinkedListNode(value, this.head)
        this.head = newNode

        //如果没有尾节点
        if(!this.tail) {
            this.tail = newNode
        }
        return this
    }

    /**
     * 
     * @param {*} value 
     * @returns {LinkedList}
     */
    append(value) {
        const newNode = new LinkedListNode(value)

        //没有头结点,说明链表中没元素
        if(!this.head){
            this.head = this.tail = newNode
            return this
        }

        //添加新节点到链表的尾部
        this.tail.next = newNode
        this.tail = newNode
        return this
    }


    /**
     * 
     * @param {*} value 
     * @returns {LinkedListNode}
     */
    delete(value) {
        //链表为空,直接返回
        if(!this.head){
            return null
        }

        //临时待删除的节点
        let deleteNode = null

        //删除的节点为头结点的,(找到第一个节点value不等于要删除的value)
        while(this.head && this.compare.equal(this.head.value, value)){
            deleteNode = this.head
            //头结点后移一位
            this.head = this.head.next
        }
        
        let currentNode = this.head

        //检查中间部分
        if(currentNode !== null){

            while(currentNode.next){
                if (this.compare.equal(currentNode.next.value, value)) {
                    deleteNode = currentNode.next
                    currentNode.next = currentNode.next.next
                } else {
                    currentNode = currentNode.next
                }
            }
        }


        //检查尾部是否要删除
        if(this.compare.equal(this.tail.value, value)){
            //删除的话,尾结点指向前一个节点
            this.tail = currentNode
        }

        return deleteNode
    }

    /**
     * 
     * @param {Object} findParams 
     * @param {*} findParams.value
     * @param {Function} [findParams.callback]
     * @returns {LinkedListNode}
     */
    find({value = undefined, callback = undefined}){
        if(!this.head){
            return null
        }
        
        let currentNode = this.head
     
        while(currentNode){
               // 如果指定了回调，则尝试通过回调来寻找节点。
            if(callback && callback(currentNode.value)){
                return currentNode
            }
            
            //单纯的通过value来查找指定的值
            if(value !== undefined && this.compare.equal(currentNode.value, value)){
                return currentNode
            }

            //指针后移
            currentNode = currentNode.next
        }
        return null
    }

    /**
     * @return {LinkedListNode}
     */
    deleteTail() {
        const deleteTail = this.tail

        //首尾相等 说明链表只有一个节点
        if(this.head = this.tail) {
            this.head = this.tail = null
            return deleteTail
        }

        //如果有很多节点在这个链表中
        //倒退到最后一个节点，删除最后一个节点之前的 "下一个 "链接。
        let currentNode = this.head
        while(currentNode.next){
            //到最后一个节点了
            if(!currentNode.next.next){
                currentNode.next = null
            } else {
                currentNode = currentNode.next
            }
        }

        this.tail = currentNode
        
        return deleteTail
    }

    /**
     * 
     * @returns {LinkedListNode}
     */
    deletehead() {
        if(!this.head){
            return null
        }

        const deletehead = this.head

        if(this.head.next){
            this.head = this.head.next
        } else {
            this.head = this.tail = null
        }

        return deletehead
    }

    /**
     * 
     * @param {*[]} valus 
     * @returns {LinkedList}
     * 传入数组值,创建链表
     */
    fromArray(valus) {
        valus.forEach(value => this.append(value))
        return this
    }

    /**
     * 
     * @returns {LinkedList[]}
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
     * 
     * @param {FUnction} callback 
     * @returns {string}
     */
    toString(callback){
        return this.toArray().map(node => node.toString(callback)).toString()
    }


    reverse() {
        let currNode = this.head
        let preNode = null
        let nextNode = null

        // 1.头插法反转
        // const newNode = new LinkedListNode(null)
        // while(currNode){
        //     nextNode = currNode.next
        //     currNode.next = newNode.next

        //     newNode.next = currNode
        //     currNode = nextNode
        // }
        // this.tail = this.head
        // this.head = newNode.next
        //2.就地反转
        while(currNode){
            //存储下一个节点
            nextNode = currNode.next
            //改变当前节点的下一个节点,使其链接到上一个节点
            currNode.next = preNode

            //将prevrNode和currNode节点向前移动一步。
            preNode = currNode
            currNode = nextNode
        }
      

        //重置head和tail
        this.tail = this.head
        this.head = preNode

        return this
    }
}