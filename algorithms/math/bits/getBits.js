
/**
 * 
 * @param {number} number 
 * @param {number} bitPosition 
 * @returns {number}
 */
export default function getBit(number, bitPosition){
    return (number >> bitPosition) & 1
}
