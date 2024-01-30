import { useState, useEffect, useCallback } from "react";
import axios, { AxiosError, AxiosResponse } from "axios";
import { PartialDeep } from "type-fest";
import { toast } from "react-toastify";

const defaultAuthConfig = {
  tokenStorageKey: "jwt_access_token",
  signInUrl: "/auth/signIn",
  signUpUrl: "/auth/signUp",
  tokenRefreshUrl: "api/auth/refresh",
  getUserUrl: "/users/me",
  updateUserUrl: "/users",
  updateTokenFromHeader: false,
};

export type JwtAuthProps<T> = {
  onSignedIn?: (U: T) => void;
  onSignedUp?: (U: T) => void;
  onSignedOut?: () => void;
  onUpdateUser?: (U: T) => void;
  onError?: (error: AxiosError) => void;
};

export type JwtAuth<SignInPayload, SignUpPayload> = {
  isAuthenticated: boolean;
  isLoading: boolean;
  signIn: (U: SignInPayload) => Promise<AxiosResponse<any, AxiosError>>;
  signOut: () => void;
  signUp: (U: SignUpPayload) => Promise<AxiosResponse<any, AxiosError>>;
  updateUser: (U: PartialDeep<any>) => void;
  setIsLoading: (isLoading: boolean) => void;
};

/**
 * useJwtAuth hook
 * Description: This hook handles the authentication flow using JWT
 * It uses axios to make the HTTP requests
 * It uses jwt-decode to decode the access token
 * It uses localStorage to store the access token
 * It uses Axios interceptors to update the access token from the response headers
 * It uses Axios interceptors to sign out the user if the refresh token is invalid or expired
 */

