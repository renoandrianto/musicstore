let queries;
let price = 0;
let userexist;
window.onload = () => {
    // $("#invoice-info").html(
    //     `<p><b>Full Name:</b> ${"Reno"}       <b>Company:</b> ${"NA"}</p>
    //     <p><b>Address Line 1:</b> ${"Reno"}</p>
    //     <p><b>Address Line 2:</b> ${"Reno"}</p>
    //     <p><b>City:</b> ${"Oxford"}   <b>Region:</b> ${"NA"}   <b>Country:</b> ${"UK"}</p>
    //     <p><b>Postcode:</b> ${"Oxford"}</p>`
        
    // );
    if(data) {
        info = JSON.parse(info.replace(/&quot;/g,'"'));
        queries = JSON.parse(data.replace(/&quot;/g,'"'));
        $("#invoice-info").html(
            `<p><b>Full Name:</b> ${info.fullname}       <b>Company:</b> ${info.country?info.country:"NA"}</p>
            <p><b>Address Line 1:</b> ${info.address1}</p>
            <p><b>Address Line 2:</b> ${info.address2?info.address2:"NA"}</p>
            <p><b>City:</b> ${info.city}   <b>Region:</b> ${info.region?info.region:"NA"}   <b>Country:</b> ${info.country}</p>
            <p><b>Postcode:</b> ${info.postcode}</p>`

        );
        if(login) {
            for(let track of queries) {
                document.getElementById("invoice-items").innerHTML += `<div>
                                <p>${track.Quantity} x ${track.music.MusicName} HK$${track.music.Price}</p>
                            </div>`
                price += track.music.Price * track.Quantity;
            }
        } else {
            for(let track of queries) {
                document.getElementById("invoice-items").innerHTML += `<div>
                                    <p>${track.Quantity} x ${track.MusicName} HK$${track.Price}</p>
                                    </div>`
                price += track.Price * track.Quantity;
            }
        }
        $("#invoice-price").text(`Total Price: HK$ ${price}`);
        console.log(queries);
        console.log(info);
    }
}