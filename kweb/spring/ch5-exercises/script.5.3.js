const changeBoxColor = () => {
    let boxes = document.getElementsByClassName('box');
    let box2 = boxes[1];
    
    let letters = '0123456789ABCDEF'.split('');
    let color = '#'; // 16진수 컬러

    for (let i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }

    box2.style.backgroundColor = color;
};
