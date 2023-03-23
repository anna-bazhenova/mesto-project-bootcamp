import './pages/index.css';
import {enableValidation, toggleSubmitButtonState} from './components/validate';
import {openPopup, closePopup} from './components/modal';
import {renderCard} from './components/card';
import {getProfileInfo, getInitialCards, saveProfileInfo, saveNewCard, changeProfileAvatar} from './components/api';
import {renderSaving} from './components/utils'

const editButton = document.querySelector('.profile__edit-button');
const popupEditForm = document.querySelector('.popup_edit-form');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__profession');
const profileAvatar = document.querySelector('.profile__avatar');
const profileAvatarContainer = document.querySelector('.profile__avatar-container');
const popupChangeAvatar = document.querySelector('.popup_change-avatar');
const avatarUrlInput = document.forms.changeAvatar.linkAvatar;
const changeAvatarForm = document.forms['changeAvatar'];

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
const submitButtonAddCardsForm = document.forms.addCard.querySelector('.form__submit-button');
const submitButtonEditProfileForm = document.forms.editProfile.querySelector('.form__submit-button');
const submitButtonChangeAvatarForm = document.forms.changeAvatar.querySelector('.form__submit-button');

const validationConfig = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__submit-button',
  inactiveButtonClass: 'form__submit-button_inactive',
  inputErrorClass: 'form__input_invalid',
  errorClass: 'error-message'
}

enableValidation(validationConfig);


// загрузка данных в профиль
getProfileInfo()
  .then((profile) => {
    profileName.textContent = profile.name;
    profileJob.textContent = profile.about;
    profileAvatar.src = profile.avatar;

    loadInitialCards(profile._id);
  })
  .catch((err) => {
    console.log(err);
  });

// получение карточек
const loadInitialCards = (profileId) => {
  return getInitialCards()
    .then((initialCards) => {
      initialCards.forEach((card) =>
        cardElements.append(renderCard(card, profileId))
      );
    })
    .catch((err) => {
      console.log(err);
    });
};

// открытие формы добавления карточек
addButton.addEventListener('click', () => {
  toggleSubmitButtonState(addCardForm, validationConfig);
  openPopup(popupAddCards);
});

// добавление новых карточек
const handleAddCardFormSubmit = (evt) => {
  evt.preventDefault();

  const defaultSubmitButtonText = submitButtonAddCardsForm.textContent;
  renderSaving(true, submitButtonAddCardsForm);

  const newCard = {
    name: nameCardInput.value,
    link: linkCardInput.value
  };

  saveNewCard(newCard)
  .then((card) => {
    cardElements.prepend(renderCard(card, card.owner._id));
    closePopup(popupAddCards);
    evt.target.reset();
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    renderSaving(false, submitButtonAddCardsForm, defaultSubmitButtonText);
  })
};

addCardForm.addEventListener('submit', handleAddCardFormSubmit);

// открытие формы изменения аватара
profileAvatarContainer.addEventListener('click', () => {
  toggleSubmitButtonState(changeAvatarForm, validationConfig);
  openPopup(popupChangeAvatar);
})

// изменение аватара
const handleChangeAvatarFormSubmit = (evt) => {
  evt.preventDefault();

  const defaultSubmitButtonText = submitButtonChangeAvatarForm.textContent;
  renderSaving(true, submitButtonChangeAvatarForm);

  changeProfileAvatar(avatarUrlInput.value)
  .then((result) => {
    profileAvatar.src = result.avatar;
    closePopup(popupChangeAvatar);
    evt.target.reset();
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    renderSaving(false, submitButtonChangeAvatarForm, defaultSubmitButtonText);
  })
}

changeAvatarForm.addEventListener('submit', handleChangeAvatarFormSubmit);

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

    const defaultSubmitButtonText = submitButtonEditProfileForm.textContent;
    renderSaving(true, submitButtonEditProfileForm);

    saveProfileInfo(nameInput.value, jobInput.value)
    .then((result) => {
      profileName.textContent = result.name;
      profileJob.textContent = result.about;
      closePopup(popupEditForm);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      renderSaving(false, submitButtonEditProfileForm, defaultSubmitButtonText);
    })
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