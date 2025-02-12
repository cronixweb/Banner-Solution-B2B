window.addEventListener("scroll", ()=> {
    const header = document.querySelector("header");
    if (window.scrollY > 50) {
        header.classList.add("scrolled");    
        header.querySelector(".logo img").src="https://www.bannersolutions.com/icons/Banner_Logo.svg"; 
        header.querySelector(".phone").src="./images/phone-bl.svg";
        header.querySelector(".search").src="./images/search-bl.svg";
        header.querySelector(".cart").src="./images/cart-bl.svg";
        header.querySelector(".mobile-menu img").src="./images/balck-hamburger-menu.png";
    } else {
        header.classList.remove("scrolled");     
        document.querySelector(".logo img").src="https://www.bannersolutions.com/static/img/homepage/BSlogo.png"; 
        header.querySelector(".phone").src="./images/phone-wh.svg";
        header.querySelector(".search").src="./images/search-wh.svg";
        header.querySelector(".cart").src="./images/cart-wh.svg";
        header.querySelector(".mobile-menu img").src="https://www.bannersolutions.com/static/icons/homepage/menu_black_24dp.svg";
    }
});
document.addEventListener("DOMContentLoaded", (e) => {
    document.querySelector(".mobile-menu").addEventListener("click", () => {
        document.querySelector("header .menu-items-wrapper").style.left = "0";
    });
    document.querySelector("main").addEventListener("click", () => {
        document.querySelector("header .menu-items-wrapper").style.left = "-599px";
    });
});