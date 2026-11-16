# Exercise 02 - Remediation Guide (`Fix.md`)

Securing the web application requires addressing the vulnerabilities across three layers: **Session Management**, **Cryptography**, and **Database Access**.

---

## 1. Use Server-Side Sessions Instead of Client-Side Identity Cookies
Storing user roles or authentication state inside client-side cookies (`ID` and `token`) exposes the application to tampering. Even encrypted cookies can be replayed or manipulated if not properly authenticated.

### Remediation
Use native server-side sessions (`$_SESSION` in PHP) where only a cryptographically random session identifier is sent to the user's browser, while the actual user identity (`guest` or `admin`) remains strictly on the server.

```php
// Secure Server-Side Session Management
session_start([
    'cookie_httponly' => true,
    'cookie_secure'   => true, // Enable when using HTTPS
    'cookie_samesite' => 'Strict',
    'use_strict_mode' => true
]);

// Upon successful authentication, regenerate the session ID to prevent session fixation
session_regenerate_id(true);
$_SESSION['user_role'] = $authenticated_role;
```

---

## 2. Replace Unauthenticated AES-CBC with Authenticated Encryption (AEAD)
If encrypted tokens must be transmitted to the client, **never use raw AES-CBC without integrity verification**. AES-CBC alone only provides confidentiality, not integrity, leaving it vulnerable to Bit-Flipping and Padding Oracle attacks.

### Remediation A: Use AES-GCM (Preferred)
Switch to an **Authenticated Encryption with Associated Data (AEAD)** algorithm like `aes-256-gcm` or `chacha20-poly1305` (via `libsodium`), which automatically verifies ciphertext and IV integrity via an authentication tag before outputting any plaintext.

```php
function encryptToken(string $plaintext, string $key): string {
    $cipher = "aes-256-gcm";
    $ivlen = openssl_cipher_iv_length($cipher);
    $iv = random_bytes($ivlen);
    $tag = "";
    
    $ciphertext = openssl_encrypt(
        $plaintext,
        $cipher,
        $key,
        OPENSSL_RAW_DATA,
        $iv,
        $tag,
        "",
        16 // 128-bit authentication tag
    );
    
    return base64_encode($iv . $tag . $ciphertext);
}

function decryptToken(string $encodedData, string $key): ?string {
    $cipher = "aes-256-gcm";
    $data = base64_decode($encodedData, true);
    if ($data === false || strlen($data) < 28) {
        return null;
    }
    
    $iv = substr($data, 0, 12);
    $tag = substr($data, 12, 16);
    $ciphertext = substr($data, 28);
    
    $plaintext = openssl_decrypt(
        $ciphertext,
        $cipher,
        $key,
        OPENSSL_RAW_DATA,
        $iv,
        $tag
    );
    
    // Returns null immediately if any bit in IV, ciphertext, or tag was modified
    return $plaintext !== false ? $plaintext : null;
}
```

### Remediation B: Encrypt-then-MAC (If CBC Must Be Used)
If legacy constraints require AES-CBC:
1. Compute an `HMAC-SHA256` over the concatenation of `(IV . Ciphertext)` using a dedicated authentication key.
2. Verify the HMAC using a constant-time comparison function (`hash_equals()`) **before** attempting decryption. This completely neutralizes both Bit-Flipping and Padding Oracle attacks because modified ciphertexts or IVs are rejected prior to decryption.

---

## 3. Eliminate Hardcoded Keys & Use Proper Password Hashing
1. **Environment Variables for Secrets:** Never hardcode `SECRET_KEY` in source files. Load high-entropy keys ($32\text{ bytes}$ for AES-256) from environment variables or a dedicated secrets manager outside the web root.
2. **One-Way Password Hashing:** User passwords stored in the database should never be encrypted with a reversible key. Use modern, salted, slow hashing algorithms via PHP's built-in `password_hash()` and `password_verify()` (using `PASSWORD_ARGON2ID` or `PASSWORD_BCRYPT`).

```php
// Storing a password securely
$hashedPassword = password_hash($password, PASSWORD_ARGON2ID);

// Verifying a password during login
if (password_verify($inputPassword, $row['password_hash'])) {
    // Login successful
}
```

---

## 4. Prevent SQL Injection via Prepared Statements
Never concatenate user input directly into SQL query strings. Use **Parameterized Queries (Prepared Statements)** via PDO or MySQLi so the database treats user input strictly as data rather than executable SQL syntax.

```php
// Secure Database Lookup using PDO Prepared Statements
$stmt = $pdo->prepare('SELECT id, username, password_hash, role FROM users WHERE username = :username LIMIT 1');
$stmt->execute(['username' => $_POST['username']]);
$user = $stmt->fetch(PDO::FETCH_ASSOC);

if ($user && password_verify($_POST['password'], $user['password_hash'])) {
    session_regenerate_id(true);
    $_SESSION['user_id'] = $user['id'];
    $_SESSION['role'] = $user['role'];
} else {
    // Return a generic error message to prevent username/padding enumeration
    http_response_code(401);
    echo "Invalid credentials.";
}
```

---

## References
- [OWASP Cryptographic Storage Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Cryptographic_Storage_Cheat_Sheet.html)
- [OWASP Session Management Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Session_Management_Cheat_Sheet.html)
- [OWASP SQL Injection Prevention Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/SQL_Injection_Prevention_Cheat_Sheet.html)