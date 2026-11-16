# 🛡️ Piscine Cybersecurity

My work from the **42 Barcelona Cybersecurity Piscine**: web fundamentals, Linux and Git, networking, CTF-style challenges (cryptography, OSINT, web security), and a "Piscine Pro" track of hands-on exploit and remediation write-ups.

> ⚠️ **Educational use only.** Every exploit, payload and script here targets intentionally vulnerable training apps that were provided for the course (usually run locally in Docker). Do not use any of it against systems you don't own or have explicit permission to test.

---

## 📑 Table of Contents

- [Overview](#-overview)
- [Repository Structure](#-repository-structure)
- [Module Details](#-module-details)
  - [Foundations](#1-foundations)
  - [Web Development Projects](#2-web-development-projects)
  - [Networking](#3-networking)
  - [Discovery Piscine CTF Series](#4-discovery-piscine-ctf-series)
  - [Piscine Pro](#5-piscine-pro--web-exploitation--remediation)
- [Skills Demonstrated](#-skills-demonstrated)
- [Getting Started](#-getting-started)
- [Notes](#-notes)
- [Author](#-author)

---

## 🔭 Overview

The repository follows the Piscine from the ground up:

1. **Foundations:** the terminal, shell scripting, Git and GitHub, SSH keys.
2. **Web basics:** HTML, CSS and JavaScript, which I need to understand before I can attack or defend them.
3. **Networking:** subnetting, routing and addressing through the NetPractice puzzles.
4. **Discovery CTFs:** cryptography (Gecko), OSINT (Tyto) and web security (Weasel).
5. **Piscine Pro:** exploiting real vulnerability classes (XSS, CSRF, SSTI, XXE, SSRF/LFI, insecure deserialization, CBC bit-flipping), then documenting payloads and fixes.

Most modules include the official subject PDF alongside my solutions, so the work can be followed without extra context.

---

## 📂 Repository Structure

```
Piscine-Cybersecurity/
├── Linux & Git/            # Project 00: terminal, shell scripts, Git, SSH
├── HTML/                   # Project 01: HTML5 fundamentals
├── CSS/                    # Project 02: layout, shapes, colours, box model
├── JavaScript/             # Project 03: DOM, events, interactive app
├── Portfolio-main/         # Project 04: bilingual (EN/AR) personal portfolio
├── Project 05 — Networking/# Project 05: NetPractice+ simulator and solutions
├── netpractice/            # NetPractice level solutions (level1–20 .json)
├── shell/                  # shell00 / shell01 Discovery exercises
├── gecko/                  # Cryptography CTF   (Gecko00–03)
├── tyto/                   # OSINT CTF          (Tyto00–03)
├── weasel/                 # Web security CTF   (Weasel00–03)
└── Piscine Pro/            # Advanced exploit + fix write-ups (modules 0x0 → 2x2)
```

---

## 📘 Module Details

### 1. Foundations

| Directory | Focus |
| :--- | :--- |
| `Linux & Git/` | Terminal navigation, file manipulation scripts (`manage_files.sh`), creating a public GitHub repo, documenting a Git workflow, and SSH key authentication (ed25519). |
| `shell/` | The `shell00` and `shell01` Discovery exercises, including the provided resource archive and subject PDFs. |

### 2. Web Development Projects

| Directory | Project | What I built |
| :--- | :--- | :--- |
| `HTML/` | Project 01 | Six pages covering document structure, text hierarchy, links and images, lists and tables, accessible forms with native validation, and semantic landmarks. |
| `CSS/` | Project 02 | Flexbox layouts, positioning, pure-CSS shapes, colour models and opacity, and the box model. |
| `JavaScript/` | Project 03 | Variables and types, functions and conditions, DOM manipulation, event handling, and a small interactive app. |
| `Portfolio-main/` | Project 04 | A framework-free portfolio in vanilla HTML/CSS/JS: EN/AR language toggle with RTL support, light/dark theme, interactive skill cards, an animated profile orbit, and a contact form. |

Each of these folders has its own `README.md`, evaluation sheet and subject PDF.

### 3. Networking

**`Project 05 — Networking/`** and **`netpractice/`**

- A local **NetPractice+** simulator (HTML/JS, 20 levels) that can be launched with `run.sh`.
- JSON configurations for all 20 levels (`level1.json` … `level20.json`) covering IP addressing, subnet masks, default gateways, routing tables, and multi-router topologies.

### 4. Discovery Piscine CTF Series

Each exercise is turned in as a `flag.txt` and has its subject PDF alongside it. Flags are deliberately not listed in this README.

| Series | Theme | Exercises | Techniques practised |
| :--- | :--- | :--- | :--- |
| **`gecko/`** | Cryptography | Gecko00–03 | Recognising and decoding encodings (Base64, hex), nested encodings, hash identification, and wordlist-based cracking with John the Ripper. |
| **`tyto/`** | OSINT | Tyto00–03 | Identifying accounts from captured traffic, pivoting between profiles, image geolocation, and EXIF metadata analysis. |
| **`weasel/`** | Web security | Weasel00–03 | Directory listing exposure, fuzzing for hidden paths, path traversal, and SQL-injection authentication bypass. |

Per-series write-ups live in `gecko/README.md`, `tyto/README.md` and `weasel/README.md`.

### 5. Piscine Pro — Web Exploitation & Remediation

Each module ships a Dockerized vulnerable app (`pro_XX/`), the subject PDF, and my own write-up in `exXX/`: a `Readme.md` (vulnerability explanation), `Payloads.md` (proof-of-concept inputs), `Fix.md` (remediation) and, where required, an `exploit.py` automation script.

| Module | Vulnerability | OWASP area |
| :--- | :--- | :--- |
| `module 0x0` | DOM-based Cross-Site Scripting (XSS) | Injection |
| `module 0x1` | Cross-Site Request Forgery (CSRF) | Broken access control |
| `module 1x0` | Server-Side Template Injection (SSTI) | Injection |
| `module 1x1` | XML External Entity Injection (XXE) | Security misconfiguration |
| `module 1x2` | SSRF + Local File Inclusion | SSRF / Broken access control |
| `module 2x1` | Insecure Deserialization (`pickle`) → RCE | Software and data integrity failures |
| `module 2x2` | AES-CBC bit-flipping, padding oracle, SQL injection | Cryptographic failures / Auth failures |

See [`Piscine Pro/README.md`](./Piscine%20Pro/README.md) for the module-by-module index.

#### Running a Pro lab

```bash
cd "Piscine Pro/module 1x1/pro_01"
docker compose up --build
# then open the port shown in docker-compose.yml / start.sh
```

Most labs also include an `err.log` and a `start.sh` helper, and some include Python exploit scripts (`exploit.py`) that need `requests` or `selenium`.

---

## 🧠 Skills Demonstrated

- **Offensive fundamentals:** reconnaissance, fuzzing, payload crafting, exploit scripting in Python.
- **Defensive thinking:** mapping each vulnerability to its OWASP category and writing concrete fixes (output encoding, parameterized queries, hardened XML parsers, anti-CSRF tokens, AEAD ciphers, safe deserialization formats).
- **Cryptography:** encodings vs. hashing, CBC malleability, padding oracles.
- **Networking:** subnetting, CIDR, routing and gateway configuration.
- **Tooling:** Linux/Bash, Git/GitHub, SSH, Docker/Docker Compose, CyberChef, John the Ripper, ffuf/gobuster-style fuzzers, exiftool.
- **Web development:** semantic HTML5, responsive CSS, vanilla JavaScript.

---

## 🚀 Getting Started

### Prerequisites

| Tool | Needed for |
| :--- | :--- |
| Git | cloning the repository |
| A Linux/Unix shell (or WSL) | shell, Linux & Git, CTF exercises |
| Python 3.x (+ `requests`, `selenium` for some scripts) | exploit scripts |
| Docker & Docker Compose | Piscine Pro labs |
| A modern web browser | HTML / CSS / JS / NetPractice / Portfolio |
| Optional: CyberChef, John the Ripper, exiftool, ffuf | CTF series |

### Clone

```bash
git clone https://github.com/ramiz-05/Piscine-Cybersecurity.git
cd Piscine-Cybersecurity
```

### View the web projects

Open any `index.html` directly in a browser, or serve a folder locally:

```bash
cd HTML/ex00 && python3 -m http.server 8000
```

### Launch the NetPractice+ simulator

```bash
cd "Project 05 — Networking/netpractice_plus"
bash run.sh
```

---

## 📝 Notes

- Folder names contain spaces and special characters (`Linux & Git`, `Piscine Pro`, `module 0x0`), so quote paths in the shell.
- Some folders contain duplicated content (for example `netpractice_plus (1)` and the `networking-solution/` copy of the level JSONs). These can be cleaned up without affecting anything.
- Each exercise is meant to be explainable during peer evaluation, so the write-ups focus on *why* something works, not only on the final answer.

---

## 👤 Author

**Ramez Abu Ramadan**, Software Engineering student
GitHub: [@ramiz-05](https://github.com/ramiz-05)

---

*Built during the 42 AMMAN Cybersecurity Piscine.*
