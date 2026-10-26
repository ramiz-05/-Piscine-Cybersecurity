# Exercise 00 - Cross-Site Scripting (XSS)

## What is OWASP?
The **Open Worldwide Application Security Project (OWASP)** is a nonprofit foundation that works to improve the security of software. It publishes the **OWASP Top 10**, a standard awareness document for developers and web application security detailing the most critical security risks to web applications.

## Vulnerability Type: DOM-Based Cross-Site Scripting (XSS)
This web application is vulnerable to **DOM-based Cross-Site Scripting (XSS)**. 

### Why the Application is Vulnerable
In `index.html`, the `displayText()` function takes untrusted user input and handles it unsafely:
1. **Unsafe `innerHTML` assignment:** It uses `innerHTML` to render raw HTML tags directly into the DOM without sanitization.
2. **Dynamic `<script>` execution:** It creates a `<script>` element and assigns the raw input to `script.textContent`, immediately executing it as JavaScript.

## Exploitation Scenarios
1. **Session Hijacking (Cookie Theft):** An attacker crafts a payload that reads a logged-in user's session cookie via `document.cookie` and sends it to an external server. The attacker can then impersonate the victim.
2. **Phishing via DOM Manipulation:** An attacker modifies the page's HTML to display a fake login prompt. When the user enters their credentials, the script captures them and sends them to the attacker.
