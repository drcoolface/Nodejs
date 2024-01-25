function reverseString(str) {
    var newString = "";
    for (var i = str.length - 1; i >= 0; i--) {
        newString += str[i];
    }
    return newString;
}
function fact(n){
    if (n == 0)
        return 1;
    else
        return n * fact(n-1);
}
function checkPalindrome(string) {

    const len = string.length;
    for (let i = 0; i < len / 2; i++) {
        if (string[i] !== string[len - 1 - i]) {
            return 'It is not a palindrome';
        }
    }
    return 'It is a palindrome';
}
function longestWord(string) {
    let words = string.split(' ');
    let longest;

    for (let i = 0; i < words.length; i++) {
        if (!longest || words[i].length > longest.length) {
            longest = words[i];
        }
    }

    return longest;
}
function fizzBizz(){
    for (var i=1;i<=100;i++){
        if(i%3==0 && i%5==0){
            console.log(i , " is multiple of 3, 5")
        }
        else if(i%3==0){
            console.log(i , " is multiple of 3")

        }
        else if(i%5==0){
            console.log(i , " is multiple of 5")
        }
    }
}
function sumArray(a, b){
    return a+b
}
function sumArray(a){
    var sum = 0
    for (i=0;i<a.length;i++){
        sum +=a[i]
    }
    return sum
    // console.log(arr.reduce((accumulator,currentValue)=>accumulator+currentValue))

}
function capitalize(sentence){
    words = sentence.split(' ')
    for (let i in words) {
        words[i] = words[i][0].toUpperCase() + words[i].slice(1);
    }
    let capitalizedSentence = words.join(" ");
    return capitalizedSentence
}
function vowelCounter(string){
    var count =0;
    vowels = ['a','e','i','o','u']
    for (let i=0; i<string.length;i++){
        if( vowels.includes(string[i].toLowerCase())){
            count+=1;
        }
    }
    return count
}
function fibonacci(n){
    if (n<=1){
        return n
    }
   
    else{
        return (n-1) + fibonacci(n-2)
    }
}
function anagramChecker(sent1, sent2){
    sent1 = sent1.toLowerCase()
    sent2 = sent2.toLowerCase()
    const a = sent1.split("").sort().join("");
    const b = sent2.split("").sort().join("");
    return (a===b)
}
function findMissingNumber(nums) {
    const n = nums.length;
    const expectedSum = (n * (n + 1)) / 2;
    const actualSum = nums.reduce((sum, num) => sum + num, 0);
    return expectedSum - actualSum;
}
function removeDuplicates(a){
    b = new Set(a)
    return (Array.from(b))
}
function power(x,n){
   return x**n
}
function mergeSortedArrays(arr1, arr2) {
    let mergedArray = [];
    let i,j = 0;
    while (i < arr1.length && j < arr2.length) {
        if (arr1[i] < arr2[j]) {
            mergedArray.push(arr1[i]);
            i++;
        } else {
            mergedArray.push(arr2[j]);
            j++;
        }
    }

    // Add remaining elements from arr1
    while (i < arr1.length) {
        mergedArray.push(arr1[i]);
        i++;
    }

    // Add remaining elements from arr2
    while (j < arr2.length) {
        mergedArray.push(arr2[j]);
        j++;
    }

    return mergedArray;
}
function findSecondLargest(array){
    array.sort()
    return array[array.length-2]
}
 function reverseWords(sentence){
    words = sentence.split(' ')
    return words.reverse()
 }
 function emailValidation(email){
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email)
}
function intersectionArray(arr1, arr2){
    return( arr1.filter(value=> arr2.includes(value)))
}
function bracketBalancer(string) 
{ 
    let stack = []; 
    for(let i = 0; i < string.length; i++) 
    { 
        let x = string[i]; 
        if (x == '(' || x == '[' || x == '{') 
        { 
            stack.push(x); 
        } 
        if (stack.length == 0) 
            return false; 
              
        let check; 
        switch (x){ 
        case ')': 
            check = stack.pop(); 
            if (check == '{' || check == '[') 
                return false; 
            break; 
  
        case '}': 
            check = stack.pop(); 
            if (check == '(' || check == '[') 
                return false; 
            break; 
  
        case ']': 
            check = stack.pop(); 
            if (check == '(' || check == '{') 
                return false; 
            break; 
        } 
    } 
  
    return (stack.length == 0); 
} 
  

