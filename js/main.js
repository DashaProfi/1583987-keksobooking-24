function getRandomPositiveInteger(a, b) {
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
}

function getRandomPositiveFloat(a, b, digits = 1) {

  const lower = Math.min(Math.abs(a), Math.abs(b));
  const upper = Math.max(Math.abs(a), Math.abs(b));
  const result = Math.random() * (upper - lower) + lower;
  return result.toFixed(digits);
}


const OFFER = {
  title: 'Дом',
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

const createRandomAnnouncement = () => {
  let randomAvatarIndex = getRandomPositiveInteger(1, 10);
  if (randomAvatarIndex < 10) {
    randomAvatarIndex = `0${randomAvatarIndex}`;
  }
  const randomTypeIndex = getRandomPositiveInteger(0, OFFER.type.length - 1);
  const randomRooms = getRandomPositiveInteger(1, 10);
  const randomPrice = getRandomPositiveInteger(0, 100000);
  const randomGuests = getRandomPositiveInteger(1, 10);
  const randomCheckinIndex = getRandomPositiveInteger(0, OFFER.checkin.length - 1);
  const randomCheckoutIndex = getRandomPositiveInteger(0, OFFER.checkout.length - 1);
  const randomFeatures1 = getRandomPositiveInteger(0, OFFER.features.length - 1);
  const randomFeatures2 = getRandomPositiveInteger(0, OFFER.features.length - 1);
  const randomFeaturesMin = Math.min(randomFeatures1, randomFeatures2);
  const randomFeaturesMax = Math.max(randomFeatures1, randomFeatures2) + 1;
  const randomPhotos1 = getRandomPositiveInteger(0, OFFER.photos.length - 1);
  const randomPhotos2 = getRandomPositiveInteger(0, OFFER.photos.length - 1);
  const randomPhotosMin = Math.min(randomPhotos1, randomPhotos2);
  const randomPhotosMax = Math.max(randomPhotos1, randomPhotos2) + 1;
  const randomLat = getRandomPositiveFloat(35.65000, 35.70000, 5);
  const randomLng = getRandomPositiveFloat(139.70000, 139.80000, 5);


  return {
    author: {
      avatar: `img/avatars/user${randomAvatarIndex}.png`,
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


Array.from({
  length: SIMILAR_ANNOUNCEMENT_COUNT,
}, createRandomAnnouncement);


