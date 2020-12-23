// Toggle menu on Footer
$(document).ready(function(){
    $('.footerInfo-toggle').click(function(){
        $('.footerInfo-item').fadeToggle("slow");
    });
    $('.footerAcc-toggle').click(function(){
        $('.footerAcc-item').fadeToggle("slow");
    });
    $('.footerCatelog-toggle').click(function(){
        $('.footerCatelog-item').fadeToggle("slow");
    });
    
});

// SCROLL TO TOP PAGE
$(window).scroll(function(){
    if ($(this).scrollTop()>100){
        $('#scroll-to-top').css("display","block");
    }
    else{
        $('#scroll-to-top').css("display","none");
    }
        
});
function scrolltop()
{
    
    $('#scroll-to-top').click(function(){
        $('html,body').animate({scrollTop:0},0);
    });
}
// ex-submenu(CDs)
$(document).ready(function(){
    $('#art-btn').click(function(){
        $('.art-sub').fadeToggle("slow");
        $('#art-btn>.fa-chevron-right').fadeToggle(0);
        $('#art-btn>.fa-chevron-down').fadeToggle(0);
    });
    $('#genre-btn').click(function(){
        $('.genre-sub').fadeToggle("slow");
        $('#genre-btn>.fa-chevron-right').fadeToggle(0);
        $('#genre-btn>.fa-chevron-down').fadeToggle(0);
    });
    $('#theme-btn').click(function(){
        $('.theme-sub').fadeToggle("slow");
        $('#theme-btn>.fa-chevron-right').fadeToggle(0);
        $('#theme-btn>.fa-chevron-down').fadeToggle(0);
    });
});
// Filterable Table
$(document).ready(function(){
    $("#myInput").on("keyup", function() {
        var value = $(this).val().toLowerCase();
        $("#myTable tr").filter(function() {
        $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
    });
});











// SHOPPING CART

var shoppingCart = (function(){
    cart = [];
    // Constructor
    function Item(img,name, price, count) {
        this.img=img;
        this.name = name;
        this.price = price;
        this.count = count;
    }
    // Save cart
    function saveCart() {
        sessionStorage.setItem('shoppingCart', JSON.stringify(cart));
    }
      // Load cart
    function loadCart() {
        cart = JSON.parse(sessionStorage.getItem('shoppingCart'));
    }
    if (sessionStorage.getItem("shoppingCart") != null) {
        loadCart();
    }
    
    var obj = {};
    
    // Add to cart
    obj.addItemToCart = function(img,name, price, count) 
    {
        for(var item in cart) 
        {
            if(cart[item].name === name) 
            {
                cart[item].count ++;
                saveCart();
                return;
            }
        }
        var item = new Item(img,name, price, count);
        cart.push(item);
        saveCart();
    }
    // Set count from item
    obj.setCountForItem = function(name, count) 
    {
        for(var i in cart)
        {
            if (cart[i].name === name) 
            {
                cart[i].count = count;
                break;
            }
        }
    }
    // Remove item from cart
    obj.removeItemFromCart = function(name) {
        for(var item in cart) 
        {
            if(cart[item].name === name) 
            {
                cart[item].count --;
                if(cart[item].count === 0) 
                {
                    cart.splice(item, 1);
                }
                break;
            }
        }
        saveCart();
    }
    // Remove all items from cart
    obj.removeItemFromCartAll = function(name) {
        for(var item in cart) 
        {
            if(cart[item].name === name) 
            {
                cart.splice(item, 1);
                break;
            }
        }
        saveCart();
    }
    // Clear cart
    obj.clearCart = function() {
        cart = [];
        saveCart();
    }
    // Count cart 
    obj.totalCount = function() {
        var totalCount = 0;
        for(var item in cart) 
        {
        totalCount += cart[item].count;
        }
        return totalCount;
    }
    // Total cart
    obj.totalCart = function() {
        var totalCart = 0;
        for(var item in cart) {
            totalCart += cart[item].price * cart[item].count;
        }
        return Number(totalCart.toFixed(2));
    }
    // List cart
    obj.listCart = function() {
        var cartCopy = [];
        for(i in cart) {
            item = cart[i];
            itemCopy = {};
            for(p in item) {
                itemCopy[p] = item[p];
            }
            itemCopy.total = Number(item.price * item.count).toFixed(2);
            cartCopy.push(itemCopy)
        }
        return cartCopy;
    }
    // cart : Array
    // Item : Object/Class
    // addItemToCart : Function
    // removeItemFromCart : Function
    // removeItemFromCartAll : Function
    // clearCart : Function
    // countCart : Function
    // totalCart : Function
    // listCart : Function
    // saveCart : Function
    // loadCart : Function
    return obj;
})();

  // Triggers / Events
  // Add item
$('.add_to_cart').click(function(event) {
    event.preventDefault();
    var img = $(this).data('img');
    var name = $(this).data('name');
    var price = Number($(this).data('price'));
    shoppingCart.addItemToCart(img,name, price, 1);
    displayCart();
});
  // Clear items
$('.clear-cart').click(function() {
    shoppingCart.clearCart();
    displayCart();
});
function displayCart() {
    var cartArray = shoppingCart.listCart();
    var output = "";
    for(var i in cartArray) {
        output += 
        "<tr>"
        +"<td class='mb-1'><img class='img-small mx-auto d-block' src='"+cartArray[i].img+"' alt='"+cartArray[i].name+"'><p class='text-center xsfont text03 pb-0 mb-0'>"+cartArray[i].name+"</p></td>"
        +"<td class='align-middle'><input  class='border01 rounder01 item-count text03 text-center mx-auto d-block mb-2' type='number' min='1' max='9' data-name='"+cartArray[i].name+"'value='"+cartArray[i].count+"'></input><button class='delete-item mx-auto d-block btn btn-danger smallfont' data-name='"+cartArray[i].name+"'>Remove</button></td>"
        +"<td class='align-middle text03'><p class='text03 text-right'>"+cartArray[i].price*cartArray[i].count+"</p></td>"
        + "</tr>";    
    }
    $('.cart-content').html(output);
    $('.total-cart').html(shoppingCart.totalCart());
    $('.total-count').html(shoppingCart.totalCount());
}

// Delete item button
$('.cart-content').on("click", ".delete-item", function(event) {
    var name = $(this).data('name');
    shoppingCart.removeItemFromCartAll(name);
    displayCart();
});
  
  // Item count input
$('.cart-content').on("change", ".item-count", function(event) {
    var name = $(this).data('name');
    var count = Number($(this).val());
    shoppingCart.setCountForItem(name, count);
    displayCart();
});
displayCart();