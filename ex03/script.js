const numberView = document.getElementById('numberView');
const btninc = document.getElementById('btninc');
const btndec = document.getElementById('btndec');
const btnreset = document.getElementById('btnreset');

let count = 0;

function updateDisplay() {
  numberView.textContent = count;
}

function handleinc() {
  count++;
  updateDisplay();
}

function handledec() {
  count--;
  updateDisplay();
}

function handlereset() {
  count = 0;
  updateDisplay();
}

btninc.addEventListener('click', handleinc);
btndec.addEventListener('click', handledec);
btnreset.addEventListener('click', handlereset);
