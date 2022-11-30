const sliderBlock = document.querySelector('.wrapper');

const items = [
    {name: 'Duboeuf Fleurie',
    year: '2019',
    type: "Red",
    price: "25.99",
    shortDescription: "This Fleurie has been made from Gamay grapes and carefully selected for the finesse and elegance of its floral, fruity aromas",
    bigDescripton: "This Fleurie has been made from Gamay grapes and carefully selected for the finesse and elegance of its floral, fruity aromas. A delightful wine, best served at 15°C with poultry, lamb or cheese. From an 17th century family of winegrowers, Georges Dubœuf has striven since 1964 to come up with the best wines in the Beaujolais and Mâcon to reveal the essence of the finest terroirs from each appellation. Wine of France.",
    img: "https://images.vivino.com/thumbs/BvIQYm7tTPqqS-P9bmy1gQ_pb_x600.png"},
    {name: 'Antica Mountain',
    year: '2019',
    type: "White",
    price: "25.99",
    shortDescription: "From an Italian family with 26 generations of collective wine expertise, this balanced Napa Chardonnay gets the grape just right (at the right price)",
    bigDescripton: "A refined wine, with vibrant acidity backing the ripe apple, pear, and white peach notes. Hints of tropical fruit emerge midpalate, leading to a finish that shows savory richness. Pastry notes linger on the long, rich finish, revealing concentrated minerality and buttery nuances.",
    img: "https://images.vivino.com/thumbs/ydGlFfsOSbufwipWV6isoA_pb_x600.png"},
    {name: 'Johanna Cabernet Sauvignon',
    year: '2019',
    type: "Red",
    price: "22.99",
    shortDescription: "Cabs at this price barely exist anymore – and when you buy a case, the deal gets even better. Bring home a modern cult classic with St. Clement's 2019 release, sourced from vineyards neighboring the much pricier Helena Dakota & Peter Michael",
    bigDescripton: "Cabs at this price barely exist anymore – and when you buy a case, the deal gets even better. Bring home a modern cult classic with St. Clement's 2019 release, sourced from vineyards neighboring the much pricier Helena Dakota & Peter Michael", 
    img: "https://images.vivino.com/thumbs/8_tSgt9bT-qUf7gFYBveNw_pb_x600.png"},
    {name: 'Valpolicella Ripasso Superiore',
    year: '2019',
    type: "Red",
    price: "25.99",
    shortDescription: "Sassicaia Winemaking Alum Teams Up With Valpolicella Legend Giusti! Take Home This Dream Team’s 2019 Ripasso Red for 46% Off the Normal Bottle Price With This Offer!",
    bigDescripton: "The grapes are vinified in a traditional way in the first week of October in stainless steel tanks. In February the wine is fermented on the skins of the Amarone grapes according to the ancient technique of 'Ripasso'. Following subsequent aging in oak barrels for a period of about 12 months and aged in bottle for at least 6 months before being marketed.",
    img: "https://images.vivino.com/thumbs/Ntlt7aAET2KdWO386kGttQ_pb_x600.png"},
]

items.forEach(item => {
    const descriptionBlock = document.createElement('div');
    descriptionBlock.classList.add('description-block');

    const leftBlock = document.createElement('div');
    leftBlock.classList.add('left-block');
    descriptionBlock.appendChild(leftBlock);

    const descriptionBlockHeader = document.createElement('div');
    descriptionBlockHeader.classList.add('description-block__header');
    descriptionBlockHeader.innerText = `${item.type} Wine`;
    leftBlock.appendChild(descriptionBlockHeader);

    const headerFrontImage = document.createElement('img');
    headerFrontImage.classList.add('header-front-image');
    headerFrontImage.src = item.img;
    leftBlock.appendChild(headerFrontImage);

    const rightBlock = document.createElement('div');
    rightBlock.classList.add('right-block');
    descriptionBlock.appendChild(rightBlock);

    const rightBlockHeader = document.createElement('div');
    rightBlockHeader.classList.add('right-block__header');
    rightBlockHeader.innerText = item.name;
    rightBlock.appendChild(rightBlockHeader);

    const rightBlockDescription = document.createElement('p');
    rightBlockDescription.classList.add('right-block__description');
    rightBlockDescription.innerText = item.bigDescripton;
    rightBlock.appendChild(rightBlockDescription);

    sliderBlock.appendChild(descriptionBlock);
})

const btnNext = document.querySelector('.icon-arrow-right');
const btnPrevious = document.querySelector('.icon-arrow-left');
const slides = document.querySelectorAll('.description-block');
let a = sliderBlock.offsetWidth;
let itemCounter = 0;

