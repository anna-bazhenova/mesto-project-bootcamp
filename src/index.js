import './pages/index.css';
import {editButton, profilePopup, profileName, profileJob, profileAvatar, profileAvatarContainer,
  popupChangeAvatar, avatarUrlInput, changeAvatarForm, nameInput, jobInput, editProfileForm, cardElements,
  addButton, popupAddCards, addCardForm, nameCardInput, linkCardInput, closeButtons, popups, submitButtonAddCardsForm,
  submitButtonEditProfileForm, submitButtonChangeAvatarForm, validationConfig} from './components/constants'
import {enableValidation, toggleSubmitButtonState} from './components/validate';
import {openPopup, closePopup} from './components/modal';
import {renderCard} from './components/card';
import {getProfileInfo, getInitialCards, saveProfileInfo, saveNewCard, changeProfileAvatar} from './components/api';
import {renderSaving} from './components/utils'

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
  openPopup(profilePopup);
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
      closePopup(profilePopup);
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