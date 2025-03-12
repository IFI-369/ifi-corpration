import React, { useState, useEffect, createContext, ReactNode } from "react";

// Define the shape of the context
interface AuthContextType {
  user: Record<string, any>;
  setUser: (user: Record<string, any>) => void;
  accessToken: string | null;
  setAccessToken: (token: string | null) => void;
  refreshToken: string | null;
  setRefreshToken: (token: string | null) => void;
  csrftoken: string | null;
  setCSRFToken: (token: string | null) => void;
  isLoggedIn: boolean;
  setIsLoggedIn: (loggedIn: boolean) => void;
}

// Create the context
export const AuthContext = createContext<AuthContextType>({
  user: {},
  setUser: () => {},
  accessToken: null,
  setAccessToken: () => {},
  refreshToken: null,
  setRefreshToken: () => {},
  csrftoken: null,
  setCSRFToken: () => {},
  isLoggedIn: false,
  setIsLoggedIn: () => {},
});

// AuthContextProvider component
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<Record<string, any>>({});
  const [accessToken, setAccessToken] = useState<string | null>(
    () => localStorage.getItem("access_token") || null,
  );
  const [refreshToken, setRefreshToken] = useState<string | null>(
    () => localStorage.getItem("refresh_token") || null,
  );
  const [csrftoken, setCSRFToken] = useState<string | null>(
    () => localStorage.getItem("csrftoken") || null,
  );
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() =>
    JSON.parse(localStorage.getItem("isLoggedIn") || "false"),
  );

  // Persist all auth states to localStorage
  useEffect(() => {
    localStorage.setItem("isLoggedIn", JSON.stringify(isLoggedIn));
  }, [isLoggedIn]);

  useEffect(() => {
    if (accessToken !== null) {
      localStorage.setItem("access_token", accessToken);
    } else {
      localStorage.removeItem("access_token");
    }
  }, [accessToken]);

  useEffect(() => {
    if (refreshToken !== null) {
      localStorage.setItem("refresh_token", refreshToken);
    } else {
      localStorage.removeItem("refresh_token");
    }
  }, [refreshToken]);

  useEffect(() => {
    if (csrftoken !== null) {
      localStorage.setItem("csrftoken", csrftoken);
    } else {
      localStorage.removeItem("csrftoken");
    }
  }, [csrftoken]);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        accessToken,
        setAccessToken,
        refreshToken,
        setRefreshToken,
        csrftoken,
        setCSRFToken,
        isLoggedIn,
        setIsLoggedIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
