const editButton = document.querySelector('.profile__edit-button');
const popup = document.querySelector('.popup');
const closeButton = document.querySelector('.form__close-button');

editButton.addEventListener('click', () => popup.classList.add('popup_opened'));
closeButton.addEventListener('click', () => popup.classList.remove('popup_opened'));

