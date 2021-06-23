const itemPrice = {
    apple: 700,
    orange: 800,
    lemon: 900
};
const items = document.getElementsByClassName('item');
const btnList = document.getElementsByClassName('add-to-cart');
const cost = document.getElementById('cost');

let totalPrice = 0;

for(let btn of btnList){
    btn.addEventListener('click', event => {
        let fruit = event.target.parentElement.parentElement.id
        totalPrice += itemPrice[fruit];
        cost.innerText = String(totalPrice);
    })
}

