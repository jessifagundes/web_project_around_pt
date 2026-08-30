import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";
import { openModal, closeModal } from "./utils.js";

const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

const initialCards = [
  {
    name: "Vale de Yosemite",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_yosemite.jpg",
  },
  {
    name: "Lago Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lake-louise.jpg",
  },
  {
    name: "Montanhas Carecas",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_latemar.jpg",
  },
  {
    name: "Parque Nacional Vanoise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lago.jpg",
  },
];

const editButton = document.querySelector(".profile__edit-button");
const editModal = document.querySelector("#edit-popup");
const profileForm = editModal.querySelector(".popup__form");
const nameInput = editModal.querySelector(".popup__input_type_name");
const jobInput = editModal.querySelector(".popup__input_type_description");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

const addButton = document.querySelector(".profile__add-button");
const addModal = document.querySelector("#new-card-popup");
const addForm = document.querySelector("#new-card-form");
const cardNameInput = addModal.querySelector(".popup__input_type_card-name");
const cardLinkInput = addModal.querySelector(".popup__input_type_url");

const imageModal = document.querySelector("#image-popup");
const modalImage = imageModal.querySelector(".popup__image");
const modalCaption = imageModal.querySelector(".popup__caption");

const cardsContainer = document.querySelector(".cards__list");

function handleCardClick(name, link) {
  modalImage.src = link;
  modalImage.alt = name;
  modalCaption.textContent = name;
  openModal(imageModal);
}

function createCard(item) {
  const card = new Card(item, "#card-template", handleCardClick);
  return card.generateCard();
}

initialCards.forEach((item) => {
  cardsContainer.append(createCard(item));
});

const editProfileValidator = new FormValidator(validationConfig, profileForm);
editProfileValidator.enableValidation();

const addCardValidator = new FormValidator(validationConfig, addForm);
addCardValidator.enableValidation();

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closeModal(editModal);
}

function handleCardFormSubmit(evt) {
  evt.preventDefault();

  const newCardData = {
    name: cardNameInput.value,
    link: cardLinkInput.value,
  };

  cardsContainer.prepend(createCard(newCardData));
  closeModal(addModal);
  addForm.reset();
  addCardValidator.resetValidation();
}

editButton.addEventListener("click", () => {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
  editProfileValidator.resetValidation();
  openModal(editModal);
});

addButton.addEventListener("click", () => {
  openModal(addModal);
});

profileForm.addEventListener("submit", handleProfileFormSubmit);
addForm.addEventListener("submit", handleCardFormSubmit);

const popups = document.querySelectorAll(".popup");
popups.forEach((popup) => {
  popup.addEventListener("mousedown", (evt) => {
    if (
      evt.target.classList.contains("popup_is-opened") ||
      evt.target.classList.contains("popup__close")
    ) {
      closeModal(popup);
    }
  });
});
