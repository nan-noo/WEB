const hamburgerOnOff = () => {
    let navlist = document.getElementById('nav-dropdown-list');

    if(navlist.status === "open"){
        navlist.status = "closed";
        navlist.style.visibility = "hidden";
    }
    else if(navlist.status === "closed"){
        navlist.status = "open";
        navlist.style.visibility = "visible";
    }
}