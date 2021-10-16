import Comparator from '../../utils/comparator/Comparator.js'

//最大堆和最小堆的父类

export default class Heap {
    /**
     * @constructor Heap
     * @param {Function} comparatorFunction 
     */
    constructor(comparatorFunction){
        //通过new关键字构造函数
        if(new.target === Heap){
            throw new TypeError('Cannot construct Heap instance directly')
        }

        this.heapContainer = []
        this.compare = new Comparator(comparatorFunction)
    }

    /**
     * 
     * @param {number} parentIndex 
     * @returns {number}
     */
    getLeftChildIndex(parentIndex){
        return 2 * parentIndex + 1
    }

    /**
     * 
     * @param {number} parentIndex 
     * @returns {number}
     */
    getRightChildIndex(parentIndex){
        return 2 * parentIndex + 2
    }

    /**
     * 
     * @param {nuber} childIndex 
     * @returns {number}
     */
    getParentIndex(childIndex){
        return Math.floor((childIndex - 1) / 2)
    }

    /**
     * 
     * @param {number} childIndex 
     * @returns {boolean}
     */
    hasParent(childIndex){
        return this.getParentIndex(childIndex) >= 0
    }

    /**
     * 
     * @param {number} parentIndex 
     * @returns {boolean}
     */
    hasLeftChild(parentIndex){
        return this.getLeftChildIndex(parentIndex) < this.heapContainer.length
    }

    /**
     * 
     * @param {number} parentIndex 
     * @returns {boolean}
     */
    hasRightChild(parentIndex){
        return this.getRightChildIndex(parentIndex) < this.heapContainer.length
    }

    /**
     * 
     * @param {number} parentIndex 
     * @returns {*}
     */
    leftChild(parentIndex){
        return this.heapContainer[this.getLeftChildIndex(parentIndex)]
    }

    /**
     * 
     * @param {number} parentIndex 
     * @returns {*}
     */
    rightChild(parentIndex){
        return this.heapContainer[this.getRightChildIndex(parentIndex)]
    }

    /**
     * 
     * @param {*} childIndex 
     * @returns {*}
     */
    parent(childIndex){
        return this.heapContainer[this.getParentIndex(childIndex)]
    }

    /**
     * 
     * @param {number} indexOne 
     * @param {number} indexTwo 
     */
    swap(indexOne, indexTwo){
        [this.heapContainer[indexOne], this.heapContainer[indexTwo]] = 
        [this.heapContainer[indexTwo], this.heapContainer[indexOne]]
    }

    /**
     * 
     * @returns {*}
     */
    peek(){
        if(this.heapContainer.length === 0){
            return null
        }

        return this.heapContainer[0]
    }

    /**
     * 
     * @returns {*}
     */
    poll(){
        if(this.heapContainer.length === 0){
            return null
        }

        if(this.heapContainer.length === 1){
            return this.heapContainer.pop()
        }
        const item = this.heapContainer[0]

        this.heapContainer[0] = this.heapContainer.pop()
        this.heapifyDown()

        return item
    }

    /**
     * 
     * @param {*} item 
     * @returns {Heap}
     */
    add(item){
        this.heapContainer.push(item)
        this.heapifyUp()
        return this
    }

    /**
     * 
     * @param {*} item 
     * @param {Comparator} comparator 
     * @returns {Heap}
     */
    remove(item, comparator = this.compare){
        // 查找要删除的项目数量。
        const numberOfItemToRemove = this.find(item, comparator).length

        for(let iteration = 0; iteration < numberOfItemToRemove; iteration += 1){
             // 我们需要在每次删除后找到要删除的项目索引，因为
        // 每次heapify过程后，指数都会被改变。
            const indexToRemove = this.find(item, comparator).pop()

              // 如果我们需要删除堆中的最后一个孩子，那么只需删除它。
      // 事后不需要对堆进行堆化。
            if(indexToRemove === (this.heapContainer.length - 1)){
                this.heapContainer.pop()
            } else {
                this.heapContainer[indexToRemove] = this.heapContainer.pop()

                //获取父元素
                const parentItem = this.parent(indexToRemove)

                   // 如果没有父节点或父节点与节点的顺序正确的话
                 // 我们要删除，那么就向下堆积。否则向上堆积。

                if(
                    this.hasLeftChild(indexToRemove)
                    && (
                        !parentItem || this.pairIsInCorrectorder(parentItem, this.heapContainer[indexToRemove])
                    )
                ){
                    this.heapifyDown(indexToRemove)
                } else {
                    this.heapifyUp(indexToRemove)
                }
            }
        }

        return this
    }

    /**
     * 
     * @param {*} item 
     * @param {Comparator} comparator 
     * @returns {number[]}
     */
    find(item, comparator = this.compare){
        const foundItemIndices = []
        for(let itemIndex = 0; itemIndex < this.heapContainer.length; itemIndex += 1){
            if(comparator.equal(item, this.heapContainer[itemIndex])){
                foundItemIndices.push(itemIndex)
            }
        }

        return foundItemIndices
    }

    /**
     * 
     * @returns {boolean}
     */
    isEmpty(){
        return !this.heapContainer.length
    }
    /**
     * 
     * @returns {string}
     */
    toString(){
        return this.heapContainer.toString()
    }

    /**
     * 
     * @param {number} customStartIndex 
     */
    heapifyUp(customStartIndex){
         // 取最后一个元素（数组中的最后一个或树中的左下角
    // 并把它抬起来，直到它相对于它的父元素处于正确的位置。
    // 顺序，直到它相对于它的父元素处于正确的位置。

        let currendIndex = customStartIndex || this.heapContainer.length - 1

        while(this.hasParent(currendIndex) 
            && !this.pairIsInCorrectorder(this.parent(currendIndex), this.heapContainer[currendIndex])){

            this.swap(currendIndex, this.getParentIndex(currendIndex))
            currendIndex = this.getParentIndex(currendIndex)
        }
    }

    /**
     * 
     * @param {number} customStartIndex 
     */
    heapifyDown(customStartIndex = 0){
         // 比较父元素和它的子元素，并将父元素与适当的子元素交换。
    // 子元素（最小的子元素为MinHeap，最大的子元素为MaxHeap）。
    // 对交换后的子元素做同样的处理。
        
        let currentIndex = customStartIndex
        let nextIndex = null

        while(this.hasLeftChild(currentIndex)){
            if(this.hasRightChild(currentIndex)
               &&this.pairIsInCorrectorder(this.rightChild(currentIndex), this.leftChild(currentIndex))){

                nextIndex = this.getRightChildIndex(currentIndex)
               } else {
                   nextIndex = this.getLeftChildIndex(currentIndex)
               }
            
            if(this.pairIsInCorrectorder(this.heapContainer[currentIndex], this.heapContainer[nextIndex])){
                break
            }


            this.swap(currentIndex, nextIndex)
            currentIndex = nextIndex
        }
    }

    
  /**
   * Checks if pair of heap elements is in correct order.
   * For MinHeap the first element must be always smaller or equal.
   * For MaxHeap the first element must be always bigger or equal.
   *
   * @param {*} firstElement
   * @param {*} secondElement
   * @return {boolean}
   * 大小堆 会重写这个方法
   */
  /* istanbul ignore next */
  pairIsInCorrectorder(firstElement, secondElement){
      throw new Error(
        `
        You have to implement heap pair comparision method
        for ${firstElement} and ${secondElement} values.
      `
      )
  }
}