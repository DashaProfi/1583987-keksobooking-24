import { getRandomPositiveInteger, getRandomPositiveFloat } from './util.js';

const OFFER = {
  title: 'Вилла',
  address: ['lat', 'lng'],
  price: '',
  type: ['palace', 'flat', 'house', 'bungalow', 'hotel'],
  rooms: '',
  guests: '',
  checkin: ['12:00', '13:00', '14:00'],
  checkout: ['12:00', '13:00', '14:00'],
  features: ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'],
  description: 'Уютная вилла на берегу',
  photos: ['https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg', 'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg', 'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'],
};

const SIMILAR_ANNOUNCEMENT_COUNT = 10;
const MIN_RANDOM_INT = 0;
const MIN_ROOM_INT = 1;
const MAX_ROOM_INT = 10;
const MIN_GUEST_INT = 1;
const MAX_GUEST_INT = 10;
const MIN_LAT = 35.65000;
const MAX_LAT = 35.70000;
const DIGIT = 5;
const MIN_LNG = 139.70000;
const MAX_LNG = 139.80000;
const MAX_RANDOM_PRICE = 100000;
const MIN_RANDOM_PRICE = 0;


const createRandomAnnouncement = (el, id) => {
  const randomTypeIndex = getRandomPositiveInteger(MIN_RANDOM_INT, OFFER.type.length - 1);
  const randomRooms = getRandomPositiveInteger(MIN_ROOM_INT, MAX_ROOM_INT);
  const randomPrice = getRandomPositiveInteger(MIN_RANDOM_PRICE, MAX_RANDOM_PRICE);
  const randomGuests = getRandomPositiveInteger(MIN_GUEST_INT, MAX_GUEST_INT);
  const randomCheckinIndex = getRandomPositiveInteger(MIN_RANDOM_INT, OFFER.checkin.length - 1);
  const randomCheckoutIndex = getRandomPositiveInteger(MIN_RANDOM_INT, OFFER.checkout.length - 1);
  const randomFeatures1 = getRandomPositiveInteger(MIN_RANDOM_INT, OFFER.features.length - 1);
  const randomFeatures2 = getRandomPositiveInteger(MIN_RANDOM_INT, OFFER.features.length - 1);
  const randomFeaturesMin = Math.min(randomFeatures1, randomFeatures2);
  const randomFeaturesMax = Math.max(randomFeatures1, randomFeatures2) + 1;
  const randomPhotos1 = getRandomPositiveInteger(MIN_RANDOM_INT, OFFER.photos.length - 1);
  const randomPhotos2 = getRandomPositiveInteger(MIN_RANDOM_INT, OFFER.photos.length - 1);
  const randomPhotosMin = Math.min(randomPhotos1, randomPhotos2);
  const randomPhotosMax = Math.max(randomPhotos1, randomPhotos2) + 1;
  const randomLat = getRandomPositiveFloat(MIN_LAT, MAX_LAT, DIGIT);
  const randomLng = getRandomPositiveFloat(MIN_LNG, MAX_LNG, DIGIT);


  return {
    author: {
      avatar: `img/avatars/user${String(++id).padStart(2, '0')}.png`,
    },
    offer: {
      title: OFFER.title,
      address: `${randomLat}, ${randomLng}`,
      price: randomPrice,
      type: OFFER.type[randomTypeIndex],
      rooms: randomRooms,
      guests: randomGuests,
      checkin: OFFER.checkin[randomCheckinIndex],
      checkout: OFFER.checkout[randomCheckoutIndex],
      features: OFFER.features.slice(randomFeaturesMin, randomFeaturesMax),
      description: OFFER.description,
      photos: OFFER.photos.slice(randomPhotosMin, randomPhotosMax),
    },
    locate: {
      lat: randomLat,
      lng: randomLng,
    },
  };
};

export { SIMILAR_ANNOUNCEMENT_COUNT, createRandomAnnouncement };
