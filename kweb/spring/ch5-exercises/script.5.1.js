const setRandomBgColor = () => {
    let colorBox = document.getElementById('color-box');
    let letters = '0123456789ABCDEF'.split('');
    let color = '#'; // 16진수 컬러

    for (let i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }

    colorBox.style.backgroundColor = color;
};
