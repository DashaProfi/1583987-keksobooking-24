import { activateAdForm, activateMapFilter } from './form.js';
import { announcements } from './announcements.js';
import { getPopupAnnouncements } from './popup.js';

const userAddress = document.querySelector('#address');
const TOKYO_CENTER_LAT = 35.6895;
const TOKYO_CENTER_LNG = 139.6917;

userAddress.value = `${TOKYO_CENTER_LAT}, ${TOKYO_CENTER_LNG}`;

const map = L.map('map-canvas')
  .on('load', () => {
    activateAdForm();
    activateMapFilter();
  })
  .setView({
    lat: TOKYO_CENTER_LAT,
    lng: TOKYO_CENTER_LNG,
  }, 10);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors | Icons made by <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a>',
  },
).addTo(map);

const mainPinIcon = L.icon({
  iconUrl: 'img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
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
  userAddress.value = `${userLocation.lat.toFixed(5)},${userLocation.lng.toFixed(5)}`;
});


announcements.forEach((card) => {
  const icon = L.icon({
    iconUrl: 'img/pin.svg',
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  });

  const marker = L.marker({
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

