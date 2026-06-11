document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.querySelector('.custom-navbar');

    // Add scroll effect to navbar
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(10, 12, 16, 0.8)';
        } else {
            navbar.style.background = 'rgba(10, 12, 16, 0.4)';
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
