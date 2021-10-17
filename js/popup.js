import { SIMILAR_ANNOUNCEMENT_COUNT, createRandomAnnouncement } from './createRandomAnnouncement.js';

const announcements = Array.from({
  length: SIMILAR_ANNOUNCEMENT_COUNT,
}, createRandomAnnouncement);


const map = document.querySelector('#map-canvas');
const templateFragment = document.querySelector('#card')
  .content
  .querySelector('.popup');

const newType = {
  flat: 'Квартира',
  bungalow: 'Бунгалo',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель',
};


announcements.forEach((element, i) => {
  const announcementElement = templateFragment.cloneNode(true);
  announcementElement.querySelector('.popup__title').textContent = element.offer.title;
  if (!element.offer.title) { announcementElement.querySelector('.popup__title').style.display = 'none'; }
  announcementElement.querySelector('.popup__type').textContent = newType[element.offer.type];
  if (!element.offer.type) { announcementElement.querySelector('.popup__type').style.display = 'none'; }
  announcementElement.querySelector('.popup__text--address').textContent = element.offer.address;
  if (!element.offer.address) { announcementElement.querySelector('.popup__text--address').style.display = 'none'; }
  announcementElement.querySelector('.popup__text--price').textContent = `${element.offer.price} ₽/ночь`;
  if (!element.offer.price) { announcementElement.querySelector('.popup__text--price').style.display = 'none'; }
  announcementElement.querySelector('.popup__text--capacity').textContent = `${element.offer.rooms} комнаты для ${element.offer.guests} гостей`;
  if (!element.offer.rooms || !element.offer.guests) { announcementElement.querySelector('.popup__text--capacity').style.display = 'none'; }
  announcementElement.querySelector('.popup__text--time').textContent = `Заезд после ${element.offer.checkin}, выезд до ${element.offer.checkout}`;
  if (!element.offer.checkin || !element.offer.checkout) { announcementElement.querySelector('.popup__text--time').style.display = 'none'; }
  announcementElement.querySelector('.popup__photo').src = element.offer.photos;
  if (!element.offer.photos) { announcementElement.querySelector('.popup__photo').style.display = 'none'; }
  announcementElement.querySelector('.popup__description').textContent = element.offer.description;
  if (!element.offer.description) { announcementElement.querySelector('.popup__description').style.display = 'none'; }
  announcementElement.querySelector('.popup__avatar').src = element.author.avatar;
  if (!element.author.avatar) { announcementElement.querySelector('.popup__avatar').style.display = 'none'; }

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
  if (i === 0) {
    map.appendChild(announcementElement);
  }
});

