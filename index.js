import { letters, capitalLetters, numbers, symbols } from "./alphabetToNumbers.js";

function getLength() {
  //targetting the <select> element
  const selectElement = document.querySelector('select');

  let value;

  //Array.from() converts the <select> element into a real array
  //this allows us to use the forEch method
  Array.from(selectElement.selectedOptions).forEach((option) => {
    value = option.value;
  });

  //cast to int
  return Number(value);
}

function getRandomNumbers() {
  
  let characters = 26;
  let characterToAdd = updateCharacterList();
  let totalOfCharacters = characters + characterToAdd;

  const length =  getLength();
  let nums = [];

  for(let i = 0; i < length; i++) {
    nums.push(Math.floor(Math.random() * totalOfCharacters) + 1); 
  }

  return nums;
}

function passToLetters() {
  
  const arrOfNumbers = getRandomNumbers();
  let password = '';

  for(let i = 0; i < arrOfNumbers.length; i++) {
    let val = arrOfNumbers[i];
    password += letters[val];
  }
  
  return password;
}

function displayPassword() {

  //data-* is a way to sotre custom data, which can be used later on with js

  document.querySelector('.js-password-text').innerHTML =  `
  <div class="testing-container">

    <div class="container-for-password">
      <p class="text-1">1: ${passToLetters()} </p>
      <p class="text-2">2: ${passToLetters()} </p>
      <p class="text-3">3: ${passToLetters()} </p>
      <p class="text-4">4: ${passToLetters()} </p>
      <p class="text-5">5: ${passToLetters()} </p>
    </div>

    <div class="container-for-buttons">
      <button class="copy-button" data-value="1">copy</button>
      <button class="copy-button" data-value="2">copy</button>
      <button class="copy-button" data-value="3">copy</button>
      <button class="copy-button" data-value="4">copy</button>
      <button class="copy-button" data-value="5">copy</button>
    </div>

  </div>  
  `;

  // Attach event listeners to the newly created copy buttons
  //cus if we add it outta the function it wont work since the buttons
  //have not been created yet
  document.querySelectorAll('.copy-button').forEach((element) => {
    element.addEventListener('click', (event) => {
      const value = event.target.getAttribute('data-value'); // getting the data-value
      copyToClipboard(value);
      changeCopyButtonText(event.target); // passing the clicked button
    });
  });

}

document.querySelector('.js-generate-button').addEventListener('click', displayPassword);

document.addEventListener('keydown', (event) => {
  if(event.key === 'g') {
    displayPassword();
  } 
});

function copyToClipboard(value) {

  // targetting the text pressed, based on the value passed
  const paragraph = document.querySelector(`.text-${value}`);

  // getting rid off the word 'copy' after the paragraph
  const fullText = paragraph.firstChild.nodeValue.trim();

  // Extract the password by splitting at the colon and trimming
  //this takes everything after the fisrt color : 
  const password = fullText.substring(fullText.indexOf(':') + 1).trim();

  // Use the Clipboard API to copy the text, copying it to the clipboard
  navigator.clipboard.writeText(password);

}

function changeCopyButtonText(buttonElement) {
 
  if(buttonElement.innerText === 'copy') {
    buttonElement.innerText = 'copied';
  }
  else if(buttonElement.innerText === 'copied') {
    buttonElement.innerText = 'copy';
  }

}

let has_been_increased_letters = false;
let has_been_increased_numbers = false;
let has_been_increased_symbols = false;
let charactersToAdd = 0;

function updateCharacterList() {
  const checkbox_capital_letters = document.querySelector('.checkbox-capital-letters');
  const checkbox_numbers = document.querySelector('.checkbox-include-numbers');
  const checkbox_symbols = document.querySelector('.checkbox-include-symbols');

  let size;

  if(checkbox_capital_letters.checked && has_been_increased_letters === false) {
    charactersToAdd += 26;

    size = Object.keys(letters).length;

    addElements(size, 26, letters, capitalLetters);

    has_been_increased_letters = true;

  }
  else if(!checkbox_capital_letters.checked && has_been_increased_letters === true) {

    size = Object.keys(letters).length;

    removeElements(size, 26, letters);

    charactersToAdd -= 26;  
    has_been_increased_letters = false;

  }

  if(checkbox_numbers.checked && has_been_increased_numbers === false) {
    charactersToAdd += 10;

    size = Object.keys(letters).length;

    addElements(size, 10, letters, numbers);

    has_been_increased_numbers = true;
    
  }
  else if(!checkbox_numbers.checked && has_been_increased_numbers === true) {

    size = Object.keys(letters).length;
  
    removeElements(size, 10, letters);

    charactersToAdd -= 10;
    has_been_increased_numbers = false;

  }

  if(checkbox_symbols.checked && has_been_increased_symbols === false) {
    charactersToAdd += 30;

    size = Object.keys(letters).length;

    addElements(size, 30, letters, symbols);

    has_been_increased_symbols = true;

  }
  else if(!checkbox_symbols.checked & has_been_increased_symbols === true) {
    size = Object.keys(letters).length;

    removeElements(size, 30, letters);

    charactersToAdd -= 30;
    has_been_increased_symbols = false;

  }

  return charactersToAdd;

}

function addElements(size, quantity, letters, objectToAdd) {
  //adding the elements from a new object to the letters object
  for(let i = 1; i <= quantity; i++) {
    letters[size + i] = objectToAdd[i];
  }
}

function removeElements(size, quantity, letters) {
  //this way we keep track of when we added the numbers
  for(let i = size; i > size - quantity; i--) {
    delete letters[i];
  }
}
