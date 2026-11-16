# Piscine Pro — Cybersecurity Professional Training

Index of completed modules/exercises. Each exercise keeps its own `Readme.md`, `Payloads.md`, and `Fix.md` inside its `exXX/` folder — this file is the top-level summary tying them together.

---

## Module 01

### ex00 — Server-Side Template Injection (SSTI) · *Cybersecurity 1x0*

- **Vulnerability:** SSTI (Jinja2-style template evaluation of user input).
- **What was confirmed:**
  - `{{7*7}}` → rendered as `49`, confirming expression evaluation.
  - `{{7*'7'}}` → rendered as `7777777`, confirming Jinja2-style string multiplication semantics.
  - Attempted file-read payload: `{{ cycler.__init__.__globals__.os.popen('cat /etc/passwd').read() }}`.
- **Status:** ⚠️ Per your own `Payload.md` notes, the file-read result is marked **"Pending verification — do not report successful file disclosure unless the response contains the file contents."** The README/Payloads.md elsewhere present it as if confirmed, but the raw test notes say it wasn't fully verified. Worth double-checking before calling this one done.
- **Fix documented:** Use `.textContent`/plain-text rendering instead of evaluating user input as template code (note: `Fix.md`'s code sample is actually an XSS-style DOM fix — `textContent` vs `innerHTML` — not an SSTI sandboxing fix like disabling Jinja2's `__globals__`/sandboxed environment. You may want to revise `Fix.md` so it actually addresses SSTI, e.g. using `Jinja2.sandbox.SandboxedEnvironment` or never passing user input into `render_template_string`.)
- **Bonus script (`exploit.py`):** Selenium automation skeleton. As uploaded, it won't run as-is:
  - `payloads` is used in the `for` loop but never defined.
  - A stray `Submit` token sits on its own line (not valid Python) right before `input_box.clear()`.
  - Needs those fixed before it can "reliably demonstrate the vulnerability" per the bonus requirement.
- **Files:** `Readme.md`, `Payloads.md` (+ duplicate `Payload.md`), `Fix.md`, `exploit.py`.

### ex01 — XML External Entity Injection (XXE) · *Cybersecurity 1x1*

- **Vulnerability:** XXE (CWE-611 / OWASP A05:2021), via a weakly configured XML parser resolving `SYSTEM` external entities.
- **Primary payload (file disclosure):**
  ```xml
  <!DOCTYPE foo [
    <!ENTITY xxe SYSTEM "file:///etc/passwd">
  ]>
  <root>&xxe;</root>
  ```
- **4 exploitation scenarios documented:**
  1. Arbitrary local file disclosure (in-band XXE).
  2. SSRF via `SYSTEM` pointing at internal/cloud-metadata endpoints.
  3. Denial of Service via recursive entities ("Billion Laughs").
  4. Blind/OOB data exfiltration via parameter entities + external DTD.
- **Fix documented:** Disable DTD processing and external entity resolution entirely — e.g. in Python, `defusedxml` or `lxml.etree.XMLParser(resolve_entities=False, no_network=True, load_dtd=False)`.
- **Files:** `Readme.md`, `Payloads.md`, `Fix.md`.

### ex02 — SSRF + LFI · *Cybersecurity 1x2*

- **Vulnerability:** SSRF chained with Local File Inclusion (a "fetch URL" feature that accepts `file://` or internal URIs).
- **Status:** No `Readme.md` / `Payloads.md` / `Fix.md` for this exercise were included in what you shared — only the subject PDF. Send those over and I'll fold them in here.

### Unmatched submission — "CSRF" (`/transfer` endpoint)

- Files `ex01_Readme_1.md`, `ex01_Fix_1.md`, `ex01_exploit_1.py` describe a **CSRF** vulnerability on a `/transfer` balance-draining endpoint — this doesn't match any subject you've shown me (1x0 SSTI, 1x1 XXE, 1x2 SSRF+LFI, 2x1 Deserialization, 2x2 Padding Oracle). It reads like it could belong to a **Module 02 / ex00** slot (no subject PDF for "Cybersecurity 2x0" was uploaded). Let me know which exercise this actually is so I can place it correctly instead of guessing.
- For reference, what's in it: unauthenticated `POST /transfer` with no anti-CSRF token / `SameSite` / `Origin` check; exploit script has 3 payloads (forged `urllib` POST, spoofed-origin `curl`, auto-submitting HTML PoC); fix recommends synchronizer tokens, `SameSite=Lax/Strict`, and `Origin`/`Referer` validation.

---

## Module 02

### ex01 — Insecure Deserialization → RCE · *Cybersecurity 2x1*

- **Vulnerability:** Unsafe `pickle.loads()` on user-supplied, base64-decoded data in a Flask app.
- **Exploit mechanism:** A class with a custom `__reduce__` tells `pickle` to invoke an arbitrary callable (stand-in `str("cat /etc/passwd")`, representing where `os.system`/`subprocess` would go) at unpickling time — code runs server-side.
- **Repro steps documented:** run `exploit.py` → generates base64 payload → paste into the "Enter Serialized Data" field → submit → server executes it, `/etc/passwd` contents shown in "Result:".
- **Files:** `Readme.md` (references `Payloads.md`/`Fix.md` for full payload/output and remediation — if you have those two, send them and I'll merge them in).

### ex02 — Cryptographic Failures: AES-CBC Bit-Flipping & Padding Oracle · *Cybersecurity 2x2*

- **Vulnerability classification:**
  - A02:2021 Cryptographic Failures — unauthenticated AES-128-CBC encryption (no MAC/AEAD), client-controlled IV, hardcoded key.
  - A03:2021 Injection — raw string concatenation into SQL queries.
  - A07:2021 Identification & Authentication Failures — identity/session trusted entirely from malleable client-side cookies.
- **Core attack — CBC bit-flipping privilege escalation:** since `P1 = D_K(C1) ⊕ IV`, and both `guest`/`admin` are 5 bytes with identical PKCS#7 padding, computing `IV' = IV ⊕ P1 ⊕ P'1` and swapping the `token` cookie flips the decrypted identity from `guest` to `admin` — no key required.
- **Secondary attack — Padding Oracle:** if the server distinguishes valid vs. invalid PKCS#7 padding in its responses, an attacker can recover `D_K(C1)` byte-by-byte and forge arbitrary plaintext without the key.
- **Status note:** interesting that the subject explicitly says *"No, you should not exploit this app using SQLI"* — worth double-checking your `Readme.md`/write-up leans on the CBC bit-flipping path as the intended solution rather than the SQL injection angle, since SQLi is called out as the wrong rabbit hole.
- **Files:** `Readme.md` (as `Readme_76dbe1.md`) — no separate `Payloads.md`/`Fix.md` seen for this one; the fix principles (AEAD like AES-GCM, server-side sessions, parameterized queries) are implied but not written up in their own file yet.

---

## Suggested next steps
1. Confirm which exercise the CSRF submission actually belongs to.
2. Send `ex02`'s (1x2 SSRF+LFI) README/Payloads/Fix if you have them.
3. Send Module 02 `ex01`'s `Payloads.md`/`Fix.md` (referenced but not included).
4. Write a dedicated `Payloads.md`/`Fix.md` for the Module 02 `ex02` padding-oracle exercise.
5. Double-check the SSTI file-read payload (ex00) actually returns file contents before marking it confirmed.
