# Fix

## Root cause
The application calls `pickle.loads()` on bytes that originate directly from
an HTTP request body/form field, with no restriction on what classes or
callables can be reconstructed. `pickle` is not a data format — it is a
serialized *program* for rebuilding Python objects, and unpickling is
documented by Python itself as unsafe for untrusted input.

## Recommended fix: stop using `pickle` for untrusted data
The correct fix is architectural, not a patch to `pickle.loads()`: never
deserialize untrusted input with `pickle` (or other "object graph" formats
like `yaml.load` without `SafeLoader`, PHP `unserialize`, Java native
serialization, etc.).

### 1. Replace `pickle` with a data-only format
If the goal is just to pass structured data (not live Python objects)
between client and server, use **JSON**:

```python
import json
from flask import request, render_template

@app.route("/", methods=["GET", "POST"])
def index():
    result = None
    if request.method == "POST":
        raw = request.form.get("data", "")
        try:
            result = json.loads(raw)   # data only, no code execution path
        except json.JSONDecodeError:
            result = "Invalid input"
    return render_template("index.html", result=result)
```

JSON parsing can only ever produce plain data (dicts, lists, strings,
numbers, booleans, null) — there is no mechanism for it to invoke arbitrary
callables, so this class of vulnerability is eliminated entirely.

### 2. If you must exchange Python objects internally
- Never accept pickled data over an untrusted channel (e.g. straight from a
  browser/form). Only unpickle data that is generated and stored
  server-side, never round-tripped through the client.
- If integrity between trusted services is required, sign the payload
  (e.g. HMAC) and verify the signature **before** unpickling, and restrict
  unpickling to a locked-down environment.
- Consider safer serialization alternatives purpose-built for this, such as
  `hmac`-signed tokens, `itsdangerous`, or Protocol Buffers, instead of
  raw `pickle`.

### 3. Defense in depth (even after removing `pickle`)
- Run the web service as a low-privileged, non-root user with a minimal
  filesystem and no unnecessary read access (so even an RCE has reduced
  blast radius).
- Add input validation/size limits on the submitted field.
- Keep dependencies patched and run the app behind a WAF/monitoring that can
  flag anomalous payloads.
- Add automated tests / CI checks (e.g. `bandit`) that flag use of
  `pickle.loads`, `yaml.load`, `eval`, `exec`, etc. on request data.

## Verification
After applying the JSON-based fix, resubmitting the original base64 pickle
payload from `Payloads.md` results in a `JSONDecodeError` (caught and
reported as "Invalid input") instead of command execution — confirming the
RCE path is closed.
