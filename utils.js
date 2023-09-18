export const createHtml = (type = "div", props = {}) => {
    const element = document.createElement(type);
    Object.entries(props).forEach(([key, val]) => (element[key] = val));
    return element;
};
