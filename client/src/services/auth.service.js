import axios from "axios";

const API_URL = "http://localhost:7000/";

const register = async (values) => {
  const { email, password } = values;
  return axios.post(API_URL + "signup", {
    email,
    password,
  });
};

const login = async (values) => {
  const { email, password } = values;
  console.log(email, password);
  return await axios.post(API_URL + "signin", {
    email,
    password,
  })
    .then((response) => {
      if (response.data.email) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }
      return response.data;
    });
};

const logout = async () => {
  localStorage.removeItem("user");
  return axios.post(API_URL + "signout").then((response) => {
    return response.data;
  });
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

const checkLoginStatus = () => {
  const user = getCurrentUser();
  if (user) {
    return axios.post(API_URL + "check").then((response) => {
      return response.status === 200;
    });
  }
  return false;
}

const AuthService = {
  register,
  login,
  logout,
  getCurrentUser,
  checkLoginStatus
}

export default AuthService;