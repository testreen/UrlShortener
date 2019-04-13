/**
 * Make sure each character is encoded into 3 digits
 * @param  {[type]} n [description]
 * @param  {[type]} w [description]
 * @return {[type]}   [description]
 */
function zeroPad(n, w){
    while(n.toString().length<w) n = '0' + n;
    return n;
}

/**
 * Reduces array size by concatenating into 15 digit integers
 * @param  {[type]} nums [description]
 * @return {[type]}      [description]
 */
function reduceArray(nums){
    var arr = [];
    var temp = '';
    for(var i=0; i < nums.length; i++){
      temp += zeroPad(nums[i].toString(),3);
      if(temp.length > 14){
        arr.push(temp);
        temp = '';
      }
    }
    return arr;
}

/**
 * Encodes string to array of base 10 integers to avoid rounding, based on:
 * https://stackoverflow.com/questions/21613942/encode-string-into-decimal-digits-javascript
 * @return {Integer} Integer hash of string
 */
export function toNumbers(s){
    var nums = [];
    for(var i=0; i<s.length; i++) {
        nums.push(zeroPad(s.charCodeAt(i), 3));
    }

    return reduceArray(nums);
}

/**
 * Returns decoded string from array of base 10 integers
 * @param  {[type]} nums [description]
 * @return {[type]}      [description]
 */
export function fromNumbers(nums){
    var s = '';
    for(var i=0; i<nums.length; i++){
        s += String.fromCharCode(nums[i]);
    }
    return s;
}
