import Comparator from '../../utils/comparator/Comparator.js'


export default class Sort {

    /**
     * @typedef {Object} SorterCallbacks
     * @property {function(a: *, b: *)} compareCallback - 如果提供，那么所有元素的比较
     * 将通过这个回调完成。
     * @property {function(a: *)} visitingCallback -  如果提供，它将在每次排序时被调用。
     * 函数访问下一个元素时都会调用。
     */
    constructor(originalCallbacks) {
        this.callbacks = Sort.initSortingCallbacks(originalCallbacks)
        this.comparator = new Comparator(this.callbacks.compareCallback)
    }

    /**
     * 
     * @param {SorterCallbacks} originalCallbacks 
     * @returns {SorterCallbacks}
     */
    static initSortingCallbacks(originalCallbacks) {
        const callbacks = originalCallbacks || {}
        const stubCallback = () => { }


        callbacks.compareCallback = callbacks.compareCallback || undefined
        callbacks.visitingCallback = callbacks.visitingCallback || stubCallback

        return callbacks
    }

    sort() {
        throw new Erroor('sort methd must be implemented')
    }
}