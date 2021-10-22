import Sort from '../Sort.js'

//冒泡排序
export default class BubbleSort extends Sort {
    //重写Sort的sort方法
    sort(originalArray) {
        //标记交换是否发生
        let swapped = false

        const array = [...originalArray]

        for (let i = 1; i < array.length; i++) {
            swapped = false

            this.callbacks.visitingCallback(array[i])

            for (let j = 0; j < array.length - i; j++) {
                this.callbacks.visitingCallback(length[j])

                //交换元素并标记
                if (this.comparator.lessThan(array[j + 1], array[j])) {
                    [array[j], array[j + 1]] = [array[j + 1], array[j]]
                    swapped = true
                }
            }

            if (!swapped) {
                return array
            }
        }

        return array
    }
}


//shift + option + f