/**
 * Make sure each character is encoded into 3 digits
 * @param  {String|Integer} n String or Integer to be padded
 * @param  {Integer} w Desired length of String or Integer
 * @return {String}   Padded string
 */
function zeroPad(n, w) {
  while (n.toString().length < w) n = "0" + n;
  return n;
}

/**
 * Reduces array size by concatenating 3 digit integers into 15 digit integer strings
 * @param  {Array} nums Initial array of 3 digit integers or strings
 * @return {Array}      As many arrays as possible concatenated into integer strings of length 15
 */
function reduceArray(nums) {
  var arr = [];
  var temp = "";
  for (var i = 0; i < nums.length; i++) {
    temp += zeroPad(nums[i].toString(), 3);
    if (temp.length > 14) {
      arr.push(temp);
      temp = "";
    }
  }
  if (temp != "") {
    arr.push(temp);
  }
  return arr;
}

/**
 * Encodes string to array of base 10 integers to avoid rounding, based on:
 * https://stackoverflow.com/questions/21613942/encode-string-into-decimal-digits-javascript
 * @return {Integer} Array of encoded strings into integers with desired length 15 digits.
 */
export function toNumbers(s) {
  var nums = [];
  for (var i = 0; i < s.length; i++) {
    nums.push(zeroPad(s.charCodeAt(i), 3));
  }
  return reduceArray(nums);
}

/**
 * Returns decoded string from array of base 10 integers
 * @param  {Array} nums Encoded integer array
 * @return {String}      String of decoded integers into characters
 */
export function fromNumbers(nums) {
  var s = "";

  for (var i = 0; i < nums.length; i++) {
    // Make sure padding is correct
    while(nums[i].toString().length % 3 != 0){
      nums[i] = zeroPad(nums[i].toString(),nums[i].toString().length + 1);
    }
    for (var j = 0; j < nums[i].toString().length; j += 3) {
      s += String.fromCharCode(nums[i].toString().substring(j, j + 3));
    }
  }
  return s;
}
