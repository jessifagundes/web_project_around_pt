import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";
import { Section } from "./Section.js";
import { PopupWithImage } from "./PopupWithImage.js";
import { PopupWithForm } from "./PopupWithForm.js";
import { UserInfo } from "./UserInfo.js";

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

// Botões de abertura e inputs do formulário de perfil
const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");
const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_description");

// UserInfo
const userInfo = new UserInfo({
  nameSelector: ".profile__title",
  jobSelector: ".profile__description",
});

// Popup com Imagem
const popupWithImage = new PopupWithImage("#image-popup");
popupWithImage.setEventListeners();

function createCard(item) {
  const card = new Card(item, "#card-template", (name, link) => {
    popupWithImage.open(name, link);
  });
  return card.generateCard();
}

// Section para os cards
const cardSection = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const cardElement = createCard(item);
      cardSection.addItem(cardElement);
    },
  },
  ".cards__list",
);

// Popup de Edição de Perfil
const popupEditProfile = new PopupWithForm("#edit-popup", (formData) => {
  userInfo.setUserInfo({
    name: formData.name,
    job: formData.description,
  });
  popupEditProfile.close();
});
popupEditProfile.setEventListeners();

// Popup de Adição de Cartão
const popupAddCard = new PopupWithForm("#new-card-popup", (formData) => {
  const newCardElement = createCard({
    name: formData.place,
    link: formData.link,
  });
  cardSection.addItem(newCardElement);
  popupAddCard.close();
});
popupAddCard.setEventListeners();

// Validação dos Formulários
const formValidators = {};
const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
    const validator = new FormValidator(config, formElement);
    const formName = formElement.getAttribute("name");
    formValidators[formName] = validator;
    validator.enableValidation();
  });
};
enableValidation(validationConfig);

// Ouvintes para abrir popups
editButton.addEventListener("click", () => {
  const currentUser = userInfo.getUserInfo();
  nameInput.value = currentUser.name;
  jobInput.value = currentUser.job;
  formValidators["profile-form"].resetValidation();
  popupEditProfile.open();
});

addButton.addEventListener("click", () => {
  formValidators["new-card-form"].resetValidation();
  popupAddCard.open();
});

// Renderizar cards iniciais
cardSection.renderItems();
