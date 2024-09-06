let initialCards = [
  {
    name: "Harbor Springs",
    link: "https://images.unsplash.com/photo-1595521624742-47e90260edab?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Downtown Chicago",
    link: "https://images.unsplash.com/photo-1593536768088-f01676d1330b?q=80&w=2673&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Bethlehem",
    link: "https://images.unsplash.com/photo-1580166338999-bc03438239c0?q=80&w=2598&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Perrysburg",
    link: "https://images.unsplash.com/photo-1685900248738-d98ec5c859aa?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Venice Beach",
    link: "https://images.unsplash.com/photo-1504731231146-c0f65dc6a950?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Palace of Fine Arts",
    link: "https://images.unsplash.com/photo-1573532271406-b13cb961e22e?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

const profile = document.querySelector(".profile");
const buttonEditProfile = profile.querySelector(".profile__edit-button");

const modalWindow = document.querySelector("#modal-edit-profile"); // account for another future modal window
const buttonCloseModal = modalWindow.querySelector(".modal__close-button");

buttonEditProfile.addEventListener("click", clickOpenProfileModal);
buttonCloseModal.addEventListener("click", clickCloseProfileModal);

function clickOpenProfileModal() {
  // these are the HTML page vars
  const profileName = profile.querySelector(".profile__name");
  const profileDesc = profile.querySelector(".profile__description");
  // and these are the modal window vars
  const inputName = modalWindow.querySelector("#modal__input_field_name");
  const inputDesc = modalWindow.querySelector(
    "#modal__input_field_description"
  );
  inputName.value = profileName.textContent; // using separate let vars aren't necessary
  inputDesc.value = profileDesc.textContent;

  modalWindow.classList.add("modal_opened"); // for rendering purposes, here it's the last line
}

function clickCloseProfileModal() {
  modalWindow.classList.remove("modal_opened");
}
