# SSTI Vulnerability

## Vulnerability Type

Server-Side Template Injection (SSTI)

## Description

Server-Side Template Injection (SSTI) is a web security vulnerability that occurs when user input is interpreted as template code by the server.

## Impact

An attacker may:

- Read sensitive files.
- Access confidential information.
- Execute server-side commands in some configurations.
- Potentially compromise the application.

## Proof of Concept

The application does not properly handle user input in server-side templates.

Example payload:

```jinja2
{{7*7}}
```

When the payload is evaluated, the application displays:

```text
Hello, { 49 }!
```

This confirms that template expressions are evaluated by the application, indicating a potential SSTI vulnerability.


