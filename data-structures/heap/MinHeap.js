import Heap from "./Heap.js";


export default class MinHeap extends Heap{
    // 检查一对堆元素的顺序是否正确。
    // * 对于MinHeap，第一个元素必须总是较小或相等。
    // * 对于MaxHeap来说，第一个元素必须总是更大或相等。
    /**
     * 
     * @param {*} firstElement 
     * @param {*} secondElement 
     * @returns {booleab}
     */
    pairIsInCorrectorder(firstElement, secondElement){
        return this.compare.lessThanOrEqual(firstElement, secondElement)
    }
}