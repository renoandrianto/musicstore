window.onload = () => {
    // document.body.style.backgroundImage= "url('materials/loginbg.jpeg')";
    document.body.classList.add("loginbg");
}


function validateForm(form) {
    console.log(form)
    var user = document.forms[form]["username"].value;
    var password = document.forms[form]["password"].value;
    if ((user == "" || user == null) || (password == "" || password == null)) {
        alert("Please do not leave the fields empty!");
        return false;
    } 
}