# Exercise 01: XML External Entity (XXE) Injection

## Vulnerability Overview
The web application is vulnerable to **XML External Entity (XXE) Injection** (classified under **OWASP Top 10 - A05:2021 Security Misconfiguration** / **CWE-611**). 

An XXE vulnerability occurs when an application parses untrusted XML input using a weakly configured XML parser that processes **Document Type Definitions (DTDs)** and resolves **External Entities**.

## Technical Explanation
The XML standard allows documents to define custom entities (variables) within a `<!DOCTYPE>` declaration. By using the `SYSTEM` keyword, an entity can be instructed to fetch its content from an external URI (such as `file://`, `http://`, or `php://`) rather than a static string.

In this application:
1. The user submits raw XML through the web form.
2. The backend XML parser processes the `<!DOCTYPE>` header and resolves the `SYSTEM` entity by accessing the server's local filesystem (`file:///etc/passwd`).
3. The parser substitutes `&xxe;` in the `<root>` element with the raw contents of `/etc/passwd` and reflects the parsed output back to the user interface.

## 4 Exploitation Scenarios
As required by the project guidelines, here are 4 distinct ways an XXE vulnerability can be exploited in real-world environments:

1. **Arbitrary Local File Disclosure (In-Band XXE):**
   An attacker defines an external entity pointing to local system files (e.g., `file:///etc/passwd`, `/etc/hosts`, `.env`, or `~/.ssh/id_rsa`) and reads sensitive configuration data or credentials directly in the application's HTTP response.

2. **Server-Side Request Forgery (SSRF):**
   By setting the `SYSTEM` URI to an internal network address (e.g., `http://127.0.0.1:8080/admin` or cloud metadata endpoints like `http://169.254.169.254/latest/meta-data/`), an attacker forces the vulnerable server to make HTTP requests to internal services that are not directly accessible from the public internet.

3. **Denial of Service (DoS) via Recursive Entities ("Billion Laughs" Attack):**
   An attacker constructs deeply nested internal entities (where `lol9` references ten `lol8` entities, which reference ten `lol7` entities, and so on). A payload under 1 KB expands exponentially into several gigabytes in memory during parsing, exhausting server RAM and CPU resources.

4. **Blind / Out-of-Band (OOB) Data Exfiltration:**
   When the application does not display the parsed XML in the response, an attacker uses XML Parameter Entities (`%`) to load an external DTD hosted on an attacker-controlled server. This triggers the victim server to send sensitive local file contents as a URL parameter or FTP request to the attacker's listener.

## Sources & References
* [OWASP XML External Entity (XXE) Processing](https://owasp.org/www-community/vulnerabilities/XML_External_Entity_(XXE)_Processing)
* [OWASP XXE Prevention Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/XML_External_Entity_Prevention_Cheat_Sheet.html)
* [PortSwigger Web Security Academy: XXE Injection](https://portswigger.net/web-security/xxe)
* [CWE-611: Improper Restriction of XML External Entity Reference](https://cwe.mitre.org/data/definitions/611.html)
