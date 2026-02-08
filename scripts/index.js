let initialCards = [
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

initialCards.forEach(function (card) {
  console.log(card.name);
});

const editButton = document.querySelector(".profile__edit-button");
const modal = document.querySelector("#edit-popup");
const closeButton = modal.querySelector(".popup__close");

function openModal(modal) {
  modal.classList.add("popup_is-opened");
}

function closeModal(modal) {
  modal.classList.remove("popup_is-opened");
}

editButton.addEventListener("click", function () {
  handleOpenEditModal();
});

closeButton.addEventListener("click", function () {
  closeModal(modal);
});

function fillProfileForm() {
  const name = document.querySelector(".profile__title");
  const description = document.querySelector(".profile__description");

  const textName = name.textContent;
  const textDescription = description.textContent;

  const nameInput = document.querySelector(".popup__input_type_name");
  const jobInput = document.querySelector(".popup__input_type_description");

  nameInput.value = textName;
  jobInput.value = textDescription;
}

function handleOpenEditModal() {
  fillProfileForm();
  openModal(modal);
}

const formElement = modal.querySelector(".popup__form");

function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  const nameInput = document.querySelector(".popup__input_type_name");
  const jobInput = document.querySelector(".popup__input_type_description");

  const nameInputText = nameInput.value;
  const jobInputText = jobInput.value;

  const name = document.querySelector(".profile__title");
  const description = document.querySelector(".profile__description");

  name.textContent = nameInputText;
  description.textContent = jobInputText;

  closeModal(modal);
}

formElement.addEventListener("submit", handleProfileFormSubmit);
