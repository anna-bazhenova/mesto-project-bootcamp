const renderSaving = (isSaving, submitButton, defaultButtonText) => {
  if(isSaving) {
    submitButton.textContent = 'Сохранение...';
  } else {
    submitButton.textContent = defaultButtonText;
  }
}

export {renderSaving}