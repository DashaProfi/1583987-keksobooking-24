const adForm = document.querySelector('.ad-form');
const mapFilter = document.querySelector('.map__filters');


const activateInactivateAdForm = (isDisabled) => {
  if (isDisabled === 'true') {
    adForm.classList.add('ad-form--disabled');
    adForm.querySelectorAll('fieldset').forEach((fieldset) => {
      fieldset.setAttribute('disabled', 'disabled');
    });
  } else {
    adForm.classList.remove('ad-form--disabled');
    adForm.querySelectorAll('fieldset').forEach((fieldset) => {
      fieldset.removeAttribute('disabled');
    });
  }
};

const activateInactivateMapFilter = (isDisabled) => {
  if (isDisabled === 'true') {
    mapFilter.classList.add('map__filters--disabled');
    for (let i = 0; i < mapFilter.children.length; i++) {
      mapFilter.children[i].setAttribute('disabled', 'disabled');
    }
  } else {
    mapFilter.classList.remove('map__filters--disabled');
    for (let i = 0; i < mapFilter.children.length; i++) {
      mapFilter.children[i].removeAttribute('disabled');
    }
  }
};

const sortedArray = [];

function sortHousingType(array) {
  for (let index = 0; index < array.length; index++) {
    const userHousingType = array[index];
    if (sortedArray.includes(userHousingType)) {
      index--;
      continue;
    }
    sortedArray.push(userHousingType);
  }
}


function removeOldCards() {
  const oldCards = document.querySelectorAll('.popup');
  console.log(oldCards);
  oldCards.forEach((card) =>
    card.remove());
}


export {activateInactivateAdForm, activateInactivateMapFilter, sortHousingType, sortedArray, removeOldCards};

