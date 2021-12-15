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
    emptyCart.style = 'display: none';
    let price;

    while(cart.firstChild) {
        cart.removeChild(cart.firstChild);
    }

    // console.log(item)
    if(item != undefined) {

        let newItem = menuItems[item];
        // let price = Number((newItem.price / 100).toFixed(2));
        newItem.count += 1;
        inCart.push(newItem);

        totalUp()
    } else {
        totalUp()
    }
    // console.log('Cart', inCart)

    // Create Build
    function totalUp () {

    inCart.map((i, index) => {
        itemPrice = Number((i.price / 100).toFixed(2));

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
        li.id = `index_${index}`
        thisPlate.className = 'plate';
        img.src = `./images/${i.image}`;
        img.alt = i.alt;
        img.className = 'plate';
        qty.innerText = i.count;
        qty.className = 'quantity';
        qty.id = `count_${index}`;
        content.className = 'content';
        title.className = 'menu-item';
        title.innerText = i.name;
        cost.className = 'price';
        cost.innerText = `$${itemPrice}`;
        qty_wrap.className = 'quantity__wrapper';
        decrease.className = 'decrease';
        decrease.onclick = () => decreaseCount(index);
        neg.src = './images/chevron.svg';
        increase.className = 'increase';
        increase.onclick = () => increaseCount(index);
        plus.src = './images/chevron.svg';
        sub.className = 'subtotal';
        sub.innerText = `$${itemPrice * i.count}`;

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
        cart.appendChild(li);
        // cart.insertBefore(li, finalCost);

        price = itemPrice;

        // console.log('List Item:', li)
        // console.log('Quantity:', index)
        })
    }

    console.log('AFTER CYCLE CART:', inCart)
    // Need to evaluate the total cost depending on the array set.
    subTotal += price;
    theBill()
    console.log(subTotal)
}

function theBill() {
    
    subTotals.innerText = subTotal.toFixed(2);
    let applyTax = subTotal * taxRate;
    tax.innerText = applyTax.toFixed(2);
    total.innerText = (subTotal + applyTax).toFixed(2);

}

// For Plate Count alterations WIP
function increaseCount(index) {
    // console.log('Item Count', inCart[index].count);
    console.log('Item', inCart[index]);
    inCart[index].count++;

    cartBuild();
}

function decreaseCount(index) {
    console.log(index)

    if(inCart[index].count === 1) {
        inCart.splice(index,1);
        const removeItem = document.getElementById(`index_${index}`)
        let btn = addBtns[index];
        btn.className = 'add';
        btn.removeChild(btn.children[0]);
        btn.innerText = 'Add to Cart';

        removeItem.parentNode.removeChild(removeItem);

        cartBuild();

    } else {
        inCart[index].count--;
        cartBuild();
    }
}

/* NOTE: build status
    Fixed issue with mutliposting the same item depending on the length of the array. 
        - Current issues:
            - Adding a count to previous plate when adding a second. (FIXED)
            - Unable to increase/decrease count of single plate. (FIXED)
                - Zero out plates, etc.
                    - Removing item from cart.
                    - Changing button in Menu to "add to cart"
                        - Need to adjust btn not to continue to add to cart after "in cart".
                    - Need to adjust subtotal to reflect removal
                        - Consider if cart becomes empty
            - Adjust subtotals for final bill cost.

            - Cost should probably be set as an array to match index of items.

*/
