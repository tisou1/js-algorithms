import MinHeap from "../heap/MinHeap.js";
import Comparator from "../../utils/comparator/Comparator.js";

export default class PriorityQueue extends MinHeap {
    constructor() {
        //调用小顶堆构造函数
        super()

        this.priorities = new Map()


        this.compare = new Comparator(this.comparePriority.bind(this))
    }


    add(item, priority = 0){
        this.priorities.set(item, priority)
        super.add(item)
        return this
    }

    changePriority(item, priority){
        this.remove(item, new Comparator(this.compareValue))
        this.add(item, priority)

        return this
    }

    find(item){
        return this.find(item, new Comparator(this.compareValue))
    }

    hasValue(item){
        return this.findByValue(item).length > 0
    }

    comparePriority(a, b){
        if(this.priorities.get(a) === this.priorities(b)){
            return 0
        }

        return this.priorities.get(a) < this.priorities.get(b) ? -1 : 1
    }


    compareValue(a, b){
        if(a === b){
            return 0
        }
        return a < b ? -1 : 1
    }

}