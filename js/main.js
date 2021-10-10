import { SIMILAR_ANNOUNCEMENT_COUNT, createRandomAnnouncement } from './createRandomAnnouncement.js';

Array.from({
  length: SIMILAR_ANNOUNCEMENT_COUNT,
}, createRandomAnnouncement);
