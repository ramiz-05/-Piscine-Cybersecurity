const titleElement = document.getElementById('main-title');
const firstParagraph = document.querySelector('.description');
const secondParagraph = document.getElementById('second-paragraph');
const subTitleElement = document.querySelector('.sub-title');

titleElement.textContent = 'Updated Title dynamically';
titleElement.style.color = 'blue';

firstParagraph.classList.add('active');

secondParagraph.style.color = 'red';
secondParagraph.style.fontSize = '24px';

subTitleElement.textContent = 'Subtitle changed safely';
