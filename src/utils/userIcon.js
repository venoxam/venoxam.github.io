let currentIcon;

const getUserIcon = () => currentIcon;

const setUserIcon = (icon) => {
  currentIcon = icon;
};

const clearUserIcon = () => {
  currentIcon = undefined;
};

export { getUserIcon, setUserIcon, clearUserIcon };