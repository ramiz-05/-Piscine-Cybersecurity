const themeToggleBtn = document.getElementById('theme-toggle');
const bodyElement = document.body;
const contactForm = document.getElementById('contact-form');
const formFeedback = document.getElementById('form-feedback');
const skillCards = document.querySelectorAll('.skill-card');


themeToggleBtn.addEventListener('click', () => {
    const isLightMode = bodyElement.classList.toggle('light-theme');

    if (isLightMode) {
        themeToggleBtn.textContent = '🌙 Dark Mode';
    } else {
        themeToggleBtn.textContent = '☀️ Light Mode';
    }
});

skillCards.forEach((card) => {
    card.addEventListener('click', () => {
        card.classList.toggle('active-plan');
    });
});


contactForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    if (!name || !email || !message) {
        return;
    }

   
    const subject = encodeURIComponent("Portfolio Contact — " + name);
    const body = encodeURIComponent(
        "Name: " + name +
        "\nEmail: " + email +
        "\n\nMessage:\n" + message
    );

    
    const mailtoLink =
        "mailto:ramizaboramadan2@gmail.com" +
        "?subject=" + subject +
        "&body=" + body;

    
    formFeedback.textContent = `Thank you, ${name} `;

  
    window.location.href = mailtoLink;

   
    contactForm.reset();
});
