o protect the web application from this vulnerability, the following security measures should be implemented:

1. **Implement Anti-CSRF Tokens (Synchronizer Token Pattern):**
   The server should generate a unique, cryptographically strong, and unpredictable session token. This token must be included as a hidden field in the HTML `<form>` and verified by the server upon every `POST` request. If the token is missing or invalid, the transaction should be rejected.

2. **Use `SameSite` Cookie Attributes:**
   If the application uses session cookies for authentication, they should be configured with the `SameSite=Lax` or `SameSite=Strict` attribute. This instructs the browser not to send the session cookie along with cross-site requests, neutralizing CSRF attacks originating from malicious domains.

3. **Validate `Origin` and `Referer` Headers:**
   The backend server should inspect the `Origin` and `Referer` HTTP headers on state-changing requests (like `/transfer`) to ensure the request strictly originated from `http://localhost:8080` and reject requests from unrecognized origins.
