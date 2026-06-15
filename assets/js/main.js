document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.querySelector('.custom-navbar');

    // Add scroll effect to navbar
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(18, 63, 154, 0.55)';
        } else {
            navbar.style.background = 'rgba(18, 63, 154, 0.55)';
        }
    });

    // Simple smooth scroll for nav links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});
