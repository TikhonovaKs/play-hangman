const wordsArray = [
  'dog',
  'cat',
  'elephant',
  'lion',
  'tiger',
  'giraffe',
  'zebra',
  'bear',
  'penguin',
  'dolphin',
  'whale',
  'shark',
  'eagle',
  'owl',
  'rabbit',
  'fox',
  'horse',
  'cow',
  'pig',
  'sheep',
  'goat',
  'duck',
  'goose',
  'fish',
  'snake',
];

const buttonStart = document.querySelector('.start__button');
const addButton = document.querySelector('.form__button');
const resultWord = document.querySelector('.result__container');
const liveElement = document.querySelector('.lives__element');
const wordElement = document.querySelector('.word__elements');
const form = document.forms.formletter;
const letter = form.elements.letter;

// Get random word from array:
let randomWord = '';
let lettersArrayOfRandomWord = [];

buttonStart.addEventListener('click', function () {
  const randomIndex = Math.floor(Math.random() * wordsArray.length);
  randomWord = wordsArray[randomIndex];

  lettersArrayOfRandomWord = randomWord.split('');

  lettersArrayOfRandomWord.forEach((letter) => {
    const cellTemplate = document.querySelector('#cell-template').content;
    const cellElement = cellTemplate.cloneNode(true);

    cellElement.querySelector('.letter-name').textContent = letter;
    wordElement.append(cellElement);
  });
});

function addLetter(letterValue) {
  let hasMatch = false;

  // let hasMatchAll = true;

  lettersArrayOfRandomWord.forEach((item, index) => {
    if (item === letterValue) {
      const rightLetter = document.querySelectorAll('.letter-name')[index];
      rightLetter.textContent = item; // Set the content to the matched letter
      rightLetter.classList.add('letter-name_is-opened');
      hasMatch = true;
    }
    // if (!document.querySelectorAll('.letter-name')[index].classList.contains('letter-name_is-opened')) {
    //   hasMatchAll = false; // If any letter is not matched, set hasMatchAll to false
    // }
  });

  if (!hasMatch) {
    const listOfLives = document.querySelectorAll('.lives__element');

    const lastLife = listOfLives[listOfLives.length - 1];
    lastLife.remove();
  }
}



// form
// swith button condition
function setSubmitButtonState(isFormValid) {
  if (isFormValid) {
    addButton.removeAttribute('disabled');
    addButton.classList.remove('form__button_disabled');
  } else {
    addButton.setAttribute('disabled', true);
    addButton.classList.add('form__button_disabled');
  }
}

// attach a submit event handler to the form
form.addEventListener('submit', function (evt) {
  // cancel the default behavior
  evt.preventDefault();

  // check user data
  addLetter(letter.value);

  // reset field after submitiom
  form.reset();

  setSubmitButtonState(false);
});

// attach a input event handler to the form
form.addEventListener('input', function (evt) {
  const isValid = letter.value.length > 0;

  setSubmitButtonState(isValid);
});
