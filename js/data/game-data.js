import {AnswerTypes, Images, LIVES_COUNT, PicTypes, QUESTIONS_COUNT, ScreenTypes} from '../constants';
import getScoreCount from '../get-score-count';

const getRandom = (start, end) => start + Math.floor(Math.random() * (end + 1));

const createScreens = () => {
  const preparatoryScreens = [ScreenTypes.INTRO, ScreenTypes.GREETING, ScreenTypes.RULES];
  const gameScreenTypes = [ScreenTypes.THO_OF_THO, ScreenTypes.PHOTO_OR_PAINT, ScreenTypes.ONE_OF_THREE];
  const gameScreens = Array(QUESTIONS_COUNT)
      .fill(null)
      .map(() => gameScreenTypes[getRandom(0, gameScreenTypes.length - 1)]);

  return preparatoryScreens
      .concat(gameScreens)
      .concat(ScreenTypes.STATS);
};

const getInitialState = () => ({
  livesCount: LIVES_COUNT,
  answers: [],
  screens: createScreens(),
  name: null,
});

const state = Object.assign({statistics: {}}, getInitialState());

export const model = Object.assign({state}, {
  setAnswer(answer) {
    this.state.answers.push(answer);
  },
  reduceLives() {
    --this.state.livesCount;
  },
  setName(name) {
    this.state.name = name;
  },
  saveGameResult() {
    const {statistics, name, answers, livesCount} = this.state;

    if (!statistics[name]) {
      statistics[name] = [];
    }

    if (answers.length === QUESTIONS_COUNT) {
      statistics[name] = [
        {
          speedBonus: answers.filter((answer) => answer === AnswerTypes.FAST).length,
          slownessPenalty: answers.filter((answer) => answer === AnswerTypes.SLOW).length,
          livesCount,
          answers,
          total: getScoreCount(answers, livesCount)
        },
        ...statistics[name]
      ];
    } else {
      const unknownAnswers = Array(QUESTIONS_COUNT - answers.length)
          .fill(AnswerTypes.UNKNOWN);

      statistics[name] = [
        {answers: answers.concat(unknownAnswers)},
        ...statistics[name]
      ];
    }
  },
  resetGame() {
    this.state = Object.assign(this.state, getInitialState());
  }
});

export const generateQuestion = (type) => {
  let question = null;

  switch (type) {
    case ScreenTypes.THO_OF_THO:
      question = {
        type: ScreenTypes.THO_OF_THO,
        options: [
          {src: Images.PAINTINGS[getRandom(0, 2)], type: PicTypes.PAINTING},
          {src: Images.PHOTOS[getRandom(0, 2)], type: PicTypes.PHOTO},
        ],
        answer: {
          first: PicTypes.PAINTING,
          second: PicTypes.PHOTO,
        }
      };
      break;

    case ScreenTypes.PHOTO_OR_PAINT:
      question = {
        type: ScreenTypes.PHOTO_OR_PAINT,
        options: [
          {src: Images.PAINTINGS[getRandom(0, 2)], type: PicTypes.PAINTING}
        ],
        answer: PicTypes.PAINTING
      };
      break;

    case ScreenTypes.ONE_OF_THREE:
      question = {
        type: ScreenTypes.PHOTO_OR_PAINT,
        options: [
          {src: Images.PHOTOS[getRandom(0, 2)], type: PicTypes.PHOTO},
          {src: Images.PHOTOS[getRandom(0, 2)], type: PicTypes.PHOTO},
          {src: Images.PAINTINGS[getRandom(0, 2)], type: PicTypes.PAINTING}
        ],
        answer: PicTypes.PAINTING
      };
      break;
  }

  return question;
};
