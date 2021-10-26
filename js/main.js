import { SIMILAR_ANNOUNCEMENT_COUNT, createRandomAnnouncement } from './createRandomAnnouncement.js';
import { getPopupAnnouncements } from './popup.js';
import './form.js';

const announcements = Array.from({
  length: SIMILAR_ANNOUNCEMENT_COUNT,
}, createRandomAnnouncement);

const map = document.querySelector('#map-canvas');
map.appendChild(getPopupAnnouncements(announcements[0]));
