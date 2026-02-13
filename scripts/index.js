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

function openModal(modal) {
  modal.classList.add("popup_is-opened");
}

function closeModal(modal) {
  modal.classList.remove("popup_is-opened");
}

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

editButton.addEventListener("click", function () {
  handleOpenEditModal();
});

closeButton.addEventListener("click", function () {
  closeModal(modal);
});

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

function getCardElement(
  name = "Lugar sem nome",
  link = "./images/placeholder.jpg",
) {
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

  closeImageModal.addEventListener("click", function () {
    closeModal(imageModal);
  });

  const deleteButton = cardElement.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", function () {
    const cardToDelete = deleteButton.closest(".card");
    cardToDelete.remove();
  });

  return cardElement;
}

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
