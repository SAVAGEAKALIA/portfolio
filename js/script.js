document.addEventListener('DOMContentLoaded', () => {
    const menu = document.querySelector('.menu');
    const hamburger = document.querySelector('.hamburger');
    const menuBtn = document.querySelector('.menu-btn');
    const closeBtn = document.querySelector('.close-btn');
    const resumeBtn = document.querySelectorAll('.resume-btn');
    const arrowRight = document.querySelector('.portfolio-box .navigation .arrow-right');
    const arrowLeft = document.querySelector('.portfolio-box .navigation .arrow-left');
    const portfolioDetails = document.querySelectorAll('.portfolio-detail');
    const navLinks = document.querySelectorAll('header nav .menu a');
    const logoLink = document.querySelector('.logo a');
    const sections = document.querySelectorAll('section');
    const barBox = document.querySelector('.bars-box');
    const header = document.querySelector('header');

    // Initialize first section with animation sequence
    barBox.classList.add('active');
    setTimeout(() => {
        sections[0].classList.add('active');
        header.classList.add('active');
    }, 1000);

    // Mobile menu toggle
    hamburger.addEventListener('click', () => {
        menu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // Close mobile menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            menu.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !menu.contains(e.target)) {
            menu.classList.remove('active');
            hamburger.classList.remove('active');
        }
    });

    // Prevent menu from closing when clicking inside menu
    menu.addEventListener('click', (e) => {
        e.stopPropagation();
    });

    // Resume section tabs
    resumeBtn.forEach((btn, idx) => {
        btn.addEventListener('click', () => {
            const resumeDetails = document.querySelectorAll('.resume-detail');
            
            resumeBtn.forEach(btn => btn.classList.remove('active'));
            btn.classList.add('active');

            resumeDetails.forEach(detail => detail.classList.remove('active'));
            resumeDetails[idx].classList.add('active');
        });
    });

    // Portfolio carousel
    let index = 0;
    const maxIndex = portfolioDetails.length - 1;

    const updateCarousel = () => {
        const imgSlide = document.querySelector('.portfolio-carousel .image-slide');
        
        imgSlide.style.transform = `translateY(calc(${index * -100}% - ${index * 2}rem))`;

        portfolioDetails.forEach(item => item.classList.remove('active'));
        portfolioDetails[index].classList.add('active');

        // Update arrow states
        arrowLeft.classList.toggle('disabled', index === 0);
        arrowRight.classList.toggle('disabled', index === maxIndex);
    };

    arrowRight.addEventListener('click', () => {
        if (index < maxIndex) {
            index++;
            updateCarousel();
        }
    });

    arrowLeft.addEventListener('click', () => {
        if (index > 0) {
            index--;
            updateCarousel();
        }
    });

    // Navigation
    const handleNavigation = (index) => {
        // Update active states
        navLinks.forEach(link => link.classList.remove('active'));
        sections.forEach(section => section.classList.remove('active'));
        
        if (index >= 0) {
            navLinks[index].classList.add('active');
            sections[index].classList.add('active');
        } else {
            sections[0].classList.add('active');
        }

        // Animation sequence
        barBox.classList.remove('active');
        header.classList.remove('active');
        
        setTimeout(() => {
            barBox.classList.add('active');
        }, 100);

        setTimeout(() => {
            header.classList.add('active');
        }, 1100);

        // Close mobile menu if open
        menu.classList.remove('active');
        hamburger.classList.remove('active');
    };

    navLinks.forEach((link, idx) => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            handleNavigation(idx);
        });
    });

    logoLink.addEventListener('click', (e) => {
        e.preventDefault();
        handleNavigation(-1);
    });

    // Initialize first section
    handleNavigation(0);
});
