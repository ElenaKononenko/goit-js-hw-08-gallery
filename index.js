import gallery from "./gallery-items.js";

const listGalleryRef = document.querySelector(".js-gallery");
const lightboxRef = document.querySelector(".js-lightbox");
const overlayRef = document.querySelector(".lightbox__overlay");
const lightboxImageRef = document.querySelector(".lightbox__image");
const btnCloseRef = document.querySelector(
  "button[data-action='close-lightbox']"
);

const createItemGallery = gallery.map(processGallery);

listGalleryRef.append(...createItemGallery);
listGalleryRef.addEventListener("click", onOpenModal);
btnCloseRef.addEventListener("click", onCloseModal);
overlayRef.addEventListener("click", onOverlayClose);

function processGallery(item, index) {
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
  pictureGallery.setAttribute("data-index", index);

  linkGallery.append(pictureGallery);
  listItemGallery.append(linkGallery);
  return listItemGallery;
}

function onOpenModal(e) {
  e.preventDefault();
  window.addEventListener("keydown", onPressKey);
  if (e.target.nodeName === "IMG") {
    lightboxRef.classList.add("is-open");
    lightboxImageRef.src = e.target.dataset.source;
    lightboxImageRef.setAttribute("data-current", e.target.dataset.index);
  }
}

function onCloseModal() {
  window.removeEventListener("keydown", onPressKey);
  lightboxRef.classList.remove("is-open");
  lightboxImageRef.src = "";
}

function onOverlayClose(e) {
  if (e.target === e.currentTarget) {
    onCloseModal();
  }
}
function onPressKey(e) {
  if (e.code === "Escape") {
    onCloseModal();
  } else if (e.code === "ArrowLeft") {
    modalLeft();
  } else if (e.code === "ArrowRight") {
    modalRight();
  }
}

function modalLeft() {
  let n = Number(lightboxImageRef.dataset.current) - 1;
  if (n < 0) {
    n = gallery.length - 1;
  }
  lightboxImageRef.dataset.current = n;
  lightboxImageRef.src = gallery[n].original;
}
function modalRight() {
  let n = Number(lightboxImageRef.dataset.current) + 1;
  if (n >= gallery.length) {
    n = 0;
  }
  lightboxImageRef.dataset.current = n;
  lightboxImageRef.src = gallery[n].original;
}
