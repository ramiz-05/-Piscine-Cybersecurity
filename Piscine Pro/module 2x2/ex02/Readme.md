# Exercise 02 - Cryptographic Failures & Authentication Bypass

## Overview
This module focuses on identifying and remediating vulnerabilities related to **Cryptographic Failures** (formerly Sensitive Data Exposure) and **Injection / Broken Authentication** within a web application login flow. Specifically, the application demonstrates the risks of using unauthenticated encryption modes—specifically **AES in Cipher Block Chaining (CBC) mode**—to store and verify session state and user identity in client-side cookies, alongside improper database query handling.

---

## Vulnerability Classification (OWASP Top 10)
1. **A02:2021 – Cryptographic Failures**: 
   - **Unauthenticated Encryption (Malleability):** The application uses AES-128-CBC to encrypt session identifiers without a Message Authentication Code (MAC) or an Authenticated Encryption with Associated Data (AEAD) mode (such as AES-GCM).
   - **Client-Controlled Initialization Vector (IV):** The Initialization Vector (`token` cookie) is sent to and trusted from the client without integrity verification.
   - **Hardcoded Cryptographic Keys:** The secret encryption key is hardcoded directly in the source code and exceeds or mismatches standard length expectations without proper key derivation.

2. **A03:2021 – Injection**:
   - User-supplied input in the login form is concatenated directly into SQL queries rather than using parameterized queries (prepared statements), allowing authentication logic manipulation.

3. **A07:2021 – Identification and Authentication Failures**:
   - Session state relies entirely on reversible, malleable client-side cookies (`ID` and `token`) rather than server-side session management.

---

## Technical Mechanics of the Vulnerabilities

### 1. AES-CBC Bit-Flipping Attack
In Cipher Block Chaining (CBC) mode, each plaintext block $P_i$ is XORed with the previous ciphertext block $C_{i-1}$ before being encrypted with the block cipher key $K$. For the very first block $P_1$, the Initialization Vector ($IV$) acts as $C_0$:

$$P_1 = D_K(C_1) \oplus IV$$

Because the application stores the $IV$ inside the user-accessible `token` cookie and does not verify its integrity (e.g., via HMAC), an attacker who knows the original plaintext block $P_1$ (such as a default role string like `guest`) can manipulate the $IV$ to produce an arbitrary target plaintext $P'_1$ (such as `admin`) upon decryption:

$$IV' = IV \oplus P_1 \oplus P'_1$$

When the server decrypts $C_1$ using the modified $IV'$, the mathematical operation resolves to:

$$D_K(C_1) \oplus IV' = D_K(C_1) \oplus (IV \oplus P_1 \oplus P'_1) = (D_K(C_1) \oplus IV) \oplus P_1 \oplus P'_1 = P_1 \oplus P_1 \oplus P'_1 = P'_1$$

### 2. Padding Oracle Mechanics
When block ciphers like AES operate in CBC mode on data that is not an exact multiple of the block size ($16\text{ bytes}$), padding (commonly **PKCS#7**) is appended so the plaintext fits the block boundary.
- If a $5\text{-byte}$ string (e.g., `guest`) is padded to $16\text{ bytes}$, $11\text{ bytes}$ of value `0x0b` ($11$ in decimal) are appended.
- If an application behaves differently when decryption fails due to invalid padding versus when padding is valid (a **Padding Oracle**), an attacker can iteratively modify ciphertext/IV bytes and observe server responses to decrypt ciphertext or encrypt arbitrary plaintext without ever knowing the secret key $K$.

---

## Exploitation Scenarios

### Scenario 1: Privilege Escalation via Cookie Tampering (CBC Bit-Flipping)
An authenticated low-privilege user (`guest`) receives two cookies upon login: an encrypted identity (`ID`) and the Initialization Vector (`token`). Because both strings (`guest` and `admin`) are $5\text{ bytes}$ long and share identical PKCS#7 padding (`0x0b` repeated $11\text{ times}$), a user can XOR the decoded `token` bytes with the difference between the known plaintext and desired role. Upon refreshing the page, the server decrypts the identity as `admin` and grants administrative access.

### Scenario 2: Padding Oracle Plaintext Recovery & Forgery
In an environment where the server returns distinct HTTP status codes or error messages when PKCS#7 padding validation fails during cookie decryption, an external party without access to the source code or `SECRET_KEY` can send systematically modified IV/ciphertext pairs. By detecting when the server accepts the padding (`0x01`, `0x02 0x02`, etc.), the intermediate state $D_K(C_1)$ can be deduced byte-by-byte, revealing sensitive session contents or allowing full token forgery.

---

## References
- [OWASP Top 10:2021 - A02 Cryptographic Failures](https://owasp.org/Top10/A02_2021-Cryptographic_Failures/)
- [OWASP Testing Guide - Testing for Padding Oracle](https://owasp.org/www-project-web-security-testing-guide/latest/4-Web_Application_Security_Testing/09-Testing_for_Weak_Cryptography/02-Testing_for_Padding_Oracle)
- [NIST SP 800-38A: Recommendation for Block Cipher Modes of Operation](https://csrc.nist.gov/publications/detail/sp/800-38a/final)