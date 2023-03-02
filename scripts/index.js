const editButton = document.querySelector('.profile__edit-button');
const popup = document.querySelector('.popup');
const closeButton = document.querySelector('.form__close-button');

editButton.addEventListener('click', () => popup.classList.add('popup_opened'));
closeButton.addEventListener('click', () => popup.classList.remove('popup_opened'));

const formElement = document.querySelector('.form');
const nameInput = document.querySelector('.form__input_type_name');
const jobInput = document.querySelector('.form__input_type_text');

function handleFormSubmit(evt) {
    evt.preventDefault();

    let nameValue = nameInput.value;
    let jobValue = jobInput.value;

    let profileName = document.querySelector('.profile__name');
    let profileJob = document.querySelector('.profile__profession');

    profileName.textContent = nameValue;
    profileJob.textContent = jobValue;
}

formElement.addEventListener('submit', handleFormSubmit);