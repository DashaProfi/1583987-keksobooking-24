import {getPopupAnnouncements} from './popup.js';
import {getData} from './api.js';
import {
  activateInactivateAdForm,
  activateInactivateMapFilter
} from './util.js';
import {getFilteredCards
} from './filter.js';
import {
  MAIN_PIN_ANCHOR_X, MAIN_PIN_ANCHOR_Y,
  MAIN_PIN_ICON_HEIGHT,
  MAIN_PIN_ICON_WIDTH, PIN_ANCHOR_X, PIN_ANCHOR_Y, PIN_ICON_HEIGHT, PIN_ICON_WIDTH, SIMILAR_ANNOUNCEMENTS_COUNT, TIME,
  TOKYO_CENTER_LAT,
  TOKYO_CENTER_LNG,
  ZOOM_DEFAULT
} from './constants.js';


const userAddress = document.querySelector('#address');

const housingType = document.querySelector('#housing-type');
const housingPrice = document.querySelector('#housing-price');
const housingRooms = document.querySelector('#housing-rooms');
const housingGuests = document.querySelector('#housing-guests');
const filterDishwasher = document.querySelector('#filter-dishwasher');
const filterWiFi = document.querySelector('#filter-wifi');
const filterParking = document.querySelector('#filter-parking');
const filterWasher = document.querySelector('#filter-washer');
const filterElevator = document.querySelector('#filter-elevator');
const filterConditioner = document.querySelector('#filter-conditioner');

let timer;

activateInactivateAdForm('true');
activateInactivateMapFilter('true');

userAddress.value = `${TOKYO_CENTER_LAT}, ${TOKYO_CENTER_LNG}`;

const map = L.map('map-canvas')
  .on('load', () => {
    activateInactivateAdForm('false');
  })
  .setView({
    lat: TOKYO_CENTER_LAT,
    lng: TOKYO_CENTER_LNG,
  }, ZOOM_DEFAULT);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap1.org/copyright">OpenStreetMap</a> contributors | Icons made by <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a>',
  },
).addTo(map);

const mainPinIcon = L.icon({
  iconUrl: 'img/main-pin.svg',
  iconSize: [MAIN_PIN_ICON_WIDTH, MAIN_PIN_ICON_HEIGHT],
  iconAnchor: [MAIN_PIN_ANCHOR_X, MAIN_PIN_ANCHOR_Y],
});

const mainPinMarker = L.marker(
  {
    lat: TOKYO_CENTER_LAT,
    lng: TOKYO_CENTER_LNG,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  },
);


mainPinMarker.addTo(map);
mainPinMarker.on('moveend', (evt) => {
  const userLocation = evt.target.getLatLng();
  userAddress.value = `${userLocation.lat.toFixed(5)}, ${userLocation.lng.toFixed(5)}`;
});

const markerGroup = L.layerGroup().addTo(map);

const onSuccess = (announcements) => {
  announcements.slice(0, SIMILAR_ANNOUNCEMENTS_COUNT).forEach((card) => {
    const icon = L.icon({
      iconUrl: 'img/pin.svg',
      iconSize: [PIN_ICON_WIDTH, PIN_ICON_HEIGHT],
      iconAnchor: [PIN_ANCHOR_X, PIN_ANCHOR_Y],
    });

    const marker = L.marker(
      {
        lat: card.location.lat,
        lng: card.location.lng,
      },
      {
        icon,
      },
    );
    marker
      .addTo(markerGroup)
      .bindPopup(getPopupAnnouncements(card));
  });
  activateInactivateMapFilter('false');
};

const div = document.createElement('div');
div.innerHTML = '<p>"Не удалось загрузить данные. Попробуйте ещё раз"</p>';
const text = div.querySelector('p');
div.style.cssText = `
position: fixed;
    top: 0;
    left: 0;
    z-index: 1100;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    overflow: auto;
    padding-top: 300;

    display: flex;
    justify-content:center;
    align-items:center;
    text-align: center;
    vertical-align: middle;
    background-color: rgba(0, 0, 0, 0.8);
 `;
text.style.cssText = `
position: relative;
color: #ffffff;
font - size: 50px;
font - weight: 700;
`;

function getTimeOut() {
  clearTimeout(timer);
  timer = setTimeout(getFilteredCards, TIME);
}
housingType.addEventListener('change', getTimeOut);
housingPrice.addEventListener('change', getTimeOut);
housingRooms.addEventListener('change', getTimeOut);
housingGuests.addEventListener('change', getTimeOut);
filterDishwasher.addEventListener('change', getTimeOut);
filterWiFi.addEventListener('change', getTimeOut);
filterParking.addEventListener('change', getTimeOut);
filterWasher.addEventListener('change', getTimeOut);
filterElevator.addEventListener('change', getTimeOut);
filterConditioner.addEventListener('change', getTimeOut);

const closePopup = () => {
  document.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      div.remove();
    }
  });
  div.addEventListener('click', (evt) => {
    evt.preventDefault();
    div.remove();
  });
};
const onFail = () => {
  document.body.prepend(div);
  closePopup();
};

getData(onSuccess, onFail);

export {
  mainPinMarker, map, TOKYO_CENTER_LAT, TOKYO_CENTER_LNG, filterConditioner,
  housingRooms,
  housingType,
  housingPrice,
  housingGuests,
  filterDishwasher,
  filterWasher,
  filterWiFi,
  filterParking,
  filterElevator,
  onSuccess,
  markerGroup
};
