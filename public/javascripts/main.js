var categoryString;
window.onload = () => {
    console.log(categories);
    for(let category of categories) {
        document.getElementById("category-list").innerHTML += `<li><a href="/${category}">${category}</a></li>`
    }
    if(category) {
        categoryLink = document.getElementById('category');
        document.getElementById('homepath').style.display = "inline"
        categoryLink.innerHTML = category;
        categoryLink.setAttribute("href", `/${category}`);
        document.getElementById('title').innerHTML = `All ${category}`;
        document.getElementById("othersearchfield").style.display = "block";
    } else {
        document.getElementById("searchfield").style.display = "block";
    }
    // console.log(queries);
    for(let track of queries) {
        // console.log(category == None)
        if(category === "" || track.Category == category) {
            document.getElementById('music-container').innerHTML +=
            `<div class="card">
            <a href="/info/${track.MusicId}"><h4>${track.MusicName}</h2></a>
            <div><img class="picture" src="../materials/img_${track.MusicId}.jpg" alt=""></div>
            <div id="card-details" class="container">
            <p><b>Composer:</b> ${track.Composer}</p>
            <p><b>Price:</b> HK$ ${track.Price}</p>
            <p id="new-arrival">${track.NewArrival? "New Arrival!":""}</p>
            </div>
            </div>`
        }
    }
    let bar = document.getElementById('search');
    if(searchValue) {
        search(searchValue);
        // console.log(searchValue);
        bar.value = searchString;
    }
    let searchButton = document.getElementById("search-button");
    function search(searchValue) {
        document.getElementById('title').innerHTML = "Search Results"
        console.log(searchValue);
        document.getElementById('music-container').innerHTML = "";
        for(let track of queries) {
            let name = track.MusicName;
            let composer = track.Composer;
            // console.log(name, composer);
            for (let keyword of searchValue) {
                console.log(keyword);
                if (name.includes(keyword) || composer.includes(keyword)) {
                    console.log("MATCH")
                    document.getElementById('music-container').innerHTML +=
                    `<div class="card">
                    <a href="/info/${track.MusicId}"><h4>${track.MusicName}</h2></a>
                    <div><img class="picture" src="../materials/img_${track.MusicId}.jpg" alt=""></div>
                    <div id="card-details" class="container">
                    <p><b>Composer:</b> ${track.Composer}</p>
                    <p><b>Price:</b> HK$ ${track.Price}</p>
                    <p id="new-arrival">${track.NewArrival? "New Arrival!":""}</p>
                    </div>
                    </div>`;
                    break;
                }
            }
        }
    }
    searchButton.addEventListener('click', () => {
        searchValue = bar.value.split(" ");
        search(searchValue);
    });
  }
// function slideCategory(checkbox) {
//     if(checkbox.checked) {
//         document.getElementById("myAside").style.left = "0";
//     } else{
//         document.getElementById("myAside").style.left = "-100%";
//     }
// }

// var x = window.matchMedia("(max-width: 1140px)")
// x.addEventListener("change", showCategory);

// function showCategory() {
//     console.log("BER")
//     let checkbox = document.getElementById("check");
//     if($(document).width() <= 1140) {
//         checkbox.checked = false;
//         console.log("ilang");
//     } else {
//         checkbox.checked = true;
//     }
//     slideCategory(checkbox);
//     console.log("media change");
// }