function makeClone() {
    cloneFirst = slides[0].cloneNode(true);
    cloneLast = slides[slides.length-1].cloneNode(true);
    sliderBlock.appendChild(cloneFirst);
    sliderBlock.insertBefore(cloneLast, slides[0]);
    sliderBlock.style.transition = 'none';
    // sliderBlock.style.transform = `translateX(-${sliderBlock.offsetWidth}px)`;
    sliderBlock.style.transform = `translateX(-100%)`;
}

makeClone();

function addListenerNext() {
    let slideWidth = document.querySelector('.description-block').offsetWidth;
    sliderBlock.style.transition = 'none';
    a = slideWidth;
    sliderBlock.style.transform = `translateX(-${a}px)`;
    btnNext.addEventListener('click', nextScroll);

}

function addListenerPrevious() {
    let slideWidth = document.querySelector('.description-block').offsetWidth;
    sliderBlock.style.transition = 'none';
    a = slideWidth * slides.length;
    sliderBlock.style.transform = `translateX(-${a}px)`;
    btnPrevious.addEventListener('click', previousScroll);
}

function nextScroll() {
    itemCounter++;
    sliderBlock.style.transition = 'all 1s ease';
    let slideWidth = document.querySelector('.description-block').offsetWidth;
    a += slideWidth;
    sliderBlock.removeEventListener('transitionend', addListenerNext);
    sliderBlock.removeEventListener('transitionend', addListenerPrevious);

    if (a == slideWidth * (slides.length+1)) {
        itemCounter = 0;
        btnNext.removeEventListener('click', nextScroll);
        sliderBlock.addEventListener('transitionend', addListenerNext);
    } 

    sliderBlock.style.transform = `translateX(-${a}px)`;

    addInfoToLeft();
}

function previousScroll() {
    itemCounter--;
    sliderBlock.style.transition = 'all 1s ease';
    let slideWidth = document.querySelector('.description-block').offsetWidth;
    a -= slideWidth;
    sliderBlock.removeEventListener('transitionend', addListenerPrevious);
    sliderBlock.removeEventListener('transitionend', addListenerNext);

    if (a == 0) {
        itemCounter = items.length-1;
        btnPrevious.removeEventListener('click', previousScroll);
        sliderBlock.addEventListener('transitionend', addListenerPrevious);
    }

    sliderBlock.style.transform = `translateX(-${a}px)`;
    addInfoToLeft()   
}

function addInfoToLeft() {
    document.querySelector('.price-block__header').textContent = items[itemCounter].name;
    document.querySelector('.price-block__subheader').textContent = items[itemCounter].year + " " + items[itemCounter].type;
    document.querySelector('.price-block__price').textContent = "$" + items[itemCounter].price;
    document.querySelector('.price-block__description').textContent = items[itemCounter].shortDescription;
}

btnNext.addEventListener('click', nextScroll);

btnPrevious.addEventListener('click', previousScroll);

const btnAddToCart = document.querySelector('.price-block__button');
const btnOpenCart = document.querySelector('.main').querySelector('.cart-block');
const btnBackToMenu = document.querySelector('.back-to-menu');
const cartWindow = document.querySelector('.payment');

btnOpenCart.addEventListener('click', () => {
    cartWindow.style.display = 'block';
    cartWindow.style.borderRadius = '0';
    cartWindow.style.width = "100%";
    cartWindow.style.height = "100%";

    cartWindow.addEventListener('transitionend', () => {
        cartWindow.style.overflow = "auto";
    })
})

btnBackToMenu.addEventListener('click', () => {
    cartWindow.style.borderRadius = '25px';
    cartWindow.style.height = "0";
})

btnAddToCart.addEventListener('click', () => {
    createCartItem(itemCounter);
    calculateTotal();
    
})

let b = 0;
function calculateTotal() {
    const cartArray = Array.from(document.querySelectorAll('.list__item'));

    document.querySelector('.item-counter__value-items').textContent = Array.from(document.querySelectorAll('.list__item')).length;
    document.querySelector('.items-number').textContent = Array.from(document.querySelectorAll('.list__item')).length;
    document.querySelector('.main').querySelector('.items-number').textContent = Array.from(document.querySelectorAll('.list__item')).length;

    const subtotalAmount = document.querySelector('.item-counter__value-subtotal');
    
    cartArray.forEach(item => {
        const itemPrice = item.querySelector('.item__price').innerText;
        const price = itemPrice.slice(1);
        b += +price;
    })
    subtotalAmount.innerText = "$" + b.toFixed(2);

    document.querySelector('.amount-counter').innerText = "$" + b.toFixed(2);
    document.querySelector('.main').querySelector('.amount-counter').innerText = "$" + b.toFixed(2);

    const pakcagingCost = document.querySelector('.item-counter__value-packaging').innerText;
    const pakcagingCostValue = +pakcagingCost.slice(1);

    const totalAmount = +b.toFixed(2) + +pakcagingCostValue;
    document.querySelector('.item-counter__value_total').innerText = "$" + totalAmount.toFixed(2);
}

