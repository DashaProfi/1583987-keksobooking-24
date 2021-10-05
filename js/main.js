// function getRandomIntFromRange(min, max) {
//   let result;
//   if (min >= 0 && max > min) {
//     min = Math.ceil(min);
//     max = Math.floor(max);
//     result = Math.floor(Math.random() * (max - min + 1)) + min;
//     return result;
//   }
//   throw new Error('Введите корректное значение диапазона');
// }
// getRandomIntFromRange(1, 5);


// function getRandomGeoCoordinates(min, max, num) {
//   let result;
//   if (min >= 0 && max > min) {
//     result = +(Math.random() * (max - min) + min).toFixed(num);
//     return result;
//   }
//   throw new Error('Введите корректное значение диапазона');
// }
// getRandomGeoCoordinates(1, 1.3, 2);

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


const AUTHOR = {
  avatar: 'img/avatars/user{{xx}}.png',
};

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


const LOCATE = {
  lat: '',
  lng: '',
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
  const randomFeaturesIndex = getRandomPositiveInteger(0, OFFER.features.length - 1);
  const randomPhotosIndex = getRandomPositiveInteger(0, OFFER.photos.length - 1);
  const randomLat = getRandomPositiveFloat(35.65000, 35.70000, digits = 5);
  const randomLng = getRandomPositiveFloat(139.70000, 139.80000, digits = 5);


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
      features: OFFER.features[randomFeaturesIndex],
      description: OFFER.description,
      photos: OFFER.photos[randomPhotosIndex],
    },
    locate: {
      lat: randomLat,
      lng: randomLng,
    },
  };
};


const similarAnnouncements = Array.from({
  length: SIMILAR_ANNOUNCEMENT_COUNT
}, createRandomAnnouncement);
console.log('newArrDasha', similarAnnouncements);
