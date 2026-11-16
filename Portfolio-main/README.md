# Personal Portfolio | Ramez Abu Ramadan 🚀

This repository contains the source code for my fully custom-built personal portfolio. I designed and developed this project from scratch using Vanilla HTML, CSS, and JavaScript to showcase my skills as a Software Engineering student, completely bypassing external frameworks or libraries.

## ✨ Features I Developed

Rather than just building a static page, I implemented several advanced, interactive features to create a dynamic user experience:

* **Custom Bilingual Engine (EN/AR):** I built a lightweight, client-side internationalization (i18n) system using JavaScript dictionaries. By clicking the language toggle, the DOM dynamically updates all text content (`data-i18n` attributes) and automatically shifts the document direction (`dir="rtl"`) for seamless Arabic support. It also saves the user's preference in `localStorage`.
* **Dynamic Theme & Galaxy Background:** I engineered a custom Light/Dark mode switch utilizing CSS variables. The dark theme features a complex, fixed `radial-gradient` galaxy background, while the light theme shifts to a clean, minimal aesthetic.
* **Interactive "Skill Plan" Grid:** Instead of standard lists, I designed a responsive CSS Grid for my technical skills. Clicking a "Plan" card dynamically expands it into the main view, smoothly transitioning its height and opacity while shifting the inactive cards to a side column.
* **Animated Profile Orbit:** I used advanced CSS `@keyframes` to create continuous, counter-rotating dashed orbital rings around my profile picture, adding a high-tech visual touch to the hero section.
* **Asynchronous Contact Form:** The contact section is integrated with the Formspree API. I wrote a custom JavaScript `fetch` request to handle form submissions asynchronously, providing instant UI feedback (success or error messages) without requiring a page reload.

## 🛠️ Tech Stack & Architecture

* **Frontend Structure:** Semantic HTML5 (using `<header>`, `<main>`, `<section>`, `<article>`).
* **Styling Engine:** Pure CSS3. I heavily utilized CSS Grid, Flexbox, custom properties (`:root` variables), glassmorphism effects (`backdrop-filter: blur`), and media queries for mobile responsiveness.
* **Logic & Interactivity:** Vanilla JavaScript (ES6+). Used for DOM manipulation, event listeners, state management (theme/language), and API fetching.

## 📁 Project Files Highlight

* `index.html`: The structural skeleton containing all semantic landmarks, data attributes for translations, and the SVG/UI layout.
* `style.css`: Contains all custom styling, including the RTL overrides, keyframe animations, and complex grid logic for the interactive cards.
* `script.js`: Houses the translation dictionaries, theme toggling logic, DOM query selectors, and form submission handler.

## 🚀 Run it Locally

1. Clone the repository:
   ```bash
   git clone [https://github.com/ramiz-05/personal-portfolio-capstone.git](https://github.com/ramiz-05/personal-portfolio-capstone.git)
