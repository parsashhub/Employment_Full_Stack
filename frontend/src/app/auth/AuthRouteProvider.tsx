import React, { createContext, useCallback, useContext, useMemo } from "react";
import FuseAuthorization from "@fuse/core/FuseAuthorization";
import { useAppDispatch } from "app/store/store";
import FuseSplashScreen from "@fuse/core/FuseSplashScreen/FuseSplashScreen";
import {
  resetUser,
  selectUser,
  selectUserRole,
  setUser,
  updateUser,
  userSlice,
} from "src/app/auth/user/store/userSlice";
import BrowserRouter from "@fuse/core/BrowserRouter";
import { PartialDeep } from "type-fest";
import { useSelector } from "react-redux";
import withReducer from "app/store/withReducer";
import useJwtAuth, { JwtAuth } from "./services/jwt/useJwtAuth";
import { User } from "./user";

/**
 * Initialize Firebase
 */

export type SignInPayload = {
  email: string;
  password: string;
};

export type SignUpPayload = {
  role: string;
  firstname: string;
  lastname: string;
  phoneNumber: string;
  password: string;
  email:string
};

type AuthContext = {
  jwtService?: JwtAuth<SignInPayload, SignUpPayload>;
  signOut?: () => void;
  updateUser?: (U: PartialDeep<User>) => void;
  isAuthenticated: boolean;
};

const AuthContext = createContext<AuthContext>({
  isAuthenticated: false,
});

type AuthProviderProps = { children: React.ReactNode };

function AuthRoute(props: AuthProviderProps) {
  const { children } = props;
  const dispatch = useAppDispatch();
  const user = useSelector(selectUser);
  /**
   * Get user role from store
   */
  const userRole = useSelector(selectUserRole);

  /**
   * Jwt auth service
   */
  const jwtService = useJwtAuth({
    onSignedIn: (user: any) => {
      dispatch(setUser(user));
      setAuthService("jwt");
    },
    onSignedUp: (user) => {
      dispatch(setUser(user));
      setAuthService("jwt");
    },
    onSignedOut: () => {
      dispatch(resetUser());
      resetAuthService();
      window.location.reload();
    },
    onUpdateUser: (user) => {
      dispatch(updateUser(user));
    },
    onError: (error) => {
      // eslint-disable-next-line no-console
      console.warn(error);
    },
  });

  /**
   * Check if services is in loading state
   */
  const isLoading = useMemo(
    () => jwtService?.isLoading,
    [jwtService?.isLoading],
  );

  /**
   * Check if user is authenticated
   */
  const isAuthenticated = useMemo(
    () => jwtService?.isAuthenticated,
    [jwtService?.isAuthenticated],
  );

  /**
   * Combine auth services
   */
  const combinedAuth = useMemo<AuthContext>(
    () => ({
      jwtService,
      signOut: () => {
        const authService = getAuthService();

        if (authService === "jwt") {
          return jwtService?.signOut();
        }

        return null;
      },
      updateUser: (userData) => {
        const authService = getAuthService();

        if (authService === "jwt") {
          return jwtService?.updateUser(userData);
        }

        return null;
      },
      isAuthenticated,
    }),
    [isAuthenticated, user],
  );

  /**
   * Get auth service
   */
  const getAuthService = useCallback(() => {
    return localStorage.getItem("authService");
  }, []);

  /**
   * Set auth service
   */
  const setAuthService = useCallback((authService: string) => {
    if (authService) {
      localStorage.setItem("authService", authService);
    }
  }, []);

  /**
   * Reset auth service
   */
  const resetAuthService = useCallback(() => {
    localStorage.removeItem("authService");
  }, []);

  /**
   * Render loading screen while loading user data
   */
  if (isLoading) {
    return <FuseSplashScreen />;
  }

  return (
    <AuthContext.Provider value={combinedAuth}>
      <BrowserRouter>
        <FuseAuthorization userRole={userRole}>{children}</FuseAuthorization>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

function useAuth(): AuthContext {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within a AuthRouteProvider");
  }
  return context;
}

const AuthRouteProvider = withReducer<AuthProviderProps>(
  "user",
  userSlice.reducer,
)(AuthRoute);

export { useAuth, AuthRouteProvider };
