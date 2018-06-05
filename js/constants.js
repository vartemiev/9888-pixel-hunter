export const QUESTIONS_COUNT = 10;
export const LIVE_BONUS = 50;
export const INTRO_SCREEN = 0;
export const GREETING_SCREEN = 1;
export const STATS_SCREEN = 13;
export const LIVES_COUNT = 3;

export const PicTypes = {
  PAINTING: `PAINTING`,
  PHOTO: `PHOTO`,
};

export const AnswerTypes = {
  FAST: `fast`,
  SLOW: `slow`,
  CORRECT: `correct`,
  WRONG: `wrong`,
  UNKNOWN: `unknown`
};

export const AnswerValues = {
  [AnswerTypes.FAST]: 150,
  [AnswerTypes.SLOW]: 50,
  [AnswerTypes.CORRECT]: 100,
  [AnswerTypes.UNKNOWN]: 0,
  [AnswerTypes.WRONG]: 0,
};

export const ScreenTypes = {
  INTRO: `INTRO`,
  RULES: `RULES`,
  STATS: `STATS`,
  GREETING: `GREETING`,
  THO_OF_THO: `THO_OF_THO`,
  ONE_OF_THREE: `ONE_OF_THREE`,
  PHOTO_OR_PAINT: `PHOTO_OR_PAINT`,
};

export const Images = {
  PAINTINGS: [
    `https://k42.kn3.net/CF42609C8.jpg`,
    `https://k42.kn3.net/D2F0370D6.jpg`,
    `https://k32.kn3.net/5C7060EC5.jpg`
  ],
  PHOTOS: [
    `http://i.imgur.com/1KegWPz.jpg`,
    `https://i.imgur.com/DiHM5Zb.jpg`,
    `http://i.imgur.com/DKR1HtB.jpg`
  ]
};
