# Cybersecurity Discovery Piscine — Gecko Series

Documentation of my work on the Gecko00–Gecko03 exercises from the 42 Cybersecurity Discovery Piscine.

## Overview

This piscine introduces the basics of offensive cybersecurity: terminal navigation, OSINT, web security, and cryptography. The Gecko series focuses on **cryptography** — encodings, nested encodings, hashing, and password cracking.

---

## Gecko00 — Basic Encoding

**Difficulty:** Basic
**Goal:** Identify a common encoding scheme and decode a given string to find the flag.

- **Given data:**
  ```
  NDJCQ057YjQ1M182NF8xNV9jMDBsfQ==
  ```
- **Encoding identified:** Base64 (the trailing `==` padding is the giveaway).
- **Tool/method used:** CyberChef — "From Base64" recipe.
- **Command(s) run:**
  ```bash
  echo "NDJCQ057YjQ1M182NF8xNV9jMDBsfQ==" | base64 -d
  ```
- **Flag:** `42BCN{b453_64_15_c00l}`

---

## Gecko01 — Nested Encoding

**Difficulty:** Medium
**Goal:** Decode a string that has been encoded multiple times in sequence (nested encoding) to find the flag.

- **Given data:**
  ```
  4e 44 4a 43 51 30 35 37 59 6a 51 31 4d 31 38 32 4e 46 38 78 4e 56 39 6a 4d 44 42 73 58 32 4a 31 4e 31 39
  6f 4d 33 68 66 4d 54 56 66 59 7a 41 77 62 44 4e 79 66 51 3d 3d
  ```
- **Encoding layers identified (in order, outermost → innermost):**
  1. Hex (space-separated byte pairs)
  2. Base64
- **Tool/method used:** CyberChef — "From Hex" followed by "From Base64" (or chained manually in the shell).
- **Command(s) / recipe used:**
  ```bash
  # Step 1: hex -> ascii (reveals a base64 string)
  echo "4e 44 4a 43 51 30 35 37 59 6a 51 31 4d 31 38 32 4e 46 38 78 4e 56 39 6a 4d 44 42 73 58 32 4a 31 4e 31 39 6f 4d 33 68 66 4d 54 56 66 59 7a 41 77 62 44 4e 79 66 51 3d 3d" | xxd -r -p
  # -> NDJCQ057YjQ1M182NF8xNV9jMDBsX2J1N19oM3hfMTVfYzAwbDNyfQ==

  # Step 2: base64 -> plaintext
  echo "NDJCQ057YjQ1M182NF8xNV9jMDBsX2J1N19oM3hfMTVfYzAwbDNyfQ==" | base64 -d
  ```
- **Flag:** `42BCN{b453_64_15_c00l_bu7_h3x_15_c00l3r}`

---

## Gecko02 — Hash Cracking (Brute Force)

**Difficulty:** —
**Goal:** Understand why encodings are reversible but hashes are not, and break a hash via brute force to recover the clear-text password.

> Note: the uploaded subject PDF for Gecko02 only contains the cover, contents, and intro pages — the actual exercise page with the target hash wasn't included, so I couldn't decode it myself. Fill in below once you have it.

- **Hash given:**
  ```
  
  ```
- **Hash type identified:**
- **Tool/method used:**
- **Command(s) run:**
  ```
  
  ```
- **Flag:**

---

## Gecko03 — Hash Cracking (Custom Wordlist with John the Ripper)

**Difficulty:** Hard
**Goal:** Crack a provided hash using a custom wordlist built from a base wordlist and candidate words, using John the Ripper.

- **Hash:**
  ```
  c967d488512ab5559b446f97843de1be0d615088
  ```
- **Hash type identified:** SHA-1 (40 hex characters / 160-bit digest).
- **Base wordlist used:** (the "potential password words" the subject says were provided — not included in the uploaded PDF; fill in which file/words you used)
- **Custom wordlist generation method:** (e.g. permutations/mangling rules built from the base wordlist — describe your approach)
  ```
  
  ```
- **John the Ripper command(s):**
  ```bash
  john --wordlist=custom_wordlist.txt --format=raw-sha1 hash.txt
  john --show --format=raw-sha1 hash.txt
  ```
- **Flag:**

> Note: I couldn't crack this hash myself — the subject mentions a provided list of "words that could potentially be part of the hash," but that wordlist file wasn't part of the uploaded PDFs, so there's nothing to brute-force against. Paste your `flag.txt` result or wordlist and I'll fill this in.

---

## Notes

- All flags were written to `flag.txt` in their respective `exXX/` turn-in directories, as required by the subject (e.g. `/gecko/ex01`, `/gecko/ex03`).
- Each exercise must be completed and understood well enough to explain and justify the approach during peer evaluation.
