How to Fix and Prevent XSS Vulnerabilities

## 1. Use `textContent` or `innerText`
Never insert untrusted user input directly into `.innerHTML`. Using `.textContent` instructs the browser to treat the input strictly as plain text.

## 2. Remove Dynamic `<script>` Creation
Never pass user input into dynamically created `<script>` elements. 

### Corrected Code for `index.html`:
```html
<script>
    function displayText() {
        var userInput = document.getElementById("inputText").value;
        var outputDiv = document.getElementById("output");
        outputDiv.textContent = ""; // Clear previous content

        var boldElement = document.createElement("b");
        boldElement.textContent = userInput; // Safely inserts as plain text
        outputDiv.appendChild(boldElement);
    }
</script>
