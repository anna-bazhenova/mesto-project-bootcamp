const editButton = document.querySelector('.profile__edit-button');
const profilePopup = document.querySelector('.popup_edit-form');
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

export {editButton, profilePopup, profileName, profileJob, profileAvatar, profileAvatarContainer,
  popupChangeAvatar, avatarUrlInput, changeAvatarForm, nameInput, jobInput, editProfileForm, cardElements,
  addButton, popupAddCards, addCardForm, nameCardInput, linkCardInput, closeButtons, popups, submitButtonAddCardsForm,
  submitButtonEditProfileForm, submitButtonChangeAvatarForm, validationConfig};