const useJwtAuth = <SignInPayload, SignUpPayload>(
  props: JwtAuthProps<any>,
): JwtAuth<SignInPayload, SignUpPayload> => {
  const { onSignedIn, onSignedOut, onSignedUp, onError, onUpdateUser } = props;

  // Merge default config with the one from the props
  const authConfig = defaultAuthConfig;

  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const setInterceptors = () => {
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
            resetSession();
            setIsAuthenticated(false);
            setTimeout(() => onSignedOut(), 3000);
          }
          throw err;
        });
      },
    );
  };

  /**
   * Set session
   */
  const setSession = useCallback((accessToken: string) => {
    if (accessToken) {
      localStorage.setItem(authConfig.tokenStorageKey, accessToken);
      axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
    }
  }, []);

  const resetSession = useCallback(() => {
    localStorage.removeItem("user");
    localStorage.removeItem(authConfig.tokenStorageKey);
    delete axios.defaults.headers.common.Authorization;
  }, []);

  const setUserInfo = useCallback(
    (userInfo: any) =>
      userInfo ? localStorage.setItem("user", JSON.stringify(userInfo)) : null,
    [],
  );

  const getUserInfo = useCallback(() => {
    return JSON.parse(window.localStorage.getItem("user"));
  }, []);

  const getAccessToken = useCallback(() => {
    return localStorage.getItem(authConfig.tokenStorageKey);
  }, []);

  /**
   * Handle sign-in success
   */
  const handleSignInSuccess = useCallback(
    (userData: any, accessToken: string) => {
      let temp = { data: userData, role: userData.role };
      setSession(accessToken);
      setUserInfo(temp);

      setIsAuthenticated(true);
      onSignedIn(temp);
    },
    [],
  );
  /**
   * Handle sign-up success
   */

  const handleSignUpSuccess = useCallback(
    (userData: any, accessToken: string) => {
      let temp = { data: userData, role: userData.role };
      setSession(accessToken);
      setUserInfo(temp);

      setIsAuthenticated(true);
      onSignedUp(temp);
    },
    [],
  );

  /**
   * Handle sign-in failure
   */
  const handleSignInFailure = useCallback((error: AxiosError) => {
    resetSession();

    setIsAuthenticated(false);
    toast.error(
      // @ts-ignore
      error.response.data?.message[0] ??
        // @ts-ignore
        error.response.data?.message?.details[0].message ??
        error.message,
    );

    handleError(error);
  }, []);

  /**
   * Handle sign-up failure
   */
  const handleSignUpFailure = useCallback((error: AxiosError) => {
    resetSession();

    setIsAuthenticated(false);
    toast.error(
      // @ts-ignore
      error.response.data?.message[0] ??
        // @ts-ignore
        error.response.data?.message?.details[0].message ??
        error.message,
    );

    handleError(error);
  }, []);

  /**
   * Handle 404
   */
  const handleError = useCallback((error: AxiosError) => {
    onError(error);
  }, []);

  /**
   * Check if the access token is valid
   */
  const isTokenValid = useCallback((accessToken: string) => {
    return !!accessToken;
  }, []);

  useEffect(() => {
    setInterceptors();
  }, []);

  /**
   * Check if the access token exist and is valid on mount
   * If it is, set the user and isAuthenticated states
   * If not, clear the session
   */
  useEffect(() => {
    const attemptAutoLogin = async () => {
      const accessToken = getAccessToken();
      if (isTokenValid(accessToken)) {
        axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

        return true;
      } else {
        resetSession();
        return false;
      }
    };

    if (!isAuthenticated) {
      attemptAutoLogin().then(() => {
        setIsLoading(false);
      });
    }
  }, [
    isTokenValid,
    setSession,
    handleSignInSuccess,
    handleSignInFailure,
    handleError,
    getAccessToken,
    isAuthenticated,
  ]);

  /**
   * Sign in
   */
  const signIn = async (credentials: SignInPayload) => {
    const response = axios.post(authConfig.signInUrl, credentials);
    response.then(
      (res: AxiosResponse<{ data: any; token: string }>) => {
        const { data: userData, token } = res.data;
        handleSignInSuccess(userData, token);
        return userData;
      },
      (error) => {
        const axiosError = error as AxiosError;
        handleSignInFailure(axiosError);

        return axiosError;
      },
    );

    return response;
  };

  /**
   * Sign up
   */
  const signUp = useCallback((data: SignUpPayload) => {
    const response = axios.post(authConfig.signUpUrl, data);

    response.then(
      (res: AxiosResponse<{ data: any; token: string; message: string[] }>) => {
        const { data: userData, token, message } = res.data;
        handleSignUpSuccess(userData, token);
        toast.success(message[0]);
        return userData;
      },
      (error) => {
        const axiosError = error as AxiosError;
        handleSignUpFailure(axiosError);

        return axiosError;
      },
    );

    return response;
  }, []);

  /**
   * Sign out
   */
  const signOut = useCallback(() => {
    resetSession();

    setIsAuthenticated(false);

    onSignedOut();
  }, []);

  /**
   * Update user
   */
  const updateUser = useCallback(async (userData: any) => {
    try {
      const response: AxiosResponse<any, PartialDeep<any>> = await axios.put(
        authConfig.updateUserUrl,
        userData,
      );

      const updatedUserData = response?.data;

      onUpdateUser(updatedUserData);

      return null;
    } catch (error) {
      const axiosError = error as AxiosError;

      handleError(axiosError);
      return axiosError;
    }
  }, []);

  /**
   * if a successful response contains a new Authorization header,
   * updates the access token from it.
   *
   */
  useEffect(() => {
    if (authConfig.updateTokenFromHeader && isAuthenticated) {
      axios.interceptors.response.use(
        (response) => {
          const newAccessToken = response?.headers?.[
            "New-Access-Token"
          ] as string;

          if (newAccessToken) {
            setSession(newAccessToken);
          }
          return response;
        },
        (error) => {
          const axiosError = error as AxiosError;

          if (axiosError?.response?.status === 401) {
            signOut();
            // eslint-disable-next-line no-console
            console.warn("Unauthorized request. User was signed out.");
          }
          return Promise.reject(axiosError);
        },
      );
    }
  }, [isAuthenticated]);

  return {
    isAuthenticated,
    isLoading,
    signIn,
    signUp,
    signOut,
    updateUser,
    setIsLoading,
  };
};

export default useJwtAuth;
