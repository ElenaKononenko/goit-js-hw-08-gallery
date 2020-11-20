import gallery from "./gallery-items.js";

const listGalleryRef = document.querySelector(".js-gallery");
const lightboxRef = document.querySelector(".js-lightbox");
const lightboxImageRef = document.querySelector(".lightbox__image");
const btnCloseRef = document.querySelector(
  "button[data-action='close-lightbox']"
);

const createItemGallery = gallery.map(processGallery);
listGalleryRef.append(...createItemGallery);

listGalleryRef.addEventListener("click", onchangeSrc);
btnCloseRef.addEventListener("click", onCloseBtn);

function processGallery(item) {
  const listItemGallery = document.createElement("li");
  listItemGallery.classList.add("gallery__item");

  const linkGallery = document.createElement("a");
  linkGallery.classList.add("gallery__link");
  linkGallery.setAttribute("href", item.original);

  const pictureGallery = document.createElement("img");
  pictureGallery.classList.add("gallery__image");
  pictureGallery.setAttribute("src", item.preview);
  pictureGallery.setAttribute("data-source", item.original);
  pictureGallery.setAttribute("alt", item.description);

  linkGallery.append(pictureGallery);
  listItemGallery.append(linkGallery);
  return listItemGallery;
}

function onchangeSrc(e) {
  e.preventDefault();
  lightboxRef.classList.add("is-open");
  lightboxImageRef.src = e.target.dataset.source;
}

function onCloseBtn(e) {
  lightboxRef.classList.remove("is-open");
  lightboxImageRef.src = "";
}