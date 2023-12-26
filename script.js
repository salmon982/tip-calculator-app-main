document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('#form');
  const billInput = document.querySelector('#bill');
  const tipInputs = document.querySelectorAll('.radio-input');
  const customTipInput = document.querySelector('#custom');
  const numPeopleInput = document.querySelector('#people');
  const resetButton = document.querySelector('.button');
  const errorMessage = document.querySelector('.error-message');
  const tipAmount = document.querySelector('.tip-amount h1');
  const tipTotal = document.querySelector('.tip-total h1');

  form.addEventListener('input', () => {
    calculateTips();
    updateResetButton();
    updateErrorMessage();
  });

  resetButton.addEventListener('click', () => {
    form.reset();
    errorMessage.style.opacity = '0';
    numPeopleInput.style.border = 'none';
    tipAmount.textContent = '$0.00';
    tipTotal.textContent = '$0.00';
    calculateTip();
    updateResetButton();
  })

  function calculateTips() {
    let bill = billInput.value;
    let numPeople = parseInt(numPeopleInput.value);

    if (numPeople === 0) {
      errorMessage.style.opacity = "1";
      numPeopleInput.style.border = '1px solid red';
      tipAmount.textContent = '$0.00';
      tipTotal.textContent = '$0.00';
      return;
    };

    let tipPercentage = getTipPercentage();

    if (bill && tipPercentage && numPeople) {
      const tipPerPerson = (bill * tipPercentage) / numPeople;
      const totalPerPerson = bill / numPeople + tipPerPerson;

      tipAmount.textContent = `$${tipPerPerson.toFixed(2)}`;
      tipTotal.textContent = `$${totalPerPerson.toFixed(2)}`;
    } else {
      tipAmount.textContent = '$0.00';
      tipTotal.textContent = '$0.00';
    }
  };

  function getTipPercentage() {
    let tipPercentage = NaN;

    tipInputs.forEach((input) => {
      if (input.checked) {
        tipPercentage = parseFloat(input.value);
      };
    });

    if (customTipInput.value !== '') {
      tipPercentage = customTipInput.value / 100;
      tipInputs.forEach((input) => {
        input.checked = false;
      })
    };

    return tipPercentage;
  };

  function updateResetButton() {
    let formEmpty = !billInput.value && !getTipPercentage() && !numPeopleInput.value;
    resetButton.classList.toggle('disabled', formEmpty);
  };

  function updateErrorMessage() {
    let numPeople = parseInt(numPeopleInput.value);
    if (numPeople === 0) {
      errorMessage.style.opacity = "1";
      numPeopleInput.style.border = "1px solid red";
      tipAmount.textContent = '$0.00';
      tipTotal.textContent = '$0.00';
    } else {
      errorMessage.style.opacity = "0";
      numPeopleInput.style.border = "none";
    }
  };
});
