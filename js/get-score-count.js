import {QUESTIONS_COUNT, LIVE_BONUS, AnswerValues} from './constants';

export default function getScoreCount(answers, livesCount) {
  if (answers.length < QUESTIONS_COUNT || livesCount < 0) {
    return -1;
  }

  return answers.reduce((score, answer) => {
    score += AnswerValues[answer];
    return score;
  }, 0) + livesCount * LIVE_BONUS;
}
