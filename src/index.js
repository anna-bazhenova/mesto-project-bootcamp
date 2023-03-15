import './pages/index.css';
import {enableValidation, toggleSubmitButtonState} from './components/validate';
import {openPopup, closePopup} from './components/modal';
import {renderCard} from './components/card';

const editButton = document.querySelector('.profile__edit-button');
const popupEditForm = document.querySelector('.popup_edit-form');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__profession');

const nameInput = document.forms.editProfile.nameProfile;
const jobInput = document.forms.editProfile.professionProfile;
const editProfileForm = document.forms['editProfile'];
const cardElements = document.querySelector('.elements');
const addButton = document.querySelector('.profile__add-button');
const popupAddCards = document.querySelector('.popup_add-cards');
const addCardForm = document.forms['addCard'];
const nameCardInput = document.forms.addCard.nameCard;
const linkCardInput = document.forms.addCard.linkCard;
const closeButtons = document.querySelectorAll('.close-button');
const popups = document.querySelectorAll('.popup');

const validationConfig = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__submit-button',
  inactiveButtonClass: 'form__submit-button_inactive',
  inputErrorClass: 'form__input_invalid',
  errorClass: 'error-message'
}

enableValidation(validationConfig);

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

initialCards.forEach((card) => cardElements.append(renderCard(card)));

// открытие формы добавления карточек
addButton.addEventListener('click', () => {
  toggleSubmitButtonState(addCardForm, validationConfig);
  openPopup(popupAddCards);
});

// добавление новых карточек
const handleAddCardFormSubmit = (evt) => {
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

addCardForm.addEventListener('submit', handleAddCardFormSubmit);

// открытие формы профиля
editButton.addEventListener('click', () => {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;

  toggleSubmitButtonState(editProfileForm, validationConfig);
  openPopup(popupEditForm);
});

// редактирование формы профиля
const handleEditFormSubmit = (evt) => {
    evt.preventDefault();

    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    closePopup(popupEditForm);
};

editProfileForm.addEventListener('submit', handleEditFormSubmit);

// закрытие попапов на крестик
closeButtons.forEach((button) => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(popup));
});

// закрытие попапов на оверлей
popups.forEach((popup) => {
  popup.addEventListener('click', (evt) => {
    if (evt.target === evt.currentTarget) {
      closePopup(popup);
    }
  })
});