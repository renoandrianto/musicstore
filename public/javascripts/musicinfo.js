window.onload = () => {
    $(".checkbtn").remove();
    $("#home-link-icon").prepend('<img id=home-icon src="../materials/home.png", alt="">');
    console.log(login);
    let queries = JSON.parse(data.replace(/&quot;/g,'"'));
    console.log(queries);
    document.getElementById('homepath').style.display = "inline";
    titlepath = document.getElementById('titlepath');
    titlepath.innerHTML = queries[0].MusicName;
    titlepath.setAttribute("href", window.location.href);
    document.getElementById('userHidden').value = queries[0].MusicId;
    document.getElementById('musictitle').innerHTML = queries[0].MusicName;
    document.getElementById('composerImg').src = `../materials/img_${queries[0].MusicId}.jpg`;
    document.getElementById('audiosource').src = `../materials/m${queries[0].MusicId}.mp3`;
    document.getElementById('audio').load();
    document.getElementById('composer').innerHTML = "<b>Composer: </b> " + queries[0].Composer;
    document.getElementById('published').innerHTML = "<b>Published: </b>" + queries[0].Published;
    document.getElementById('musiccategory').innerHTML = "<b>Category: </b>" + queries[0].Category;
    document.getElementById('description').innerHTML = "<b>Description: </b>" + queries[0].Description;
    document.getElementById('price').innerHTML = "<b>Price: </b>$" + queries[0].Price;
}