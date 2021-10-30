const userPrice = document.querySelector('#price'),
  userType = document.querySelector('#type'),
  userRoomNumberContaner = document.querySelector('#room_number'),
  userRoomNumber = document.querySelectorAll('#room_number>option'),
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


userCapacitysContainer.addEventListener('change', () => {
  userRoomNumber.forEach((el) => {
    if (Number(el.value) <= Number(userCapacitysContainer.value) && Number(el.value) !== MIN_ROOM_NUMBER) {
      el.removeAttribute('disabled');
    } else {
      el.setAttribute('disabled', 'disabled');
    }
    if (Number(userCapacitysContainer.value) === MIN_ROOM_NUMBER) {
      el.setAttribute('disabled', 'disabled');
      userRoomNumber[3].removeAttribute('disabled');
    }

  });

});
