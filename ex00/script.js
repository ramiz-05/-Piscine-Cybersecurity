const themeToggleBtn = document.getElementById('theme-toggle');
const bodyElement = document.body;
const contactForm = document.getElementById('contact-form');
const formFeedback = document.getElementById('form-feedback');

themeToggleBtn.addEventListener('click', () => {
    const isLightMode = bodyElement.classList.toggle('light-theme');

    if (isLightMode) {
        themeToggleBtn.textContent = '🌙 Dark Mode';
    } else {
        themeToggleBtn.textContent = '☀️ Light Mode';
    }
});

contactForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const nameInput = document.getElementById('name').value.trim();

    if (nameInput) {
        formFeedback.textContent = `Thank you, ${nameInput}! Your message has been received.`;
        contactForm.reset();
    }
});
