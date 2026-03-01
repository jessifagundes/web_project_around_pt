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
const modal = document.querySelector("#edit-popup");
const closeButton = modal.querySelector(".popup__close");
const formElement = modal.querySelector(".popup__form");
const cardTemplate = document.querySelector("#card-template");
const cardsContainer = document.querySelector(".cards__list");
const addButton = document.querySelector(".profile__add-button");
const addModal = document.querySelector("#new-card-popup");
const closeAddModal = addModal.querySelector(".popup__close");
const addForm = document.querySelector("#new-card-form");
const imageModal = document.querySelector("#image-popup");
const modalImage = imageModal.querySelector(".popup__image");
const modalCaption = imageModal.querySelector(".popup__caption");
const closeImageModal = imageModal.querySelector(".popup__close");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_description");

function openModal(modal) {
  modal.classList.add("popup_is-opened");
  document.addEventListener("keydown", handleEscClose);
}

function closeModal(modal) {
  modal.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", handleEscClose);
}

function handleOpenEditModal() {
  const textName = profileTitle.textContent;
  const textDescription = profileDescription.textContent;

  nameInput.value = textName;
  jobInput.value = textDescription;

  openModal(modal);
}

editButton.addEventListener("click", function () {
  handleOpenEditModal();
});

closeButton.addEventListener("click", function () {
  closeModal(modal);
});

function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  const nameInputText = nameInput.value;
  const jobInputText = jobInput.value;

  profileTitle.textContent = nameInputText;
  profileDescription.textContent = jobInputText;

  closeModal(modal);
}

formElement.addEventListener("submit", handleProfileFormSubmit);

function getCardElement(name, link) {
  const cardElement = cardTemplate.content.cloneNode(true);
  const cardTitle = cardElement.querySelector(".card__title");
  const cardImage = cardElement.querySelector(".card__image");
  cardImage.src = link;
  cardImage.alt = name;
  cardTitle.textContent = name;

  const likeButton = cardElement.querySelector(".card__like-button");
  likeButton.addEventListener("click", function () {
    likeButton.classList.toggle("card__like-button_is-active");
  });

  cardImage.addEventListener("click", function () {
    modalCaption.textContent = name;
    modalImage.src = link;
    modalImage.alt = name;
    openModal(imageModal);
  });

  const deleteButton = cardElement.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", function () {
    const cardToDelete = deleteButton.closest(".card");
    cardToDelete.remove();
  });

  return cardElement;
}
closeImageModal.addEventListener("click", function () {
  closeModal(imageModal);
});

function renderCard(name, link, container) {
  const cardElement = getCardElement(name, link);
  container.prepend(cardElement);
}

initialCards.forEach((cardData) => {
  renderCard(cardData.name, cardData.link, cardsContainer);
});

function handleCardFormSubmit(evt) {
  evt.preventDefault();

  const nameInput = document.querySelector(".popup__input_type_card-name");
  const linkInput = document.querySelector(".popup__input_type_url");

  const nameInputText = nameInput.value;
  const linkInputText = linkInput.value;

  const newCard = {
    name: nameInputText,
    link: linkInputText,
  };

  renderCard(newCard.name, newCard.link, cardsContainer);

  closeModal(addModal);
  addForm.reset();
}

addForm.addEventListener("submit", handleCardFormSubmit);

addButton.addEventListener("click", function () {
  openModal(addModal);
});

closeAddModal.addEventListener("click", function () {
  closeModal(addModal);
});

const config = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

function showInputError(formElement, inputElement, errorMessage, config) {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add(config.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(config.errorClass);
}

function hideInputError(formElement, inputElement, config) {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove(config.inputErrorClass);
  errorElement.classList.remove(config.errorClass);
  errorElement.textContent = "";
}

function checkInputValidity(formElement, inputElement, config) {
  if (!inputElement.validity.valid) {
    showInputError(
      formElement,
      inputElement,
      inputElement.validationMessage,
      config,
    );
  } else {
    hideInputError(formElement, inputElement, config);
  }
}

function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => !inputElement.validity.valid);
}

function toggleButtonState(inputList, buttonElement, config) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(config.inactiveButtonClass);
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove(config.inactiveButtonClass);
    buttonElement.disabled = false;
  }
}

function initializeValidation(config) {
  const formList = document.querySelectorAll(config.formSelector);

  formList.forEach((formElement) => {
    const inputList = Array.from(
      formElement.querySelectorAll(config.inputSelector),
    );
    const buttonElement = formElement.querySelector(
      config.submitButtonSelector,
    );

    toggleButtonState(inputList, buttonElement, config);

    inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", function () {
        checkInputValidity(formElement, inputElement, config);
        toggleButtonState(inputList, buttonElement, config);
      });
    });
  });
}
initializeValidation(config);

function handleEscClose(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_is-opened");
    closeModal(openedPopup);
  }
}

const popups = document.querySelectorAll(".popup");

popups.forEach((popup) => {
  popup.addEventListener("mousedown", function (evt) {
    if (evt.target === evt.currentTarget) {
      closeModal(popup);
    }
  });
});
