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
        header.querySelector(".bell").src="https://www.bannersolutions.com/static/icons/onboarding/notifications.svg";
        header.querySelector(".cart").src="./images/cart-bl.svg";
        header.querySelector(".mobile-menu img").src="./images/balck-hamburger-menu.png";
        document.querySelectorAll(".menu-items li details").forEach(detail => {
            detail.removeAttribute("open");
        });       
        if (window.innerWidth > 1200) {
            header.querySelector(".search-all").style.display="flex"; 
        }
    } else {
        header.style.position="absolute";
        header.classList.remove("scrolled");     
        document.querySelector(".logo img").src="https://www.bannersolutions.com/static/img/homepage/BSlogo.png"; 
        header.querySelector(".phone").src="./images/phone-wh.svg";
        header.querySelector(".bell").src="https://www.bannersolutions.com/static/icons/homepage/notifications.svg";
        header.querySelector(".cart").src="https://www.bannersolutions.com/static/icons/homepage/shopping_cart_white.svg";
        header.querySelector(".mobile-menu img").src="https://www.bannersolutions.com/static/icons/homepage/menu_black_24dp.svg";
        header.querySelector(".search-all").style.display="none"; 
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

    // making other details close on desktop when other is clicked
    
    const detailsElements = document.querySelectorAll("nav .menu-items details");
    if (window.innerWidth > 1200) {
    detailsElements.forEach((details) => {
        details.addEventListener("toggle", function () {
            if (this.open) {
                detailsElements.forEach((otherDetails) => {
                    if (otherDetails !== this) {
                        otherDetails.open = false;
                    }
                });
            }
        });
    });
    }

    // hero section details settings
    document.querySelectorAll(".product-search details").forEach((detail, _, detailsArray) => {
        detail.addEventListener("toggle", () => {
            if (detail.open) {
                detailsArray.forEach(otherDetail => {
                    if (otherDetail !== detail) otherDetail.open = false;
                });
            } else if (![...detailsArray].some(d => d.open)) {
                detail.open = true;
            }
        });
    });

    //product category details JS
    const container = document.querySelector('.categories-section .row.g-4');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    
    // Calculate single card width including margins
    const card = document.querySelector('.category-card');
    const cardWidth = card.offsetWidth + 10; // 10px for margin
    
    nextBtn.addEventListener('click', () => {
        container.scrollBy({
            left: cardWidth,
            behavior: 'smooth'
        });
        setTimeout(updateArrows, 100);
    });
    
    prevBtn.addEventListener('click', () => {
        container.scrollBy({
            left: -cardWidth,
            behavior: 'smooth'
        });
        setTimeout(updateArrows, 100);
    });
    
    // Update arrow visibility
    const updateArrows = () => {
        const maxScroll = container.scrollWidth - container.clientWidth;
        prevBtn.style.opacity = container.scrollLeft <= 0 ? '0.3' : '1';
        nextBtn.style.opacity = container.scrollLeft >= maxScroll ? '0.3' : '1';
    };
    
    container.addEventListener('scroll', updateArrows);
    updateArrows();

    //Adding slider in banner under hero section
    $('.slider').slick({
        dots: true,
        arrows:false,
        infinite: true,
        speed: 300,
        slidesToShow: 1,
        adaptiveHeight: true
    });

});




// serivce section js 

function initializeMobileSlider() {
    if (window.innerWidth < 998) {
        const serviceCards = document.querySelectorAll('.service-card');
        
        serviceCards.forEach(card => {
            const featuresContainer = card.querySelector('.service-features');
            const features = card.querySelectorAll('.feature');
            let currentIndex = 0;
            let touchStartX = 0;
            let touchEndX = 0;
            
            // Create dots container
            const dotsContainer = document.createElement('div');
            dotsContainer.className = 'slider-dots';
            features.forEach((_, index) => {
                const dot = document.createElement('span');
                dot.className = `dot ${index === 0 ? 'active' : ''}`;
                dot.addEventListener('click', () => showFeature(features, index, dotsContainer));
                dotsContainer.appendChild(dot);
            });
            featuresContainer.parentNode.insertBefore(dotsContainer, featuresContainer.nextSibling);

            // Initialize first feature
            showFeature(features, currentIndex, dotsContainer);

            // Touch event handlers
            featuresContainer.addEventListener('touchstart', e => {
                touchStartX = e.changedTouches[0].screenX;
            });

            featuresContainer.addEventListener('touchend', e => {
                touchEndX = e.changedTouches[0].screenX;
                handleSwipe();
            });

            const handleSwipe = () => {
                const swipeThreshold = 50;
                const swipeDifference = touchStartX - touchEndX;

                if (swipeDifference > swipeThreshold) {
                    currentIndex = Math.min(currentIndex + 1, features.length - 1);
                } else if (swipeDifference < -swipeThreshold) {
                    currentIndex = Math.max(currentIndex - 1, 0);
                }
                
                showFeature(features, currentIndex, dotsContainer);
            };
        });
    }
}

function showFeature(features, index, dotsContainer) {
    features.forEach((feature, i) => {
        if (i === index) {
            feature.style.transform = 'translateX(-50%)';
            feature.style.opacity = '1';
            feature.style.zIndex = '1';
            feature.style.visibility = 'visible';
        } else {
            const offset = i < index ? '-100%' : '100%';
            feature.style.transform = `translateX(${offset})`;
            feature.style.opacity = '0';
            feature.style.zIndex = '0';
            feature.style.visibility = 'hidden';
        }
    });

    // Update dots
    if (dotsContainer) {
        const dots = dotsContainer.querySelectorAll('.dot');
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
    }
}

// Update event listeners
document.addEventListener('DOMContentLoaded', initializeMobileSlider);
window.addEventListener('resize', () => {
    document.querySelectorAll('.slider-dots').forEach(dots => dots.remove());
    document.querySelectorAll('.feature').forEach(feature => feature.style = '');
    initializeMobileSlider();

});