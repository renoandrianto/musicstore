let queries;
let price;
let userexist;
window.onload = () => {
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
    let cartDiv = document.getElementById('checkout-items');
    cartDiv.innerHTML = "";
    price = 0;
    for(let track of queries) {
        cartDiv.innerHTML += `<div>
                        <p>${track.Quantity} x ${track.music.MusicName} HK$${track.music.Price}</p>
                    </div>`
        price += track.music.Price * track.Quantity;
    }
    document.getElementById('checkout-price').innerHTML = `Total Price: HK$ ${price}`
}

function populateCartListGuest() {
    let cartDiv = document.getElementById('checkout-items');
    cartDiv.innerHTML = "";
    price = 0;
    for(let track of queries) {
        cartDiv.innerHTML += `<div>
                            <p>${track.Quantity} x ${track.MusicName} HK$${track.Price}</p>
                            </div>`
        price += track.Price * track.Quantity;
    }
    document.getElementById('checkout-price').innerHTML = `Total Price: HK$ ${price}`
}

function checkUsername(data) {
    console.log(data);
    $.ajax(
        {type: 'GET', url: `/checkusername/${data}`
    }).done(function (response) {
        console.log("Ajax done")
        if (response.msg === true) {
            userexist = true;
            document.getElementById("username-existed").innerHTML = "Username already exists!";
            document.getElementById("username-checkout").value = "";
        } else {
            userexist = false;
            document.getElementById("username-existed").innerHTML = "";
        }
    })
}

function validateCheckout() {
    if (userexist) {
        alert("Please choose another username!");
        return false;
    }
}