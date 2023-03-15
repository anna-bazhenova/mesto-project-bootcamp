// добавление слушателя для всех инпутов всех форм
const enableValidation = (config) => {
  const formsList = document.querySelectorAll(config.formSelector);
  formsList.forEach((form) => {
    const inputsList = document.querySelectorAll(config.inputSelector);
    inputsList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        checkInputValidity(form, inputElement, config)
      });
    });
  });
};

// определение валидности инпута формы
const checkInputValidity = (form, inputElement, config) => {
  if (inputElement.validity.valid) {
    hideErrorMessage(inputElement, config);
  } else {
    showErrorMessage(inputElement, config);
  }
  toggleSubmitButtonState(form, config);
}

// скрыть сообщения об ошибке
const hideErrorMessage = (inputElement, config) => {
  const spanErrorMessage = document.querySelector(`#error-${inputElement.id}`);
  spanErrorMessage.textContent = '';
  inputElement.classList.remove(config.inputErrorClass);
};

// показать сообщение об ошибке
const showErrorMessage = (inputElement, config) => {
  const spanErrorMessage = document.querySelector(`#error-${inputElement.id}`);
  spanErrorMessage.textContent = inputElement.validationMessage;
  inputElement.classList.add(config.inputErrorClass);
};

// включить или выключить кнопку сабмита
const toggleSubmitButtonState = (form, config) => {
  const submitButton = form.querySelector(config.submitButtonSelector);
  if (form.checkValidity()) {
    submitButton.disabled = false;
    submitButton.classList.remove(config.inactiveButtonClass);
  } else {
    submitButton.disabled = true;
    submitButton.classList.add(config.inactiveButtonClass);
  }
};

export {enableValidation, toggleSubmitButtonState};
