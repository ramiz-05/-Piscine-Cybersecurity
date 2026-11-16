# Remediation & Defensive Measures

To fully secure the web application, remediation must address both the Server-Side Request Forgery (SSRF) and the Local File Inclusion (LFI) vulnerabilities at the code and infrastructure levels.

## 1. Mitigating Server-Side Request Forgery (SSRF)

* **Implement a Strict Allowlist (Whitelist):**
  Instead of allowing users to fetch arbitrary URLs, maintain a strict allowlist of trusted domains and protocols. Reject any request that does not explicitly match the approved list.
* **Validate and Restrict IP Addresses:**
  Before the server initiates an HTTP request, parse the URL to extract the hostname, resolve it to its IP address, and verify that it does not belong to private or reserved IP ranges (e.g., `127.0.0.0/8`, `10.0.0.0/8`, `172.16.0.0/12`, `192.168.0.0/16`, or `169.254.169.254`).
* **Enforce Protocol Restrictions:**
  Configure the HTTP client library to only permit `http://` and `https://` schemas. Explicitly disable dangerous URI schemas such as `file://`, `gopher://`, `dict://`, and `ftp://`.
* **Disable HTTP Redirects:**
  Prevent the server's HTTP client from automatically following redirects (`301`/`302`), as an external domain on the allowlist could redirect the server's request to an internal loopback address.

## 2. Mitigating Local File Inclusion (LFI) & Path Traversal

* **Avoid Passing User Input Directly to Filesystem APIs:**
  Never pass raw user-supplied parameters directly into file-reading functions. Instead, use an indirect reference map (e.g., mapping a static ID like `file_id=1` to a hardcoded, safe filename on the server).
* **Input Sanitization and `basename` Extraction:**
  If user input must be used to reference a file, strip all path information using built-in language functions (such as `os.path.basename()` in Python or `basename()` in PHP) so that only the final filename is retained, neutralizing any `../` sequences.
* **Path Canonicalization and Prefix Validation:**
  Resolve the absolute canonical path of the requested file (e.g., using `os.path.realpath()`) and strictly verify that the resolved path starts with the intended base directory path (e.g., `/var/www/app/public_files/`). If the resolved path falls outside this directory, block the request immediately.



