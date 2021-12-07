let queries;
let price;
window.onload = () => {
    console.log("Cart loaded");
    // console.log(data);
    if(data) {
        if(login) {
            queries = JSON.parse(data.replace(/&quot;/g,'"'));
            // queries = queries.filter( query => query._id != "61abcc63b4ba2ca575720a87");
            populateCartListLoggedIn();
        } else {
            // console.log(data);
            queries = JSON.parse(data.replace(/&quot;/g,'"'));
            populateCartListGuest();
        }
        console.log(queries);
    }
}
function populateCartListLoggedIn() {
    let cartDiv = document.getElementById('cart-container');
    cartDiv.innerHTML = "";
    price = 0;
    for(let track of queries) {
        cartDiv.innerHTML += `<div class="cart-entry">
                        <h3>${track.music.MusicName}</h3>
                        <h3>Quantity: ${track.Quantity}</h3>
                        <button data=${track._id} class="myButton" onclick="deleteCart(event,this)">Delete</button>
                    </div>`
        price += track.music.Price * track.Quantity;
    }
    document.getElementById('finalprice').innerHTML = `Total Price: $ ${price}`
}

function populateCartListGuest() {
    let cartDiv = document.getElementById('cart-container');
    cartDiv.innerHTML = "";
    price = 0;
    for(let track of queries) {
        cartDiv.innerHTML += `<div class="cart-entry">
                        <h3>${track.MusicName}</h3>
                        <h3>Quantity: ${track.Quantity}</h3>
                        <button data=${track.CartId} class="myButton" onclick="deleteCart(event,this)">Delete</button>
                    </div>`
        price += track.Price * track.Quantity;
    }
    document.getElementById('finalprice').innerHTML = `Total Price: $ ${price}`
}

function deleteCart(event, instance) {
    event.preventDefault();
    var id = $(instance).attr('data');
    console.log(id);
    $.ajax({ 
        type: 'DELETE', url: `/cart/${id}`
    }).done(function (response) {
        console.log("deleted " + id)
        if (response.msg === '') {
            if (login) {
                queries = queries.filter( query => query._id != id);
                populateCartListLoggedIn();
            } else {
                queries = queries.filter( query => query.CartId != id);
                populateCartListGuest();
            }
            cartCount = 0;
            console.log("Header rendered");
            $.get("/cart/total", function(data) {
                console.log(data.msg);
                for(let item of data.msg) {
                    cartCount += item.Quantity;
                }
                $("#countCart").text(cartCount);
            });
        } else {
            alert('Error: ' + response.msg)
        }
    });
}

