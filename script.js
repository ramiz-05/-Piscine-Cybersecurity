const themeToggleBtn = document.getElementById('theme-toggle');
const bodyElement = document.body;
const contactForm = document.getElementById('contact-form');
const formFeedback = document.getElementById('form-feedback');
const skillCards = document.querySelectorAll('.skill-card');

// 1. Light / Dark Galaxy Theme Toggle
themeToggleBtn.addEventListener('click', () => {
    const isLightMode = bodyElement.classList.toggle('light-theme');

    if (isLightMode) {
        themeToggleBtn.textContent = '🌙 Dark Mode';
    } else {
        themeToggleBtn.textContent = '☀️ Light Mode';
    }
});

// 2. Interactive Skill "Plan" Cards (Click to lock open/close)
skillCards.forEach((card) => {
    card.addEventListener('click', () => {
        card.classList.toggle('active-plan');
    });
});

// 3. Contact Form Submission Feedback
contactForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const nameInput = document.getElementById('name').value.trim();

    if (nameInput) {
        formFeedback.textContent = `Thank you, ${nameInput}! Your message has been received.`;
        contactForm.reset();
    }
});
