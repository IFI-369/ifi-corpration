// src/context/AuthProvider.js
import { useEffect } from "react";
import { setupAxiosInterceptors } from "../api/axiosPrivate";
import useAuth from "../hooks/useAuth";
import useRefreshToken from "../hooks/useRefreshToken";

export default function AuthProvider({ children }) {
  const { accessToken, csrftoken, setAccessToken } = useAuth();
  const refresh = useRefreshToken();

  useEffect(() => {
    const getAuth = () => ({ accessToken, csrftoken, setAccessToken });
    const cleanup = setupAxiosInterceptors(getAuth, refresh);
    return cleanup;
  }, [accessToken, csrftoken, setAccessToken, refresh]);

  return <>{children}</>;
}
