# Vulnerability Documentation: SSRF & Local File Inclusion (LFI)

## 1. Vulnerability Type
This web application suffers from a chained vulnerability combining two distinct security flaws:
1. **Server-Side Request Forgery (SSRF):** The application accepts a user-supplied URL and fetches its content from the server side without validating the destination host or restricting access to internal network resources.
2. **Local File Inclusion (LFI) / Path Traversal:** An internal service running on the server processes a file path parameter without sanitizing directory traversal sequences, allowing unauthorized read access to arbitrary files on the underlying operating system.

## 2. Technical Explanation
When a user submits a URL pointing to the server's loopback interface (localhost) on its internal port, the backend application initiates an HTTP request to itself. Because the request originates from the trusted local machine, it bypasses external network perimeter defenses. Furthermore, the internal endpoint accepts a query parameter that directly interacts with the local filesystem. By supplying relative path traversal sequences (dot-dot-slash), the request breaks out of the intended web root directory and traverses up to the root filesystem, enabling the retrieval of sensitive system files.

## 3. Exploitation Scenarios
* **Scenario 1: Internal Network Reconnaissance and Port Scanning (via SSRF):**
  An unauthorized actor can manipulate the URL input to target internal IP addresses and varied port numbers. By analyzing the server's response times or error messages, the actor can map out internal infrastructure, discover unexposed administrative panels, or interact with internal databases (such as Redis or MySQL) that only trust local connections.
* **Scenario 2: Sensitive Data and Source Code Exposure (via LFI):**
  Once connected to the vulnerable file-reading endpoint, an actor can traverse the directory structure to read application configuration files (such as environment variable files or database configurations), exposing API keys, database credentials, and proprietary source code, which could lead to complete system compromise.

