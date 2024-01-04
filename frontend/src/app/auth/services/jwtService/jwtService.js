import FuseUtils from "@fuse/utils/FuseUtils";
import axios from "axios";
import jwtDecode from "jwt-decode";
import jwtServiceConfig from "./jwtServiceConfig";
import { toast } from "react-toastify";

/* eslint-disable camelcase */

class JwtService extends FuseUtils.EventEmitter {
  init() {
    this.setInterceptors();
    this.handleAuthentication();
  }

  setInterceptors = () => {
    axios.interceptors.response.use(
      (response) => {
        return response;
      },
      (err) => {
        return new Promise((resolve, reject) => {
          if (
            err.response.status === 401 &&
            err.config &&
            !err.config.__isRetryRequest
          ) {
            // if you ever get an unauthorized response, logout the user
            this.emit("onAutoLogout", "Invalid access_token");
            this.setSession(null);
          }
          throw err;
        });
      },
    );
  };

  handleAuthentication = () => {
    const access_token = this.getAccessToken();

    if (!access_token) {
      this.emit("onNoAccessToken");

      return;
    }

    if (this.isAuthTokenValid(access_token)) {
      this.setSession(access_token);
      this.emit("onAutoLogin", true);
    } else {
      this.setSession(null);
      this.emit("onAutoLogout", "access_token expired");
    }
  };

  createUser = (data) => {
    return new Promise((resolve, reject) => {
      axios
        .post(jwtServiceConfig.signUp, data)
        .then((response) => {
          toast.success(response.data.message[0]);
          resolve(response);
        })
        .catch((error) => {
          toast.error(error.response?.data?.message[0] ?? error.message);
        });
    });
  };

  signInWithEmailAndPassword = (email, password) => {
    return new Promise((resolve, reject) => {
      axios
        .post(jwtServiceConfig.signIn, {
          email,
          password,
        })
        .then((response) => {
          if (response.data.token) {
            const theUser = {
              role: response.data.data.role,
              data: response.data.data,
              settings: null,
            };
            this.setSession(response.data.token);
            this.setUserInfo(theUser);
            resolve(theUser);
            this.emit("onLogin", response.data);
          } else {
            reject(response.data.message);
          }
        })
        .catch((error) => {
          toast.error(error.response.data?.message[0]);
        });
    });
  };

  signInWithToken = () => {
    return new Promise((resolve, reject) => {
      return this.getUserInfo() ? resolve(this.getUserInfo()) : reject();
    });
  };

  updateUserData = (user) => {
    // return axios.post(jwtServiceConfig.updateUser, {
    //   user,
    // });
  };

  setSession = (access_token) => {
    if (access_token) {
      localStorage.setItem("jwt_access_token", access_token);
      axios.defaults.headers.common.Authorization = `Bearer ${access_token}`;
    } else {
      localStorage.removeItem("jwt_access_token");
      delete axios.defaults.headers.common.Authorization;
    }
  };

  logout = async () => {
    this.setSession(null);
    this.setUserInfo(null);
    this.emit("onLogout", "Logged out");
  };

  isAuthTokenValid = (access_token) => {
    if (!access_token) {
      return false;
    }
    const decoded = jwtDecode(access_token);
    const currentTime = Date.now() / 1000;
    if (decoded.exp < currentTime) {
      console.warn("access token expired");
      return false;
    }

    return true;
  };
  setUserInfo = (userInfo) =>
    userInfo
      ? localStorage.setItem("user", JSON.stringify(userInfo))
      : localStorage.removeItem("user");

  getAccessToken = () => {
    return window.localStorage.getItem("jwt_access_token");
  };
  getUserInfo = () => {
    return JSON.parse(window.localStorage.getItem("user"));
  };
}

const instance = new JwtService();

export default instance;
