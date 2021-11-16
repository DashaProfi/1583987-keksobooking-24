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
const adForm = document.querySelector('.ad-form');
const mapFilter = document.querySelector('.map__filters');

const inactivateAdForm = () => {
  adForm.classList.add('ad-form--disabled');
  adForm.querySelectorAll('fieldset').forEach((fieldset) => {
    fieldset.setAttribute('disabled', 'disabled');
  });
};

const inactivateMapFilter = () => {
  mapFilter.classList.add('.map__filters--disabled');
  for (let i = 0; i < mapFilter.children.length; i++) {
    mapFilter.children[i].setAttribute('disabled', 'disabled');
  }
};

const activateAdForm = () => {
  adForm.classList.remove('ad-form--disabled');
  adForm.querySelectorAll('fieldset').forEach((fieldset) => {
    fieldset.removeAttribute('disabled');
  });
};

const activateMapFilter = () => {
  mapFilter.classList.remove('.map__filters--disabled');
  for (let i = 0; i < mapFilter.children.length; i++) {
    mapFilter.children[i].removeAttribute('disabled');
  }
};
export { getRandomPositiveInteger, getRandomPositiveFloat, inactivateAdForm, inactivateMapFilter, activateAdForm, activateMapFilter };
