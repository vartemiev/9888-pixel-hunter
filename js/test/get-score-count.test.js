import {assert} from 'chai';
import getScoreCount from '../get-score-count';

const RIGHT = 100;
const FAST = RIGHT + 50;
const SLOW = RIGHT - 50;
const WRONG = 0;

describe(`getScoreCount function`, () => {
  describe(`should return -1 when`, () => {
    it(`answers count less then 10`, () => {
      assert.equal(-1, getScoreCount([RIGHT, WRONG, SLOW, FAST], 3));
    });

    it(`lives count less than 0`, () => {
      assert.equal(-1, getScoreCount(Array(10).fill(RIGHT), -2));
    });
  });

  describe(`should return score count`, () => {
    it(`1150 if all the answers are RIGHT and there are 3 lives left`, () => {
      assert.equal(1150, getScoreCount(Array(10).fill(RIGHT), 3));
    });

    it(`500 if all the answers are SLOW and there are no lives left`, () => {
      assert.equal(500, getScoreCount(Array(10).fill(SLOW), 0));
    });

    it(`1600 if all the answers are FAST and there are 2 lives left`, () => {
      assert.equal(1600, getScoreCount(Array(10).fill(FAST), 2));
    });
  });
});
