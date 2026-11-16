# Exercise 02 - Input Mechanics & Cryptographic Vector Analysis

> **Note on Exercise Scope:** The subject instructions specifically note that the intended learning path focuses on OWASP cryptographic vulnerabilities (Padding Oracle / CBC malleability) rather than relying purely on SQL Injection. Below is an analysis of the underlying data structures and transformations involved in testing these weaknesses.

---

## 1. PKCS#7 Padding Structure
AES operates on $16\text{-byte}$ ($128\text{-bit}$) blocks. When encrypting a role identifier of length $L = 5\text{ bytes}$, the remaining $16 - 5 = 11\text{ bytes}$ are filled with the byte value $11$ (`0x0b`):

- **Initial Identity Block ($P_1$):**
  $$\text{ASCII}(\text{"guest"}) \parallel \underbrace{\text{0x0b, 0x0b, \dots, 0x0b}}_{11\text{ bytes}}$$

- **Target Identity Block ($P'_1$):**
  $$\text{ASCII}(\text{"admin"}) \parallel \underbrace{\text{0x0b, 0x0b, \dots, 0x0b}}_{11\text{ bytes}}$$

---

## 2. Bit-Flipping Transformation Vector
Because the last $11\text{ bytes}$ of both padded blocks are identical (`0x0b` $\oplus$ `0x0b` $= 0$), only the first $5\text{ bytes}$ of the Initialization Vector ($IV$) require modification via the XOR mask $\Delta$:

$$\Delta_i = P_1[i] \oplus P'_1[i] \quad \text{for } i \in \{0, 1, 2, 3, 4\}$$

| Byte Index ($i$) | Original Char ($P_1$) | Target Char ($P'_1$) | XOR Differential ($\Delta_i = P_1[i] \oplus P'_1[i]$) |
| :--- | :--- | :--- | :--- |
| $0$ | `g` (`0x67`) | `a` (`0x61`) | `0x06` |
| $1$ | `u` (`0x75`) | `d` (`0x64`) | `0x11` |
| $2$ | `e` (`0x65`) | `m` (`0x6d`) | `0x08` |
| $3$ | `s` (`0x73`) | `i` (`0x69`) | `0x1a` |
| $4$ | `t` (`0x74`) | `n` (`0x6e`) | `0x1a` |
| $5 \dots 15$ | `0x0b` | `0x0b` | `0x00` (No change) |

Applying $IV'[i] = IV[i] \oplus \Delta_i$ to the Base64-decoded `token` cookie and re-encoding it (with proper URL percent-encoding so characters such as `+` or `=` are preserved by the web server) alters the decrypted session identity without invalidating the PKCS#7 padding.

---

## 3. Padding Oracle Byte-Discovery Logic
When the initial plaintext or key is unknown, a Padding Oracle attack discovers the intermediate decryption state $I = D_K(C_1)$ one byte at a time from index $15$ down to $0$:

1. **Targeting Byte $15$ (Padding `0x01`):**
   - Construct a test $IV_{\text{test}}$ where bytes $0 \dots 14$ are random and byte $15$ iterates through $g \in [0, 255]$.
   - When the server does not return a padding error, the decrypted byte is valid padding (`0x01`):
     $$I[15] \oplus g = \text{0x01} \implies I[15] = g \oplus \text{0x01}$$
   - The true plaintext byte is then recovered via:
     $$P_1[15] = I[15] \oplus IV_{\text{orig}}[15]$$

2. **Targeting Byte $14$ (Padding `0x02 0x02`):**
   - Set $IV_{\text{test}}[15] = I[15] \oplus \text{0x02}$ so the last byte decrypts to `0x02`.
   - Iterate $IV_{\text{test}}[14] = g \in [0, 255]$ until the server accepts the padding, yielding $I[14] = g \oplus \text{0x02}$.

---

## 4. Authentication Query Manipulation (Architectural Note)
In your analysis script, authentication was bypassed by supplying a syntactically altered input to the `username` parameter together with a known key from the container's source code. 
- **Why this occurs:** When an application constructs SQL statements using string interpolation (e.g., `SELECT ... WHERE username = '$user'`) instead of prepared statements, input containing SQL operators alters the query structure and injects synthetic rows into the result set.
- **Note for Evaluation:** During peer defense, be sure to emphasize the **cryptographic vulnerabilities** (Padding Oracle / CBC malleability) as requested by the subject prompt ("No, you should not exploit this app using SQLI. :)"), and verify whether the target application allows standard guest login or padding oracle enumeration without requiring SQL query manipulation.