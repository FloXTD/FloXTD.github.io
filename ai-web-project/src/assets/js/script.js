// This file contains JavaScript code for interactive features on the home screen.

document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('.ai-image');
    images.forEach(image => {
        image.addEventListener('mouseover', function() {
            this.style.transform = 'scale(1.1)';
            this.style.transition = 'transform 0.3s';
        });

        image.addEventListener('mouseout', function() {
            this.style.transform = 'scale(1)';
        });
    });

    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            alert('Navigating to ' + this.textContent);
        });
    });
});