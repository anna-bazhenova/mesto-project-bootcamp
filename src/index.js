import './pages/index.css';
const editButton = document.querySelector('.profile__edit-button');
const popupEditForm = document.querySelector('.popup_edit-form');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__profession');
const nameInput = document.forms.editProfile.nameProfile;
const jobInput = document.forms.editProfile.professionProfile;
const editForm = document.forms['editProfile'];
const cardElements = document.querySelector('.elements');
const addButton = document.querySelector('.profile__add-button');
const popupAddCards = document.querySelector('.popup_add-cards');
const addForm = document.forms['addCard'];
const nameCardInput = document.forms.addCard.nameCard;
const linkCardInput = document.forms.addCard.linkCard;
const cardTemplate = document.querySelector('#cardTemplate').content;
const cardElementTemplate = cardTemplate.querySelector('.element');
const popupImage = document.querySelector('.popup-image');
const popupImagePhoto = document.querySelector('.popup-image__image');
const popupImageCaption = document.querySelector('.popup-image__caption');
const closeButtons = document.querySelectorAll('.close-button');
const popups = document.querySelectorAll('.popup');


// закрытие попапов
const closePopup = popup => {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupOnEscape);
};

closeButtons.forEach((button) => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(popup));
});


// открытие формы редактирования профиля
const openPopup = popup => {
  popup.classList.add('popup_opened')
  document.addEventListener('keydown', closePopupOnEscape);
};


popups.forEach((popup) => {
  popup.addEventListener('click', (evt) => {
    if (evt.target === evt.currentTarget) {
      closePopup(popup);
    }
  })
})

const closePopupOnEscape = (evt) => {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}

editButton.addEventListener('click', () => {
  openPopup(popupEditForm);

  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;

  toggleSubmitButtonState(editForm, validationConfig);
});


// редактирование формы профиля
function handleEditFormSubmit(evt) {
    evt.preventDefault();

    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    closePopup(popupEditForm);
}

editForm.addEventListener('submit', handleEditFormSubmit);


// отображение карточек при загрузке страницы
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg',
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg',
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg',
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg',
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg',
  }
];

const renderCard = function(card) {
  const cardElement = cardElementTemplate.cloneNode(true);
  const cardElementImage = cardElement.querySelector('.element__image');
  const cardElementCaption = cardElement.querySelector('.element__place-name');
  const likeButton = cardElement.querySelector('.element__like-button');
  const deleteButton = cardElement.querySelector('.element__delete-button');
  cardElementImage.src = card.link;
  cardElementImage.alt = card.name;
  cardElementCaption.textContent = card.name;

  // лайк карточки
  likeButton.addEventListener('click', () => likeButton.classList.toggle('element__like-button_active'));

  // удаление карточки
  deleteButton.addEventListener('click', () => cardElement.remove());

  // открытие попапа картинки
  cardElementImage.addEventListener('click', () => {
    popupImagePhoto.src = cardElementImage.src;
    popupImagePhoto.alt = cardElementCaption.textContent;
    popupImageCaption.textContent = cardElementCaption.textContent;

    openPopup(popupImage);
  });

  return cardElement;
};

initialCards.forEach((card) => cardElements.append(renderCard(card)));


// открытие формы добавления карточек
addButton.addEventListener('click', () => {
  toggleSubmitButtonState(addForm, validationConfig);
  openPopup(popupAddCards);
});


// добавление новых карточек
function handleAddCardFormSubmit(evt) {
    evt.preventDefault();

    const newCard = {
      name: nameCardInput.value,
      link: linkCardInput.value,
      alt: nameCardInput.value
    };

    cardElements.prepend(renderCard(newCard));
    closePopup(popupAddCards);
    evt.target.reset();
};

addForm.addEventListener('submit', handleAddCardFormSubmit);


// валидация форм

const validationConfig = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__submit-button',
  inactiveButtonClass: 'form__submit-button_inactive',
  inputErrorClass: 'form__input_invalid',
  errorClass: 'error-message'
}

const enableValidation = (config) => {
  const formsList = document.querySelectorAll(config.formSelector);

  formsList.forEach((form) => {
    const inputsList = document.querySelectorAll(config.inputSelector);
    inputsList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        isInputValid(form, inputElement, config)
      });
    });
  });
};

const isInputValid = (form, inputElement, config) => {
  if (inputElement.validity.valid) {
    hideErrorMessage(inputElement, config);
  } else {
    showErrorMessage(inputElement, config);
  }
  toggleSubmitButtonState(form, config);
}

const hideErrorMessage = (inputElement, config) => {
  const spanErrorMessage = document.querySelector(`#error-${inputElement.id}`);
  spanErrorMessage.textContent = '';
  inputElement.classList.remove(config.inputErrorClass);
};

const showErrorMessage = (inputElement, config) => {
  const spanErrorMessage = document.querySelector(`#error-${inputElement.id}`);
  spanErrorMessage.textContent = inputElement.validationMessage;
  inputElement.classList.add(config.inputErrorClass);
};

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

enableValidation(validationConfig);