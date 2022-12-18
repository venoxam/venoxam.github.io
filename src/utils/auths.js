let currentUser;
// eslint-disable-next-line
const getAuthenticatedUser = () => {
  if (currentUser !== undefined) return currentUser;
  const serializedUser = localStorage.getItem("user");
  if (!serializedUser) return undefined;
  currentUser = JSON.parse(serializedUser);
}

const setAuthenticatedUser = (authenticatedUser) => {
  const serializedUser = JSON.stringify(authenticatedUser);
  localStorage.setItem("user", serializedUser);
  currentUser = authenticatedUser;
};

const isAuthenticated = () => currentUser !== undefined;

const clearAuthenticatedUser = () => {
  localStorage.removeItem("user");
  currentUser = undefined;
};

export { getAuthenticatedUser, setAuthenticatedUser, isAuthenticated, clearAuthenticatedUser };
