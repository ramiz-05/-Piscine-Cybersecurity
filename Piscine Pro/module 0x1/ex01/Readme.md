# Vulnerability Report: Cross-Site Request Forgery (CSRF)

## Vulnerability Type
Cross-Site Request Forgery (CSRF)

## Explanation
The application contains a Cross-Site Request Forgery (CSRF) vulnerability on the `/transfer` endpoint. 

When a user submits a transfer request, the application relies solely on an unauthenticated `POST` request containing the `amount` parameter to process the transaction. It does not implement any CSRF defense mechanisms, such as anti-CSRF tokens, `SameSite` cookie attributes, or `Origin`/`Referer` header validation.

Because the server does not verify that the request originated from its own trusted frontend, an attacker can craft a malicious script or webpage that forces a victim's browser to send an unwanted `POST` request to `http://localhost:8080/transfer`. If the victim visits the attacker's page while running the application, their balance can be drained without their consent.
