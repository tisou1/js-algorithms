

/**
 * 
 * @param {number} number 
 * @returns 
 * 按位与, 最后一位为1即为奇数,为0则为偶数
 */
export default function isEvent(number){
    return (number & 1) === 0
}
