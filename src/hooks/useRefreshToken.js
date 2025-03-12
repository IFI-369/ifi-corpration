import { axiosInstance } from "../api/apiConfig";
import useAuth from "./useAuth";

export default function useRefreshToken() {
  const { setAccessToken, setRefreshToken, setCSRFToken, setIsLoggedIn } =
    useAuth();

  const refresh = async () => {
    const refreshToken = localStorage.getItem("refresh_token");
    if (!refreshToken) {
      console.error("No refresh token available");
      setIsLoggedIn(false);
      return null;
    }

    try {
      const response = await axiosInstance.post(
        "auth/refresh-token",
        {},
        {
          headers: {
            Authorization: `Bearer ${refreshToken}`,
          },
        },
      );

      const newAccessToken = response.data.access;
      const newCSRFToken = response.headers["x-csrftoken"];

      setAccessToken(newAccessToken);
      setCSRFToken(newCSRFToken);

      if (response.data.refresh) {
        setRefreshToken(response.data.refresh);
      }

      return { accessToken: newAccessToken, csrfToken: newCSRFToken };
    } catch (error) {
      console.error("Error refreshing token:", error.message);
      setIsLoggedIn(false); // Log the user out if refresh fails
      return null;
    }
  };

  return refresh;
}
