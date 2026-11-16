# Input Analysis & Payload Documentation

## 1. Anatomy of the Chained Vector
The test input used to verify this vulnerability consists of two main components working in tandem:

* **Component A (The SSRF Vector):** 
  Targeting the local loopback address (`127.0.0.1` or `localhost`) along with the specific internal application port (`5000`). This instructs the server's HTTP client to route the request internally rather than fetching an external web page.
* **Component B (The Path Traversal / LFI Vector):** 
  Passing the `?url=` query parameter containing multiple directory traversal sequences (`../`) followed by the target system file (`/etc/passwd`). Each traversal sequence instructs the filesystem to move one level up in the directory hierarchy until reaching the root directory (`/`).

## 2. Variations & Input Patterns Analyzed
During testing, different input structures can be evaluated to understand how the parser handles requests:

1. **Standard Loopback Targeting:**
   Using the standard IPv4 loopback address with relative path traversal to reach the system user configuration file.
2. **Hostname Resolution Alternative:**
   Substituting the numeric IP address with the `localhost` hostname to verify if the backend filter relies solely on string-matching numeric IP addresses.
3. **Alternative IP Representations:**
   Testing zero-Representations (such as `0.0.0.0`) or shortened IPv4 notation to evaluate how the underlying URL parser normalizes local addresses.
4. **URI Scheme Testing:**
   Evaluating whether the server's URL-fetching library supports non-HTTP protocols (such as the `file://` schema) to read local files directly without requiring an internal HTTP service.
5. **System Reconnaissance Targets:**
   Testing read access against standard non-sensitive system files (like `/etc/hosts` or `/proc/version`) to confirm the privilege level of the running web server process.

http://127.0.0.1:5000/fetch?url=file:///etc/passwd
