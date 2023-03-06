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


// закрытие попапов
closeButtons.forEach((button) => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(popup));
});


// открытие формы редактирования профиля
const openPopup = popup => popup.classList.add('popup_opened');
const closePopup = popup => popup.classList.remove('popup_opened');

editButton.addEventListener('click', () => {
  openPopup(popupEditForm);

  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
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
}

initialCards.forEach((card) => cardElements.append(renderCard(card)));


// открытие формы добавления карточек
addButton.addEventListener('click', () => openPopup(popupAddCards));


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
}

addForm.addEventListener('submit', handleAddCardFormSubmit);