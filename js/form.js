import { sendData } from './api.js';
import { mainPinMarker, map, TOKYO_CENTER_LAT, TOKYO_CENTER_LNG } from './map.js';

const userPrice = document.querySelector('#price'),
  userType = document.querySelector('#type'),
  userTypes = document.querySelectorAll('#type>option'),
  userRoomNumberContaner = document.querySelector('#room_number'),
  userRoomNumbers = document.querySelectorAll('#room_number>option'),
  userCapacitysContainer = document.querySelector('#capacity'),
  userCapacitys = document.querySelectorAll('#capacity>option'),
  userTitle = document.querySelector('#title');
const userAddress = document.querySelector('#address');
const userComment = document.querySelector('#description');
const MAX_ROOM_NUMBER = 100;
const MIN_ROOM_NUMBER = 0;
const adForm = document.querySelector('.ad-form');
const userTimeinContainer = document.querySelector('#timein');
const userTimeins = document.querySelectorAll('#timein>option');
const userTimeoutContainer = document.querySelector('#timeout');
const userTimeouts = document.querySelectorAll('#timeout>option');
const featuresCheckboxes = document.querySelectorAll('.features__checkbox');
const adFormReset = document.querySelector('.ad-form__reset');
let success;
let error;

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
};

checkinRooms();

userRoomNumberContaner.addEventListener('change', checkinRooms);

userCapacitysContainer.addEventListener('change', checkinRooms);

userTimeinContainer.addEventListener('change', () => {
  userTimeoutContainer.value = userTimeinContainer.value;
});

userTimeoutContainer.addEventListener('change', () => {
  userTimeinContainer.value = userTimeoutContainer.value;
});

const createSucccessMessage = () => {
  const successTemplate = document.querySelector('#success').content.querySelector('.success');
  const successMessage = successTemplate.cloneNode(true);
  return successMessage;
};

const onPopupSuccesEscKeydown = (evt) => {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    success.remove();
    document.removeEventListener('keydown', onPopupSuccesEscKeydown);
  }
};
const onPopupSuccesEscClick = (evt) => {
  evt.preventDefault();
  success.remove();
  success.removeEventListener('click', onPopupSuccesEscClick);
};
const closePopupSuccess = () => {
  document.addEventListener('keydown', onPopupSuccesEscKeydown);
  success.addEventListener('click', onPopupSuccesEscClick);
};

const onPopupErrorEscKeydown = (evt) => {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    error.remove();
    document.removeEventListener('keydown', onPopupErrorEscKeydown);
  }
};
const onPopupErrorEscClick = (evt) => {
  evt.preventDefault();
  error.remove();
  error.removeEventListener('click', onPopupErrorEscClick);
};
const onPopupErrorEscButtonClick = (evt) => {
  const errorButton = document.querySelector('.error__button');
  evt.preventDefault();
  error.remove();
  errorButton.removeEventListener('click', onPopupErrorEscButtonClick);
};
const createErrorMessage = () => {
  const errorTemplate = document.querySelector('#error').content.querySelector('.error');
  const errorMessage = errorTemplate.cloneNode(true);
  return errorMessage;
};
const closePopupError = () => {
  const errorButton = document.querySelector('.error__button');
  document.addEventListener('keydown', onPopupErrorEscKeydown);
  error.addEventListener('click', onPopupErrorEscClick);
  errorButton.addEventListener('click', onPopupErrorEscButtonClick);
};

const onSuccess = () => {
  success = createSucccessMessage();
  document.body.append(success);
  closePopupSuccess();
  userTitle.value = '';
  userAddress.value = `${TOKYO_CENTER_LAT}, ${TOKYO_CENTER_LNG}`;
  userRoomNumberContaner.value = userRoomNumbers[0].value;
  userCapacitysContainer.value = userCapacitys[2].value;
  userType.value = userTypes[1].value;
  userPrice.value = '';
  userPrice.placeholder = userTypeList[userType.value];
  userTimeoutContainer.value = userTimeouts[0].value;
  userTimeinContainer.value = userTimeins[0].value;
  userComment.value = '';
  featuresCheckboxes.forEach((features) => {
    features.checked = false;
  });

  mainPinMarker.setLatLng({
    lat: TOKYO_CENTER_LAT,
    lng: TOKYO_CENTER_LNG,
  });
  map.closePopup();
};
const onError = () => {
  error = createErrorMessage();
  document.body.append(error);
  closePopupError();
};

adForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  sendData(
    onSuccess,
    onError,
    new FormData(evt.target),
  );
});

const resetForm = () => {
  userTitle.value = '';
  userAddress.value = `${TOKYO_CENTER_LAT}, ${TOKYO_CENTER_LNG}`;
  userRoomNumberContaner.value = userRoomNumbers[0].value;
  userCapacitysContainer.value = userCapacitys[2].value;
  userType.value = userTypes[1].value;
  userPrice.value = '';
  userPrice.placeholder = userTypeList[userTypes[1].value];
  userTimeoutContainer.value = userTimeouts[0].value;
  userTimeinContainer.value = userTimeins[0].value;
  userComment.value = '';
  featuresCheckboxes.forEach((features) => {
    features.checked = false;
  });

  mainPinMarker.setLatLng({
    lat: TOKYO_CENTER_LAT,
    lng: TOKYO_CENTER_LNG,
  });
  map.closePopup();
};
const onResetFormClick = (evt) => {
  evt.preventDefault();
  resetForm();
};

adFormReset.addEventListener('click', onResetFormClick);

