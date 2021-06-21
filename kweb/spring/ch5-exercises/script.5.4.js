const tryLevelUp = () => {
    for(let i = 0; i <= 9999; i++){ // 모든 setInterval clea
        clearInterval(i);
    }
    document.getElementById('start-btn').innerText = 'Restart';

    const level = document.getElementById('current-level');
    const attempts = document.getElementById('attempts');
    const bar = document.getElementById('gauge-bar');
    const levelUpProb = [1.00, 0.60, 0.36, 0.22, 0.13, 0.08, 0.05, 0.03, 0.02, 0.01];

    let curLevel = 0;
    let numAttempts = 0;
    
    let tryloop = setInterval(() => {
        numAttempts++;

        if(Math.random() < levelUpProb[curLevel]){
            curLevel++;
        }
        bar.style.width = curLevel * 10 + '%';
        attempts.innerText = String(numAttempts);
        level.innerText = String(curLevel);

        if(curLevel === 10){
            clearInterval(tryloop);
        }
    }, 50);
}