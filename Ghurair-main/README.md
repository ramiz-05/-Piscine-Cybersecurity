# BreakPoint

Three interactive web-security labs you can run in the browser. In each lab you press an attack payload, watch the vulnerability happen, switch to the fixed code, and press the **same payload** again to see it blocked.

**Live site:** https://shahd444.github.io/Ghurair/  


Built with plain HTML, CSS and JavaScript. No backend, no login, no database.

## The labs

| # | Lab | What you do | OWASP Top 10:2025 | CWE |
|---|-----|-------------|-------------------|-----|
| 1 | **IDOR** | Change an ID in a request and read another employee's payroll record | A01 Broken Access Control | CWE-639 |
| 2 | **Race Condition** | Send two requests at once and use a single-use coupon twice | A06 Insecure Design | CWE-362 |
| 3 | **Prototype Pollution** | Send one JSON object and make a normal user look like an admin | A08 Software or Data Integrity Failures | CWE-1321 |

Each lab page has the same parts: what it is, the vulnerable code with the buggy line highlighted, payload buttons, the result, why it matters (with a real incident), the fixed code with the fixing line highlighted, and sources.

## How to use a lab

1. Leave the switch on **Vulnerable**, pick a payload, and press the run button. The result shows the attack working.
2. Switch to **Fixed**.
3. Press the same payload again. The result shows it blocked.

## Project layout

```text
index.html           home page with the three lab cards (must stay in the repo root for GitHub Pages)
pages/
  lab-1.html         IDOR
  lab-2.html         Race Condition
  lab-3.html         Prototype Pollution
js/
  lab-engine.js      shared helpers: draw code, highlight a line, switch buttons
  lab-1.js           IDOR logic and page behavior
  lab-2.js           Race Condition logic and page behavior
  lab-3.js           Prototype Pollution logic and page behavior
stylesheet/
  global.css         colors, fonts, base styles
  styles.css         header, hero, home page cards
  labs.css           lab pages: code windows, payload cards, results
  footer.css         footer
```

Each lab page loads `lab-engine.js` first, then its own `lab-N.js`. The script finds elements on the page by `id` and handles everything: the Vulnerable/Fixed switch, the payloads, the result, and the Reset button.

## How each lab works

- **IDOR:** a fake payroll API in the browser. You are employee 1001; the payload asks for record 1002. Vulnerable mode returns it. Fixed mode checks the record's owner and answers 403.
- **Race Condition:** the vulnerable and fixed coupon functions really run, with a short delay standing in for a database call. Two overlapping requests both succeed in the vulnerable version; the fixed version reserves the coupon before waiting, so one is rejected.
- **Prototype Pollution:** the vulnerable and fixed merge functions really run on the payload, using a throwaway sandbox prototype. The page's own `Object.prototype` is never touched, and the lab prints a check that proves it.

## Safety

- Every demo is a simulation in your browser. No request is sent to any server.
- All employees and records are made up. There are no real passwords, personal data or logos.
- External links on the lab pages (OWASP, CWE, articles) only open when you click them. The Google Fonts stylesheet is the only thing loaded automatically from outside.