const selectField = document.querySelector('.select-field_packaging');
selectField.addEventListener('change', (event) => {
    
    let pakcagingCost = document.querySelector('.item-counter__value-packaging');
    let eventValue = event.target.value;
    let eventValueFixed = +eventValue;
    pakcagingCost.innerText = "$" + eventValueFixed.toFixed(2);

    let subtotalValue = document.querySelector('.item-counter__value-subtotal').innerText;
    subtotalValue = subtotalValue.slice(1);
    subtotalValue = +subtotalValue;
    
    const totalAmount = +eventValueFixed.toFixed(2) + +subtotalValue.toFixed(2);
    document.querySelector('.item-counter__value_total').innerText = "$" + totalAmount.toFixed(2);
})

function createCartItem(a) {
    const cartList = document.querySelector('.cart__list');

    const listItem = document.createElement('div');
    listItem.classList.add('list__item');
    cartList.appendChild(listItem);

    const iconCross = document.createElement('img');
    iconCross.classList.add('icon-cross');
    iconCross.src = "https://cdn-icons-png.flaticon.com/512/2961/2961937.png";
    listItem.appendChild(iconCross);

    const itemIcon = document.createElement('img');
    itemIcon.classList.add('item__icon');
    itemIcon.src = items[a].img;
    listItem.appendChild(itemIcon);

    const itemHeaderBlock = document.createElement('div');
    itemHeaderBlock.classList.add('item__header-block');

    const itemAboveHeader = document.createElement('p');
    itemAboveHeader.classList.add('item__above-header');
    itemAboveHeader.innerText = items[a].type + ' ' + 'Wine';
    itemHeaderBlock.appendChild(itemAboveHeader);

    const itemHeader = document.createElement('p');
    itemHeader.classList.add('item__header');
    itemHeader.innerText = items[a].name;
    itemHeaderBlock.appendChild(itemHeader);

    listItem.appendChild(itemHeaderBlock);

    const qtyCounter = document.createElement('p');
    qtyCounter.classList.add('item__qty-counter');
    qtyCounter.innerText = "1 ea";
    listItem.appendChild(qtyCounter);

    const itemPrice = document.createElement('p');
    itemPrice.classList.add('item__price');
    itemPrice.innerText = "$" + items[a].price;
    listItem.appendChild(itemPrice);

    iconCross.addEventListener('click', () => {
        cartList.removeChild(listItem);
        calculateTotal();
    })
}

const inputFieldSplit = document.querySelector('.field_split');
inputFieldSplit.addEventListener('change', calculatePerPerson);

function calculatePerPerson(e) {
    e.preventDefault;
    let fieldSplitValue = e.target.value;
    fieldSplitValue = +fieldSplitValue;
    
    if (!Number.isInteger(fieldSplitValue) || fieldSplitValue == 0) {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Please enter only an integer number',
          })
        return;
    } 

    let subtotalAmount = document.querySelector('.item-counter__value-subtotal').innerText;
    subtotalAmount = subtotalAmount.slice(1);
    subtotalAmount = +subtotalAmount;   
    
    let packagingCost = document.querySelector('.item-counter__value-packaging').innerText;
    packagingCost = packagingCost.slice(1);
    packagingCost = +packagingCost;
    
    const subtotalPerPerson = document.querySelector('.item-counter__value_cost-per-person');
    const subtotalPerPersonCalculated = subtotalAmount/fieldSplitValue;
    subtotalPerPerson.innerText = "$" + subtotalPerPersonCalculated.toFixed(2);

    const packagingCostPerPerson = document.querySelector('.item-counter__value_packaging-per-person');
    const packagingCostPerPersonCalculated = packagingCost/fieldSplitValue;
    packagingCostPerPerson.innerText = "$" + packagingCostPerPersonCalculated.toFixed(2);

    const totalPerPerson = document.querySelector('.item-counter__total-per-person');
    const totalPerPersonCalculated = +packagingCostPerPersonCalculated.toFixed(2) + +subtotalPerPersonCalculated.toFixed(2);
    totalPerPerson.innerText = "$" + totalPerPersonCalculated;

    blocksArray = Array.from(document.querySelector('.split-block_perPerson').querySelectorAll('.item-counter-block'));
    blocksArray.forEach(item => {
        
        item.style.height = "auto";
        item.style.borderBottom = "1px solid rgb(200, 200, 200)";
    })
    blocksArray[blocksArray.length-1].style.border = "none";
}
