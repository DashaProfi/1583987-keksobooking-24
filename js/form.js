import {sendData} from './api.js';
import {mainPinMarker, map, TOKYO_CENTER_LAT, TOKYO_CENTER_LNG} from './map.js';

const MAX_ROOM_NUMBER = 100;
const MIN_ROOM_NUMBER = 0;

const userPrice = document.querySelector('#price'),
  userType = document.querySelector('#type'),
  userRoomNumberContaner = document.querySelector('#room_number'),
  userCapacitysContainer = document.querySelector('#capacity'),
  userCapacitys = document.querySelectorAll('#capacity>option');
const adForm = document.querySelector('.ad-form');
const userTimeinContainer = document.querySelector('#timein');
const userTimeoutContainer = document.querySelector('#timeout');
const adFormReset = document.querySelector('.ad-form__reset');
const adFormHeaderPreview = document.querySelector('.ad-form-header__preview img');
const avatarInput = document.querySelector('#avatar');
const housingImage = document.querySelector('#images');
const adFormPhoto = document.querySelector('.ad-form__photo');

const adFormPhotoContainer = document.querySelector('.ad-form__photo-container');

let success;
let error;
let containerPhoto;

const userTypeList = {
  bungalow: '0',
  flat: '1000',
  hotel: '3000',
  house: '5000',
  palace: '10000',
};

avatarInput.addEventListener('change', () => {
  adFormHeaderPreview.src = URL.createObjectURL(avatarInput.files[0]);
});

housingImage.addEventListener('change', () => {
  adFormPhoto.classList.remove('hidden');
  const array = Array.from(housingImage.files); // housingImage.files
  array.forEach((photo) => {
    containerPhoto = adFormPhoto.cloneNode();
    const userHousingImage = document.createElement('img');
    userHousingImage.src = URL.createObjectURL(photo);
    userHousingImage.style.width = '100%';
    userHousingImage.style.height = '100%';
    containerPhoto.append(userHousingImage);
    adFormPhotoContainer.append(containerPhoto);
  });
  adFormPhoto.classList.add('hidden');
});


userType.addEventListener('change', () => {
  userPrice.min = userTypeList[userType.value];
  userPrice.placeholder = userTypeList[userType.value];
});
const checkRoomNumber = () => {
  userCapacitys.forEach((el) => {
    if (Number(el.value) <= Number(userRoomNumberContaner.value) && Number(el.value) !== MIN_ROOM_NUMBER) {
      el.removeAttribute('disabled');
    } else {
      el.disabled = 'disabled';
    }
    if (Number(userRoomNumberContaner.value) === MAX_ROOM_NUMBER) {
      el.disabled = 'disabled';
      userCapacitys[3].removeAttribute('disabled');
    }
  });

  if (Number(userRoomNumberContaner.value) < Number(userCapacitysContainer.value)) {
    userRoomNumberContaner.setCustomValidity('Комнат не хватает!');
  } else if (Number(userCapacitysContainer.value) === MIN_ROOM_NUMBER && Number(userRoomNumberContaner.value) !== MAX_ROOM_NUMBER) {
    userRoomNumberContaner.setCustomValidity('Выберите 100 комнат');
  } else if (Number(userRoomNumberContaner.value) === MAX_ROOM_NUMBER && Number(userCapacitysContainer.value) !== MIN_ROOM_NUMBER) {
    userRoomNumberContaner.setCustomValidity('100 комнат не для гостей');
  } else {
    userRoomNumberContaner.setCustomValidity('');
  }

  userRoomNumberContaner.reportValidity();
};
const onUserRoomNumberContanerChange = () => {
  checkRoomNumber();
};

onUserRoomNumberContanerChange();

const onUserCapacitysContainerChange = () => {
  checkRoomNumber();
};
userRoomNumberContaner.addEventListener('change', onUserRoomNumberContanerChange);

userCapacitysContainer.addEventListener('change', onUserCapacitysContainerChange);

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

const resetFormAndMap = () => {
  adForm.reset();
  userPrice.placeholder = userTypeList[userType.value];
  mainPinMarker.setLatLng({
    lat: TOKYO_CENTER_LAT,
    lng: TOKYO_CENTER_LNG,
  });
  map.closePopup();
  const photoContainer = document.querySelectorAll('.ad-form__photo');
  photoContainer.forEach((photo) => {
    if (photo.classList.contains('hidden')) {
      photo.classList.remove('hidden');
    } else {
      photo.remove();
    }
  });
  adFormHeaderPreview.src='img/muffin-grey.svg';
};

const onSuccess = () => {
  success = createSucccessMessage();
  document.body.append(success);
  closePopupSuccess();
  resetFormAndMap();
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

const onResetFormClick = (evt) => {
  evt.preventDefault();
  resetFormAndMap();
};

adFormReset.addEventListener('click', onResetFormClick);
