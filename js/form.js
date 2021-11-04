const userPrice = document.querySelector('#price'),
  userType = document.querySelector('#type'),
  userRoomNumberContaner = document.querySelector('#room_number'),
  userCapacitysContainer = document.querySelector('#capacity'),
  userCapacitys = document.querySelectorAll('#capacity>option');
const MAX_ROOM_NUMBER = 100;
const MIN_ROOM_NUMBER = 0;


const userTypeList = {
  bungalow: '0',
  flat: '1000',
  hotel: '3000',
  house: '5000',
  palace: '10000',
};

userType.addEventListener('change', () => {
  userPrice.setAttribute('min', userTypeList[userType.value]);
  userPrice.placeholder = userTypeList[userType.value];
});


userRoomNumberContaner.addEventListener('change', () => {
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

});


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


