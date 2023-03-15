import {openPopup} from './modal';

const cardTemplate = document.querySelector('#cardTemplate').content;
const cardElementTemplate = cardTemplate.querySelector('.element');

const popupImage = document.querySelector('.popup-image');
const popupImagePhoto = document.querySelector('.popup-image__image');
const popupImageCaption = document.querySelector('.popup-image__caption');

// отображение карточек при загрузке страницы
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

export {renderCard};