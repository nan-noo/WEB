var fs = require('fs');

/*
//readFileSync
console.log('A');
var result = fs.readFileSync('syntax/sample.txt', 'utf-8');
console.log(result);
console.log('C');
// ABC
*/

//readFile
console.log('A');
fs.readFile('syntax/sample.txt', 'utf-8', (err, result) => {
    console.log(result);
});
console.log('C');
// ACB -> B 출력 전에 C를 실행, asynchronous