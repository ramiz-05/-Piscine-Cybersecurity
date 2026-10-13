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

// 3. Contact Form Submission (Mailto Integration)
contactForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    if (!name || !email || !message) {
        return;
    }

    // Format the email subject and body
    const subject = encodeURIComponent("Portfolio Contact — " + name);
    const body = encodeURIComponent(
        "Name: " + name +
        "\nEmail: " + email +
        "\n\nMessage:\n" + message
    );

    // Create the mailto link with your updated email address
    const mailtoLink =
        "mailto:ramizaboramadan2@gmail.com" +
        "?subject=" + subject +
        "&body=" + body;

    // Show a feedback message on the page
    formFeedback.textContent = `Thank you, ${name}! Opening your email client...`;

    // Open the default email client
    window.location.href = mailtoLink;

    // Reset the form fields
    contactForm.reset();
});
