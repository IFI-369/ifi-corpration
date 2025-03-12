import useAuth from "./useAuth";
import { axiosPrivateInstance } from "../api/apiConfig";

export default function useLogout() {
  const {
    setUser,
    setAccessToken,
    setRefreshToken,
    setCSRFToken,
    setIsLoggedIn,
  } = useAuth();

  const logout = async () => {
    try {
      await axiosPrivateInstance.post("auth/logout");
      setAccessToken(null);
      setRefreshToken(null);
      setCSRFToken(null);
      setUser({});
      setIsLoggedIn(false);
    } catch (error) {
      console.log(error);
    }
  };

  return logout;
}

