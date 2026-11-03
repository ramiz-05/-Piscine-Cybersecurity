# Deserialization RCE Challenge — Vulnerable Flask App

## Overview
This project demonstrates a **Remote Code Execution (RCE)** vulnerability caused by
unsafe use of Python's `pickle` module to deserialize untrusted, user-supplied data
in a Flask web application.

The target application exposes a single form at `http://127.0.0.1:5000/` that:
1. Accepts a base64-encoded string from the user ("Enter Serialized Data").
2. Base64-decodes it.
3. Passes the decoded bytes directly to `pickle.loads()`.
4. Renders whatever the deserialization returns (or executes, via `__reduce__`)
   back to the page under "Result:".

Because `pickle.loads()` will happily execute arbitrary code embedded in a
malicious pickle stream, any user able to reach this endpoint can achieve
code execution with the privileges of the Flask process.



## How the exploit works (summary)

`exploit.py` defines a class whose `__reduce__` method tells `pickle` to call
`str("cat /etc/passwd")` — in practice, a harmless placeholder standing in for
`os.system`/`subprocess` style calls, since `__reduce__` can point pickle at
*any* callable with *any* arguments at unpickling time. When the server calls
`pickle.loads()` on the submitted data, Python reconstructs the object by
invoking that callable, which runs on the server rather than returning data.

Steps to reproduce:
1. Run `python3 exploit.py` to generate a base64 payload.
2. Paste the payload into the "Enter Serialized Data" field on the vulnerable
   app's home page and click Submit.
3. The server deserializes the payload and the "Result:" section displays the
   contents of `/etc/passwd`, confirming command execution on the server.

See `Payloads.md` for the full payload and captured output, and `Fix.md` for
how to remediate the vulnerability.
