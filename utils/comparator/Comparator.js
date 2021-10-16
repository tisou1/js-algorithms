export default class Comparator{
    /**
     * @param 
     */

    constructor(compareFunction){
        this.compare = compareFunction || Comparator.defaultCompareFunction
    }

    /**
     * @param {string | number} a
     * @param {string | number} b
     * @return {number}
     */
    static defaultCompareFunction(a, b){
        if(a === b){
            return 0
        }

        return a < b ? -1 : 1
    }

    /**
     * @param {*} a
     * @param {*} b
     * @return {boolean}
     * 等于
     */
    equal(a, b){
        return this.compare(a, b) === 0
    }
    /**
     * 
     * @param {*} a 
     * @param {*} b 
     * @returns 
     * 小于
     */
    lessThan(a, b){
        return this.compare(a, b) < 0
    }

    /**
     * 
     * @param {*} a 
     * @param {*} b 
     * @returns 
     * 大于
     */
    greaterThan(a, b){
        return this.compare(a, b) > 0
    }

    /**
     * 
     * @param {*} a 
     * @param {*} b 
     * @returns 
     * 小于等于
     */
    lessThanOrEqual(a, b){
        return this.lessThan(a, b) || this.equal(a, b)
    }

    /**
     * 
     * @param {*} a 
     * @param {*} b 
     * @returns 
     * 大于等于
     */
    greaterThanOrEqual(a, b){
        return this.greaterThan(a, b) || this.equal(a ,b)
    }

    /**
     *反转比较的次序
     */
    reverse(){
        const compareOriginal = this.compare
        this.compare = (a, b) => compareOriginal(b, a)
    }
}