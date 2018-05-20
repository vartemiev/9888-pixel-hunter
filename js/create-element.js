export const createElement = (template) => {
  const container = document.createElement(`span`);
  container.innerHTML = template;

  return container;
};
