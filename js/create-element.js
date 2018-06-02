export const createElement = (template, options = {}) => {
  const {elem = `div`, classList = []} = options;

  const container = document.createElement(elem);
  container.classList.add(...classList);
  container.innerHTML = template;

  return container;
};

export const composeElements = (elements) => {
  const fragment = document.createDocumentFragment();

  for (let el of elements) {
    fragment.appendChild(el);
  }

  return fragment;
};
