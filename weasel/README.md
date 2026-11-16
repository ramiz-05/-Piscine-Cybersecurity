# Cybersecurity Discovery Piscine — Weasel Series (Web Security)

Documentation of work on the Weasel00–Weasel03 exercises. This module covers common **web misconfigurations and vulnerabilities**: directory listing, fuzzing for hidden content, path traversal, and SQL injection.

---

## Weasel00 — Directory Listing Exposure

**Target:** `http://cybersec.[campus].[tld]:3317` · **Turn-in:** `ex00/flag.txt`

**Goal:** Exploit a website misconfiguration that leads to file exposure.

- **Vulnerability:** Directory listing enabled — the web server exposes its directory index (e.g. browsing to a folder with no `index.html`/index page shows the raw file listing instead of a 403/404), letting an attacker see and open files that were never meant to be linked from the site, including `flag.txt` itself.
- **Approach:** Browse the site's directory structure directly (no automated tools allowed per the subject) until a listable directory reveals `flag.txt`.
- **Flag:** `42BCN{f1r5tFl4gG00dJ08}`

---

## Weasel01 — Hidden Directory via Fuzzing

**Target:** `http://cybersec.[campus].[tld]:3318` · **Turn-in:** `ex01/flag.txt`

**Goal:** Find a hidden directory on the site.

- **Vulnerability:** Security-by-obscurity — a sensitive directory exists but isn't linked anywhere on the site, relying on its path being "secret" rather than actually protected.
- **Approach:** Fuzz the URL path with a wordlist (e.g. `ffuf`, `gobuster`, `dirb` / `dirbuster`) against common directory/file names to brute-force the hidden path, then navigate to it to retrieve the flag.
- **Flag:** `42BCN{m1ghtN33dT08ru73f0rc350m3t1m3s;)}` — the flag itself hints that brute-forcing (fuzzing) was the intended technique.

---

## Weasel02 — Path Traversal

**Target:** `http://cybersec.[campus].[tld]:3319` · **Turn-in:** `ex02/flag.txt`

**Goal:** Exploit a vulnerability to view content you're not supposed to see.

- **Vulnerability:** Path/directory traversal — a parameter that takes a filename/path doesn't sanitize `../` sequences, letting an attacker break out of the intended directory and read arbitrary files on the server (e.g. `?file=../../../../flag.txt` or similar).
- **Approach:** Identify the parameter that loads a file, then manipulate it with traversal sequences (`../`) to walk up the filesystem to the location of `flag.txt`.
- **Flag:** `42BCN{p47h7r4v3rs4l1s7h3w4y}`

---

## Weasel03 — SQL Injection Authentication Bypass

**Target:** `http://cybersec.[campus].[tld]:3320` · **Turn-in:** `ex03/flag.txt`

**Goal:** Bypass the login panel without valid credentials.

- **Vulnerability:** SQL Injection — the login form concatenates user input directly into a SQL query (e.g. `SELECT * FROM users WHERE username='<input>' AND password='<input>'`), so unsanitized input can alter the query's logic.
- **Approach:** Submit a classic auth-bypass payload in the username/password field (e.g. `' OR '1'='1' -- ` or `' OR 1=1#`) so the `WHERE` clause always evaluates true, logging in as admin without knowing real credentials.
- **Flag:** `42BCN{sql1nj3c710n_n1c3}`

---

## Notes

- All flags were written to `flag.txt` in their respective `exXX/` turn-in directories.
- Weasel00 and Weasel01 explicitly prohibit automated tools for *discovering the vulnerability* (manual browsing/testing required); fuzzing tools in Weasel01 were used for finding the hidden path itself rather than exploiting a known flaw, consistent with the subject's hint ("Fuzzing.").
- Each exercise's real target URL (`[campus].[tld]`) was resolved via the actual 42 campus environment rather than guessed.
