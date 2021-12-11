// Find Elements
const addBtns = document.querySelectorAll('button');
const emptyCart = document.querySelector('.empty');
const cart = document.querySelector('.cart-summary');
const finalCost = document.querySelector('.totals');
const subTotals = document.querySelector('.subtotal');
const tax = document.querySelector('.tax');
const total = document.getElementById('final-cost');

let taxRate = .0975 //Tax Rate for TN
const getLocation = () => {

}
// let currentLocation = getCurrentPosition();
// console.log('GEO:', currentLocation)
let subTotal = 0;
let inCart = [];
emptyCart.style = 'display: block';

function addToCart(pos) {
    let arrPos = pos -1
    // Set Variables
    let plateBtn = addBtns[arrPos];

    if (plateBtn.className === 'add') {
        // Set Attributes
        plateBtn.className = 'in-cart';
        plateBtn.innerHTML = `
            <img src="./images/check.svg" alt="Check">
            In Cart
            ` 
        cartBuild(arrPos);
    } else {
        // Set Attributes
        plateBtn.className = 'add';
        plateBtn.innerText = 'Add to Cart'; 
    }
    
}

function cartBuild(item) {
    console.log('Cart Build', menuItems[item]);
    emptyCart.style = 'display: none';

    let newItem = menuItems[item];
    let name = newItem.name;
    let price = Number((newItem.price / 100).toFixed(2));
    let plate = newItem.image;
    let alt = newItem.alt;
    let count = newItem.count + 1;
    inCart.push(newItem);
    console.log('Cart', inCart)

    // Create Build
    inCart.map(i => {
        console.log(i);
        let li = document.createElement('li');
        let thisPlate = document.createElement('div');
        let img = document.createElement('img');
        let qty = document.createElement('div');
        let content = document.createElement('div');
        let title = document.createElement('p');
        let cost = document.createElement('p');
        let qty_wrap = document.createElement('div');
        let decrease = document.createElement('button');
        let neg = document.createElement('img');
        let increase = document.createElement('button');
        let plus = document.createElement('img');
        let sub = document.createElement('div');

        //Attributes:
        thisPlate.className = 'plate';
        img.src = `./images/${plate}`;
        img.alt = alt;
        img.className = 'plate';
        qty.innerText = count;
        qty.className = 'quantity';
        content.className = 'content';
        title.className = 'menu-item';
        title.innerText = name;
        cost.className = 'price';
        cost.innerText = `$${price}`;
        qty_wrap.className = 'quantity__wrapper';
        decrease.className = 'decrease';
        // decrease.setAttribute('onClick', #);
        neg.src = './images/chevron.svg';
        increase.className = 'increase';
        // decrease.setAttribute('onClick', #);
        plus.src = './images/chevron.svg';
        sub.className = 'subtotal';
        sub.innerText = `$${price * count}`;

        //Set
        thisPlate.appendChild(img);
        thisPlate.appendChild(qty);
        content.appendChild(title);
        content.appendChild(cost);
        qty_wrap.appendChild(decrease);
        qty_wrap.appendChild(qty);
        qty_wrap.appendChild(increase);
        decrease.appendChild(neg);
        increase.appendChild(plus);
        li.appendChild(thisPlate);
        li.appendChild(content);
        li.appendChild(qty_wrap);
        li.appendChild(sub);
        // cart.appendChild(li);
        cart.insertBefore(li, finalCost);

        // console.log(inCart);
    })

    subTotal += price;
    theBill()
}

function theBill() {
    console.log('The Bill',subTotals);
    
    subTotals.innerText = subtotal.toFixed(2);
    let applyTax = sub * taxRate;
    tax.innerText = applyTax.toFixed(2);
    total.innerText = (subTotal + applyTax).toFixed(2);

}
