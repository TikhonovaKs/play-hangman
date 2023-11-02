const wordsArray = [
  'Apple',
  'Banana',
  'Computer',
  'Elephant',
  'Guitar',
  'Chocolate',
  'Diamond',
  'Butterfly',
  'Elephant',
  'Pineapple',
];

const buttonStart = document.querySelector('.start__button');
const addButton = document.querySelector('.form__button');
const resultWord = document.querySelector('.result__container');
const liveElement = document.querySelector('.lives__element');
const form = document.forms.formletter;
const letter = form.elements.letter;

// Get random word from array:
let randomWord = '';

buttonStart.addEventListener('click', function () {
  // Get random index from array:
  const randomIndex = Math.floor(Math.random() * wordsArray.length);

  // Get random element(word):
  randomWord = wordsArray[randomIndex];

  console.log(randomWord);
});

function addLetter(letterValue) {
  const letterTemplate = document.querySelector('#letter-template').content;
  const letterElement = letterTemplate.cloneNode(true);

  //check if the letter is in the selected word
  let hasLetterInWord = false;

  for (let i = 0; i < randomWord.length; i++) {
    if (randomWord[i] === letterValue) {
      //return letterValue;
      hasLetterInWord = true;
      //break;
    } else {
      liveElement.classList.remove('lives__element_is-opened');
    }
  }

  if (hasLetterInWord) {
    letterElement.querySelector('.right-letter').textContent = letterValue;

    resultWord.append(letterElement);
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
