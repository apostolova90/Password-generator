
// the slider links up with the number box, next to itself

const characterAmountRange = document.getElementById('characterAmountRange')
const characterAmountNumber = document.getElementById('characterAmountNumber')

characterAmountNumber.addEventListener('input', syncCharacterCount)
characterAmountRange.addEventListener('input', syncCharacterCount)

function syncCharacterCount(e) {
  const value = e.target.value
  characterAmountNumber.value = value
  characterAmountRange.value = value
}


// generating the password (instead of refreshing the page)
const form = document.getElementById('passwordGeneratorForm')

const includeUppercaseElement = document.getElementById('includeUppercase') // we get the value under includeUppercase (checked or not)
const includeNumbersElement = document.getElementById('includeNumbers') // we get the value under includeNumbers (checked or not)
const includeSymbolsElement = document.getElementById('includeSymbols') // we get the value under includeSymbols (checked or not)

const generatedPassword = document.getElementById('generatedPassword')

const UPPERCASE_CHAR_CODES = arrayFromLowToHigh(65, 90)
const LOWERCASE_CHAR_CODES = arrayFromLowToHigh(97, 122)
const NUMBER_CHAR_CODES = arrayFromLowToHigh(48, 57)
const SYMBOL_CHAR_CODES = arrayFromLowToHigh(33, 47).concat(
  arrayFromLowToHigh(58, 64)
).concat(
  arrayFromLowToHigh(91, 96)
).concat(
  arrayFromLowToHigh(123, 126)
)


form.addEventListener('submit', e => { // the program will look for the action 'submit', and will do the action below every time
  e.preventDefault()
  const characterAmount = characterAmountNumber.value // we get the actual value under characterAmountNumber (5,6,9 ....)
  const includeUppercase = includeUppercaseElement.checked // we check if the checkbox for Uppercase was checked
  const includeNumbers = includeNumbersElement.checked // we check if the checkbox for Numbers was checked
  const includeSymbols = includeSymbolsElement.checked // we check if the checkbox for Symbols was checked
  const password = generatePassword(characterAmount, includeUppercase, includeNumbers, includeSymbols) // we call the function below
  generatedPassword.innerText = password
})

function generatePassword(characterAmount, includeUppercase, includeNumbers, includeSymbols) {
  let charCodes = LOWERCASE_CHAR_CODES // we set this as a default
  if (includeUppercase) charCodes = charCodes.concat(UPPERCASE_CHAR_CODES)
  if (includeSymbols) charCodes = charCodes.concat(SYMBOL_CHAR_CODES)
  if (includeNumbers) charCodes = charCodes.concat(NUMBER_CHAR_CODES)
  
  const passwordCharacters = []
  for (let i = 0; i < characterAmount; i++) {
    const characterCode = charCodes[Math.floor(Math.random() * charCodes.length)]
    passwordCharacters.push(String.fromCharCode(characterCode))
  }
  return passwordCharacters.join('')
}

function arrayFromLowToHigh(low, high) { // we loop from one position in the ASCII table to another
  const array = [] 
  for (let i = low; i <= high; i++) { // for example in the line here: const UPPERCASE_CHAR_CODES = arrayFromLowToHigh(65, 90)    -     low is 65, high is 90
    array.push(i)
  }
  return array
}
