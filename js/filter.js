import {
  filterConditioner,
  filterDishwasher, filterElevator,
  filterParking, filterWasher,
  filterWiFi,
  housingGuests,
  housingPrice,
  housingRooms,
  housingType, markerGroup, onSuccess
} from './map.js';
import {cards} from './api.js';


function chooseType(array) {
  switch (housingType.value) {
    case 'bungalow':
      return array.filter((card) => card.offer.type === 'bungalow');
    case 'flat':
      return array.filter((card) => card.offer.type === 'flat');
    case 'hotel':
      return array.filter((card) => card.offer.type === 'hotel');
    case 'house':
      return array.filter((card) => card.offer.type === 'house');
    case 'palace':
      return array.filter((card) => card.offer.type === 'palace');
    default:
      return array;
  }
}

function choosePrice(array) {
  switch (housingPrice.value) {
    case 'middle' :
      return array.filter((card) => card.offer.price < 50000 && card.offer.price >= 10000);
    case 'low' :
      return array.filter((card) => card.offer.price < 10000);
    case 'high' :
      return array.filter((card) => card.offer.price >= 50000);
    default:
      return array;
  }
}

function chooseRoom(array) {
  switch (housingRooms.value) {
    case '1' :
      return array.filter((card) => card.offer.rooms === 1);
    case '2' :
      return array.filter((card) => card.offer.rooms === 2);
    case '3' :
      return array.filter((card) => card.offer.rooms === 3);
    default:
      return array;
  }
}

function chooseGuests(array) {
  switch (housingGuests.value) {
    case '1' :
      return array.filter((card) => card.offer.guests >= 1);
    case '2' :
      return array.filter((card) => card.offer.guests >= 2);
    case '0' :
      return array.filter((card) => card.offer.guests === 0);
    default:
      return array;
  }
}

function chooseDishwasher(array) {
  switch (filterDishwasher.checked) {
    case true:
      return array.filter(
        (card) => {
          if (card.offer.features === undefined) {
            return false;
          }
          return card.offer.features.includes('dishwasher');
        });
    default:
      return array;
  }
}

function chooseWiFi(array) {
  switch (filterWiFi.checked) {
    case true:
      return array.filter(
        (card) => {
          if (card.offer.features === undefined) {
            return false;
          }
          return card.offer.features.includes('wifi');
        });
    default:
      return array;
  }
}

function chooseParking(array) {
  switch (filterParking.checked) {
    case true:
      return array.filter(
        (card) => {
          if (card.offer.features === undefined) {
            return false;
          }
          return card.offer.features.includes('parking');
        });
    default:
      return array;
  }
}

function chooseWasher(array) {
  switch (filterWasher.checked) {
    case true:
      return array.filter(
        (card) => {
          if (card.offer.features === undefined) {
            return false;
          }
          return card.offer.features.includes('washer');
        });
    default:
      return array;
  }
}

function chooseElevator(array) {
  switch (filterElevator.checked) {
    case true:
      return array.filter(
        (card) => {
          if (card.offer.features === undefined) {
            return false;
          }
          return card.offer.features.includes('elevator');
        });
    default:
      return array;
  }
}

function chooseConditioner(array) {
  switch (filterConditioner.checked) {
    case true:
      return array.filter((card) => {
        if (card.offer.features === undefined) {
          return false;
        }
        return card.offer.features.includes('conditioner');
      });
    default:
      return array;
  }
}

function getFilteredCards() {
  markerGroup.clearLayers();
  const filteredTypeCards = chooseType(cards);
  const filteredPriceCards = choosePrice(filteredTypeCards);
  const filteredRoomsCards = chooseRoom(filteredPriceCards);
  const filteredGuestsCards = chooseGuests(filteredRoomsCards);
  const filteredDishwasherCards = chooseDishwasher(filteredGuestsCards);
  const filteredWiFiCards = chooseWiFi(filteredDishwasherCards);
  const filteredParkingCards = chooseParking(filteredWiFiCards);
  const filteredWasherCards = chooseWasher(filteredParkingCards);
  const filteredElevatorCards = chooseElevator(filteredWasherCards);
  const filteredConditionerCards = chooseConditioner(filteredElevatorCards);
  onSuccess(filteredConditionerCards);
  console.log('filteredConditionerCards', filteredConditionerCards);
}

export {
  chooseConditioner,
  chooseType,
  chooseElevator,
  chooseGuests,
  chooseParking,
  choosePrice,
  chooseRoom,
  chooseWasher,
  chooseWiFi,
  chooseDishwasher,
  getFilteredCards
} ;
