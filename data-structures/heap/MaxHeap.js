import Heap from "./Heap.js";


export default class MaxHeap extends Heap{
     /**
   * 检查一对堆元素的顺序是否正确。
   * 对于MinHeap，第一个元素必须总是较小或相等。
   * 对于MaxHeap来说，第一个元素必须总是大的或相等的。
   对于MaxHeap来说，第一个元素必须总是大于或等于。*
    /**
     * 
     * @param {*} firstElement 
     * @param {*} secondElement 
     * @returns 
     */
    pairIsInCorrectorder(firstElement, secondElement){
        return this.compare.greaterThanOrEqual(firstElement, secondElement)
    }
}