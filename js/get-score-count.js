const QUESTIONS_COUNT = 10;
const LIVE_BONUS = 50;

export default function getScoreCount(answers, livesCount) {
  if (answers.length < QUESTIONS_COUNT || livesCount < 0) {
    return -1;
  }

  return answers.reduce((score, answer) => {
    score += answer;
    return score;
  }, 0) + livesCount * LIVE_BONUS;
}
