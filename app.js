document.addEventListener('DOMContentLoaded', function() {
    const container = document.querySelector('.row.g-4');
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
});
