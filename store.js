if(document.readyState == 'loading'){
    document.addEventListener('DOMContentLoaded', ready);
}else{
    ready();
}

function ready(){

    var rmvBtn = document.getElementsByClassName('btn-danger');
    for(let i = 0; i < rmvBtn.length; i++){
        var button = rmvBtn[i];
        button.addEventListener('click', removeCartItem)
    }

    var quantityInput = document.getElementsByClassName('cart-quantity-input');
    for(let i = 0; i < quantityInput.length; i++){
        var input = quantityInput[i];
        input.addEventListener('change', quantityChanged);
    }

    var addtoCartBtns = document.getElementsByClassName('shop-item-btn')
    for(let i = 0; i < addtoCartBtns.length; i++){
        var button  = addtoCartBtns[i];
        button.addEventListener('click', addtoCart);
    }

    document.getElementsByClassName('btn-purchase')[0].addEventListener('click', purchase);

}

function purchase(){
    alert('Thank you for your purchase!');
    var cartItems = document.getElementsByClassName('cart-items')[0];
    while(cartItems.hasChildNodes())
    {
        cartItems.removeChild(cartItems.firstChild);
    }
    updateCartTotal();
}

function removeCartItem(event){
    var buttonClicked = event.target;
    buttonClicked.parentElement.parentElement.remove();
    updateCartTotal();
}

function quantityChanged(event){
    var input = event.target;
    if(isNaN(input.value) || input.value <= 0)
    {
        input.value = 1;
    }
    updateCartTotal();
}

function addtoCart(event){
    var button = event.target;
    var shopItem = button.parentElement.parentElement;
    var title = shopItem.getElementsByClassName('shop-item-title')[0].innerText;
    var price = shopItem.getElementsByClassName('shop-item-price')[0].innerText;
    var img = shopItem.getElementsByClassName('shop-item-img')[0].src;
    addItemtoCart(title, price, img);
    updateCartTotal();
}

function addItemtoCart(title, price, img){
    var cartRow = document.createElement('div');
    cartRow.classList.add('cart-row');
    var cartItems = document.getElementsByClassName('cart-items')[0];
    var cartItemNames = cartItems.getElementsByClassName('cart-item-title');
    for(let i = 0; i < cartItemNames.length; i++)
    {
        if(cartItemNames[i].innerText == title)
        {
            alert('This item has already been added to the cart');
            return;
        }
    }
    var cartContent = 
    `        
    <div class="cart-item cart-column">
        <img class="cart-item-img" src="${img}" width="100" height="100">
        <span class="cart-item-title">${title}</span>
    </div>
    <span class="cart-price cart-column">${price}</span>
    <div class="cart-quantity cart-column">
        <input class="cart-quantity-input" type="number" value="1">
        <button class="btn btn-danger cart-quantity-btn" role="button">REMOVE</button>
    </div>
    `
    cartRow.innerHTML=cartContent;
    cartItems.append(cartRow);
    cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem);
    cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change',quantityChanged);
}

function updateCartTotal(){
    var cartItemContainer = document.getElementsByClassName('cart-items')[0];
    var cartRows = cartItemContainer.getElementsByClassName('cart-row');
    var total = 0;
    for(let i = 0; i < cartRows.length; i++){
        var cartRow = cartRows[i];
        var cartPrice = cartRow.getElementsByClassName('cart-price')[0];
        var cartQuantity = cartRow.getElementsByClassName('cart-quantity-input')[0];
        var price = parseFloat(cartPrice.innerText.replace('$', ''));
        var quantity = cartQuantity.value;
        total += price*quantity;
    }
    total = Math.round(total*100) / 100;
    document.getElementsByClassName('cart-total-price')[0].innerText = '$'+total;
}

