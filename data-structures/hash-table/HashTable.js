import LinkedList from '../linked-list/LinkedList.js'
// 散列表的大小直接影响到碰撞的数量。
// 散列表的大小越大，你得到的碰撞就越少。
// 为了演示，哈希表的大小很小，以显示碰撞的情况。
// 是如何被处理的。

const defaultHashTableSize = 32

export default class HashTable {

    constructor(hashTableSize = defaultHashTableSize){
        //创建一定大小的哈希表，用空链表填充每个桶。
        this.buckets = Array(hashTableSize).fill(null).map(()=>new LinkedList())

        // 只是为了快速跟踪所有的实际按键。
        this.keys = {}
    }

    /**
     * 
     * @param {string} key 
     * @returns {number}
     */
    hash(key){
    // 为简单起见，我们将只使用键的所有字符的字符编码之和
    // 来计算哈希值。
    //
    // 但你也可以使用更复杂的方法，如多项式字符串哈希，以减少
    // 碰撞的数量。
    //
    // hash = charCodeAt(0) * PRIME^(n-1) + charCodeAt(1) * PRIME^(n-2) + ... + charCodeAt(n-1)
    //
    // 其中charCodeAt(i)是密钥的第i个字符代码，n是密钥的长度，并且
    // PRIME是任何素数，如31。

        const hash = Array.from(key).reduce(
            (hashAccumulator, keySymbol) => (hashAccumulator + keySymbol.charCodeAt(0)),
            0,
        )
        
        //减少散列号，使之符合散列表的大小
        return hash % this.buckets.length
    }

    /**
     * 
     * @param {string} key 
     * @param {*} value 
     */
    set(key, value){
        const keyHash = this.hash(key)
        this.keys[key] = keyHash
        const bucketLinkedList = this.buckets[keyHash]
        const node = bucketLinkedList.find({callback: nodeValue => nodeValue.key === key})

        if(!node){
            // Insert new node.
            bucketLinkedList.append({key, value})
        } else {
            //Update value of existing node
            node.value.value = value
        }
    }

    /**
     * 
     * @param {string} key 
     * @returns {*}
     */
    delete(key){
        const keyHash = this.hash(key)
       delete this.keys[keyHash]
       const bucketLinkedList = this.buckets[keyHash]
       const node = bucketLinkedList.find({callback:nodeValue => nodeValue.key === key})

       if(node){
           return bucketLinkedList.delete(node.value)
       }

       return null
    }

    /**
     * 
     * @param {string} key 
     * @returns {*}
     */
    get(key){
        const bucketLinkedList = this.buckets[this.hash(key)]
        const node = bucketLinkedList.find({callback: nodeValue => nodeValue.key === key})

        return node ? node.value.value : undefined
    }

    /**
     * 
     * @param {string} key 
     * @returns {boolean}
     */
    has(key){
        return Object.hasOwnProperty.call(this.keys, key)
    }

    /**
     * 
     * @returns {string[]}
     */
    getKeys(){
        return Object.keys(this.keys)
    }

    /**
     * 
     * @returns {*[]}
     */
    getValus(){
        return this.buckets.reduce((values, bucket) => {
            const bucketValues = bucket.toArray()
                .map(LinkedListNode => LinkedListNode.value.value)
            return values.concat(bucketValues)
        },[])
    }
}

