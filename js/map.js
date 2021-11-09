import { activateAdForm, activateMapFilter } from './form.js';
import { announcements } from './announcements.js';
import { getPopupAnnouncements } from './popup.js';

const userAddress = document.querySelector('#address');
const TOKYO_CENTER_LAT = 35.6895;
const TOKYO_CENTER_LNG = 139.6917;
const MAIN_PIN_ICON_HEIGHT = 52;
const MAIN_PIN_ICON_WIDTH = 52;
const MAIN_PIN_ANCHOR_X = 26;
const MAIN_PIN_ANCHOR_Y = 52;
const PIN_ICON_HEIGHT = 40;
const PIN_ICON_WIDTH = 40;
const PIN_ANCHOR_X = 20;
const PIN_ANCHOR_Y = 40;
const ZOOM_DEFAULT = 12;

userAddress.value = `${TOKYO_CENTER_LAT}, ${TOKYO_CENTER_LNG}`;

const map = L.map('map-canvas')
  .on('load', () => {
    activateAdForm();
    activateMapFilter();
  })
  .setView({
    lat: TOKYO_CENTER_LAT,
    lng: TOKYO_CENTER_LNG,
  }, ZOOM_DEFAULT);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors | Icons made by <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a>',
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


announcements.forEach((card) => {
  const icon = L.icon({
    iconUrl: 'img/pin.svg',
    iconSize: [PIN_ICON_WIDTH, PIN_ICON_HEIGHT],
    iconAnchor: [PIN_ANCHOR_X, PIN_ANCHOR_Y],
  });

  const marker = L.marker(
    {
      lat: card.locate.lat,
      lng: card.locate.lng,
    },
    {
      icon,
    },
  );
  marker
    .addTo(map)
    .bindPopup(getPopupAnnouncements(card));
});

