// import { createRandomAnnouncement } from './createRandomAnnouncement.js';

// const map = document.querySelector('#map-canvas');
const templateFragment = document.querySelector('#card')
  .content
  .querySelector('.popup');

const popupTypeList = {
  flat: 'Квартира',
  bungalow: 'Бунгалo',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель',
};


const getPopupAnnouncements = (element) => {
  const announcementElement = templateFragment.cloneNode(true),
    popupTitle = announcementElement.querySelector('.popup__title'),
    popupType = announcementElement.querySelector('.popup__type'),
    popupTextAddress = announcementElement.querySelector('.popup__text--address'),
    popupPrice = announcementElement.querySelector('.popup__text--price'),
    popupCapacity = announcementElement.querySelector('.popup__text--capacity'),
    popupTime = announcementElement.querySelector('.popup__text--time'),
    popupPhoto = announcementElement.querySelector('.popup__photo'),
    popupDescription = announcementElement.querySelector('.popup__description'),
    popupAvatar = announcementElement.querySelector('.popup__avatar');

  popupTitle.textContent = element.offer.title;
  if (!element.offer.title) { popupTitle.remove(); }
  popupType.textContent = popupTypeList[element.offer.type];
  if (!element.offer.type) { popupType.remove(); }
  popupTextAddress.textContent = element.offer.address;
  if (!element.offer.address) { popupTextAddress.remove(); }
  popupPrice.textContent = `${element.offer.price} ₽/ночь`;
  if (!element.offer.price) { popupPrice.remove(); }
  popupCapacity.textContent = `${element.offer.rooms} комнаты для ${element.offer.guests} гостей`;
  if (!element.offer.rooms || !element.offer.guests) { popupCapacity.remove(); }
  popupTime.textContent = `Заезд после ${element.offer.checkin}, выезд до ${element.offer.checkout}`;
  if (!element.offer.checkin || !element.offer.checkout) { popupTime.remove(); }
  popupPhoto.src = element.offer.photos;
  if (!element.offer.photos) { popupPhoto.remove(); }
  popupDescription.textContent = element.offer.description;
  if (!element.offer.description) { popupDescription.remove(); }
  popupAvatar.src = element.author.avatar;
  if (!element.author.avatar) { popupAvatar.remove(); }

  const features = element.offer.features;
  const popupFeaturesList = announcementElement.querySelectorAll('.popup__feature');

  popupFeaturesList.forEach((popupFeaturesListItem) => {
    const isNecessary = features.some((el) => popupFeaturesListItem.classList.contains(`popup__feature--${el}`));

    if (!isNecessary) {
      popupFeaturesListItem.remove();
    }
    if (!element.offer.features) { announcementElement.querySelector('.popup__features').style.display = 'none'; }
  },
  );

  return announcementElement;
};


export { getPopupAnnouncements };
