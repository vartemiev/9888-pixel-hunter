import {assert} from 'chai';
import setTimer from '../timer';

describe(`setTimer function`, () => {
  it(`return object`, () => {
    assert.equal(`object`, typeof setTimer(10));
  });

  it(`returns the object with 'done' flag set to 'false' and left time`, () => {
    assert.deepEqual({done: false, value: 5}, setTimer(6).tick());
  });

  it(`returns the object with 'done' flag set to 'true'`, () => {
    assert.deepEqual({done: true}, setTimer(1).tick());
  });

  it(`returns left time by 'time' getter`, () => {
    const timer = setTimer(6);
    timer.tick();

    assert.equal(5, timer.time);
  });
});
