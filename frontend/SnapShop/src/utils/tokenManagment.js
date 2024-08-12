export const storeToken = (token, user, rememberMe) => {
  const storage = rememberMe ? localStorage : sessionStorage;
  storage.setItem("token", token);
  storage.setItem("user", JSON.stringify(user));
};

export const getToken = () => {
  return localStorage.getItem("token") || sessionStorage.getItem("token");
};

export const getUser = () => {
  const user = localStorage.getItem("user") || sessionStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

export const clearToken = () => {
  localStorage.removeItem("token");
  sessionStorage.removeItem("token");
  localStorage.removeItem("user");
  sessionStorage.removeItem("user");
};
