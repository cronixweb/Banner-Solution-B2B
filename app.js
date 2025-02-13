// function to fix and silde header on scroll
let lastScrollTop = 0;
window.addEventListener("scroll", ()=> {
    const header = document.querySelector("header");
    
    let scrollTop = window.scrollY || document.documentElement.scrollTop;
    if (scrollTop > lastScrollTop) {
        header.style.top = "-110px";
    } else if (scrollTop < lastScrollTop) {
        header.style.top = "0";
    }
    lastScrollTop = scrollTop;
    if (window.scrollY > 50) {
        header.style.position="fixed";
        header.classList.add("scrolled");    
        header.querySelector(".logo img").src="https://www.bannersolutions.com/icons/Banner_Logo.svg"; 
        header.querySelector(".phone").src="./images/phone-bl.svg";
        header.querySelector(".search").src="./images/search-bl.svg";
        header.querySelector(".cart").src="./images/cart-bl.svg";
        header.querySelector(".mobile-menu img").src="./images/balck-hamburger-menu.png";
    } else {
        header.style.position="relative";
        header.classList.remove("scrolled");     
        document.querySelector(".logo img").src="https://www.bannersolutions.com/static/img/homepage/BSlogo.png"; 
        header.querySelector(".phone").src="./images/phone-wh.svg";
        header.querySelector(".search").src="./images/search-wh.svg";
        header.querySelector(".cart").src="./images/cart-wh.svg";
        header.querySelector(".mobile-menu img").src="https://www.bannersolutions.com/static/icons/homepage/menu_black_24dp.svg";
    }
});
// function for mobile navigation to appear and disappear
document.addEventListener("DOMContentLoaded", () => {
    const mobileMenu = document.querySelector(".mobile-menu");
    const menuWrapper = document.querySelector("header .menu-items-wrapper");

    mobileMenu.addEventListener("click", (event) => {
        menuWrapper.style.left = "0";
        event.stopPropagation(); //this will stop document click to immediuately close the navigation
    });

    document.addEventListener("click", (event) => {
        if (!menuWrapper.contains(event.target) && !mobileMenu.contains(event.target)) {
            menuWrapper.style.left = "-599px";
        }
    });
});

