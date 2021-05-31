const calcTimesTable = number => {
    let table = '\n';
    for(let i = 1; i <= 9; i++){
        result = number * i;
        table += number + ' * ' + i + ' = ' + result + '\n';
    }
    return table;
}

const displayTimes = () => {
    // 1~9 구구단 출력
    let number = Number(document.getElementById('number').value);
    let result = document.getElementById('times-result');
    
    if(1 <= number && number <= 9 && Number.isInteger(number)){
        // 구구단 계산
        let table = calcTimesTable(number);
        result.innerText = table;
    }
    else{
        result.innerText = 'Input Error!';
    }
};


