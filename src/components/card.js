import {openPopup, closePopup} from './modal';
import {deleteCard, likeCard, dislikeCard} from './api';

const cardTemplate = document.querySelector('#cardTemplate').content;
const cardElementTemplate = cardTemplate.querySelector('.element');

const popupImage = document.querySelector('.popup-image');
const popupImagePhoto = document.querySelector('.popup-image__image');
const popupImageCaption = document.querySelector('.popup-image__caption');

const popupDeleteConfirmation = document.querySelector('.popup_confirmation');
const submitButtonDeleteConfirmation = popupDeleteConfirmation.querySelector('.form__submit-button');

// отображение карточек при загрузке страницы
const renderCard = function(card, profileId) {
  const cardElement = cardElementTemplate.cloneNode(true);
  const cardElementImage = cardElement.querySelector('.element__image');
  const cardElementCaption = cardElement.querySelector('.element__place-name');
  const likeButton = cardElement.querySelector('.element__like-button');
  const deleteButton = cardElement.querySelector('.element__delete-button');
  const cardNumberOfLikes = cardElement.querySelector('.element__number-likes');
  cardElementImage.src = card.link;
  cardElementImage.alt = card.name;
  cardElementCaption.textContent = card.name;
  cardNumberOfLikes.textContent = card.likes.length;

  // лайк карточки
  if (card.likes.some((owner) => {
    return owner._id === profileId;
  })) {
    likeButton.classList.add('element__like-button_active');
  }

  likeButton.addEventListener('click', () => {
    if (likeButton.classList.contains('element__like-button_active')) {
      dislikeCard(card._id)
      .then((result) => {
        likeButton.classList.toggle('element__like-button_active');
        cardNumberOfLikes.textContent = result.likes.length;
      })
      .catch((err) => {
        console.log(err);
      })
    } else {
      likeCard(card._id)
      .then((result) => {
        likeButton.classList.toggle('element__like-button_active');
        cardNumberOfLikes.textContent = result.likes.length;
      })
      .catch((err) => {
        console.log(err);
      })
    }
  })

  // удаление карточки
  if (card.owner._id === profileId) {
    deleteButton.addEventListener('click', () => {
      openPopup(popupDeleteConfirmation);

      const deleteEventListener = (evt) => {
        evt.preventDefault();
        deleteCard(card._id)
        .then(() => {
          cardElement.remove();
          closePopup(popupDeleteConfirmation);
        })
        .catch((err) => {
          console.log(err);
        })
      }

      submitButtonDeleteConfirmation.addEventListener('click', deleteEventListener, {once: true});
    })
  } else {
    deleteButton.remove();
  }

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