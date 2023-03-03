// открытие и закрытие формы редактирования профиля
const editButton = document.querySelector('.profile__edit-button');
const popupEditForm = document.querySelector('.popup_edit-form');
const closeButtonEditForm = document.querySelector('.close-button_edit-form');

const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__profession');

const nameInput = document.forms.editProfile.nameProfile;
const jobInput = document.forms.editProfile.professionProfile;

const openPopup = popup => popup.classList.add('opened-popup');
const closePopup = popup => popup.classList.remove('opened-popup');

editButton.addEventListener('click', () => {
  openPopup(popupEditForm);

  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
});

closeButtonEditForm.addEventListener('click', () => closePopup(popupEditForm));


// редактирование формы профиля
const editForm = document.forms['editProfile'];

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
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const cardElements = document.querySelector('.elements');

const renderCard = function(card) {
  const cardTemplate = document.querySelector('#cardTemplate').content;
  const cardElement = cardTemplate.querySelector('.element').cloneNode(true);

  const cardElementImage = cardElement.querySelector('.element__image');
  const cardElementCaption = cardElement.querySelector('.element__place-name');
  cardElementImage.src = card.link;
  cardElementCaption.textContent = card.name;

  // лайк карточки
  const likeButton = cardElement.querySelector('.element__like-button');

  likeButton.addEventListener('click', () => likeButton.classList.toggle('element__like-button_active'));

  // удаление карточки
  const deleteButton = cardElement.querySelector('.element__delete-button');

  deleteButton.addEventListener('click', () => cardElement.remove());

  // открытие попапа картинки
  const popupImage = document.querySelector('.popup-image');
  const popupImagePhoto = document.querySelector('.popup-image__image');
  const popupImageCaption = document.querySelector('.popup-image__caption');
  const closeButtonImage = document.querySelector('.close-button_image');


  cardElementImage.addEventListener('click', () => {
    popupImagePhoto.src = cardElementImage.src;
    popupImageCaption.textContent = cardElementCaption.textContent;

    openPopup(popupImage);
  });

  closeButtonImage.addEventListener('click', () => closePopup(popupImage));

  return cardElement;
}

initialCards.forEach((card) => cardElements.append(renderCard(card)));


// открытие и закрытие формы добавления карточек
const addButton = document.querySelector('.profile__add-button');
const popupAddCards = document.querySelector('.popup_add-cards');
const closeButtonCards = document.querySelector('.close-button_add-cards');

addButton.addEventListener('click', () => openPopup(popupAddCards));
closeButtonCards.addEventListener('click', () => closePopup(popupAddCards));


// добавление новых карточек
const addForm = document.forms['addCard'];
const nameCardInput = document.forms.addCard.nameCard;
const linkCardInput = document.forms.addCard.linkCard;

function handleAddCardFormSubmit(evt) {
    evt.preventDefault();

    const newCard = {
      name: nameCardInput.value,
      link: linkCardInput.value
    };

    cardElements.prepend(renderCard(newCard));
    closePopup(popupAddCards);
}

addForm.addEventListener('submit', handleAddCardFormSubmit);