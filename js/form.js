// import { getLatLng } from './map.js';

const userPrice = document.querySelector('#price'),
  userType = document.querySelector('#type'),
  userRoomNumberContaner = document.querySelector('#room_number'),
  userCapacitysContainer = document.querySelector('#capacity'),
  userCapacitys = document.querySelectorAll('#capacity>option');
const MAX_ROOM_NUMBER = 100;
const MIN_ROOM_NUMBER = 0;
const adForm = document.querySelector('.ad-form');
const mapFilter = document.querySelector('.map__filters');
const userTimeinContainer = document.querySelector('#timein'),
  userTimeoutContainer = document.querySelector('#timeout');
// const userAddress = document.querySelector('#address');

const userTypeList = {
  bungalow: '0',
  flat: '1000',
  hotel: '3000',
  house: '5000',
  palace: '10000',
};

// userAddress.value = getLatLng();

const inactivateAdForm = () => {
  adForm.classList.add('ad-form--disabled');
  adForm.querySelectorAll('fieldset').forEach((fieldset) => {
    fieldset.setAttribute('disabled', 'disabled');
  });
};
inactivateAdForm();
const inactivateMapFilter = () => {
  mapFilter.classList.add('.map__filters--disabled');
  for (let i = 0; i < mapFilter.children.length; i++) {
    mapFilter.children[i].setAttribute('disabled', 'disabled');
  }
};
inactivateMapFilter();
const activateAdForm = () => {
  adForm.classList.remove('ad-form--disabled');
  adForm.querySelectorAll('fieldset').forEach((fieldset) => {
    fieldset.removeAttribute('disabled');
  });
};
// activateAdForm();

const activateMapFilter = () => {
  mapFilter.classList.remove('.map__filters--disabled');
  for (let i = 0; i < mapFilter.children.length; i++) {
    mapFilter.children[i].removeAttribute('disabled');
  }
};
// activateMapFilter();

// userAddress.value = getLatLng();

userType.addEventListener('change', () => {
  userPrice.setAttribute('min', userTypeList[userType.value]);
  userPrice.placeholder = userTypeList[userType.value];
});

const checkinRooms = () => {
  userCapacitys.forEach((el) => {
    if (Number(el.value) <= Number(userRoomNumberContaner.value) && Number(el.value) !== MIN_ROOM_NUMBER) {
      el.removeAttribute('disabled');
    } else {
      el.setAttribute('disabled', 'disabled');
    }
    if (Number(userRoomNumberContaner.value) === MAX_ROOM_NUMBER) {
      el.setAttribute('disabled', 'disabled');
      userCapacitys[3].removeAttribute('disabled');
    }

  });
};

checkinRooms();

userRoomNumberContaner.addEventListener('change', checkinRooms);


userRoomNumberContaner.addEventListener('change', () => {
  if (Number(userRoomNumberContaner.value) < Number(userCapacitysContainer.value)) {
    userRoomNumberContaner.setCustomValidity('Комнат не хватает!');
  } else if (Number(userCapacitysContainer.value) === MIN_ROOM_NUMBER && Number(userRoomNumberContaner.value) !== MAX_ROOM_NUMBER) {
    userRoomNumberContaner.setCustomValidity('Выберите 100 комнат');
  } else if (Number(userRoomNumberContaner.value) === MAX_ROOM_NUMBER && Number(userCapacitysContainer.value) !== MIN_ROOM_NUMBER) {
    userRoomNumberContaner.setCustomValidity('100 комнат не для гостей');
  }
  else {
    userRoomNumberContaner.setCustomValidity('');
  }

  userRoomNumberContaner.reportValidity();
});

userTimeinContainer.addEventListener('change', () => {
  userTimeoutContainer.value = userTimeinContainer.value;

});
userTimeoutContainer.addEventListener('change', () => {
  userTimeinContainer.value = userTimeoutContainer.value;

});

export { activateAdForm, activateMapFilter };
