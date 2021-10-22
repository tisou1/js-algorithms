
/**
 * 
 * @param {number} number 
 * @returns {number}
 * 
 返回数字的二进制表示法中使用的比特数。

 */
export default function bitLength(number){
    let bitsCounter = 0

    while((1 << bitsCounter) <= number){
        bitsCounter += 1
    }

    return bitsCounter
}