const hamburgerOnOff = () => {
    let navlist = document.getElementById('nav-dropdown-list');
    let status = navlist.getAttribute('status');

    if(status === "open"){
        navlist.setAttribute('status', 'closed');
        navlist.style.display = "none";
    }
    else if(status === "closed"){
        navlist.setAttribute('status', 'open');
        navlist.style.display = "block";
    }
}