export default function setTimer(timeout) {
  return {
    tick() {
      return --timeout > 0 ?
        {done: false, value: timeout} :
        {done: true};
    },
    get time() {
      return timeout;
    }
  };
}
