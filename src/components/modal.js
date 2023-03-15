// открытие попапов
const openPopup = popup => {
  popup.classList.add('popup_opened')
  document.addEventListener('keydown', closePopupOnEscape);
};

// закрытие попапов
const closePopup = popup => {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupOnEscape);
};

const closePopupOnEscape = (evt) => {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
};

export {openPopup, closePopup};