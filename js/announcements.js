import { SIMILAR_ANNOUNCEMENT_COUNT, createRandomAnnouncement } from './createRandomAnnouncement.js';


const announcements = Array.from({
  length: SIMILAR_ANNOUNCEMENT_COUNT,
}, createRandomAnnouncement);

export { announcements };
