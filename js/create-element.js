export const createElement = (template, options = {}) => {
  const {elem = `div`, classList = []} = options;

  const container = document.createElement(elem);
  container.classList.add(...classList);
  container.innerHTML = template;

  return container;
};

export const composeElements = (elements) => {
  const container = document.createElement(`span`);

  for (let el of elements) {
    container.appendChild(el);
  }

  return container;
};
