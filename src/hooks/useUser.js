import { useEffect, useState } from "react";
import useAuth from "./useAuth";
import useAxiosPrivate from "./usePrivate";

export default function useUser() {
  const { isLoggedIn, setUser, accessToken, userLoading, setUserLoading } =
    useAuth();
  const axiosPrivateInstance = useAxiosPrivate();
  const [error, setError] = useState(null);

  const getUser = async () => {
    // Check if the user is logged in and the access token is available
    if (!isLoggedIn || !accessToken) {
      console.log("Not logged in or missing access token");
      return;
    }

    setUserLoading(true); // Use setUserLoading from useAuth
    setError(null);

    try {
      console.log("Fetching user data...");
      const { data } = await axiosPrivateInstance.get("auth/user");
      console.log("User data fetched successfully:", data);
      setUser(data); // Ensure the data matches the backend response
    } catch (error) {
      if (error.response) {
        console.error(
          `Error fetching user data: ${error.response.status} - ${error.response.statusText}`,
          error.response.data,
        );
        setError(error.response.data);
      } else {
        console.error("Error fetching user data:", error.message);
        setError(error.message);
      }
    } finally {
      setUserLoading(false); // Use setUserLoading from useAuth
    }
  };

  // Automatically fetch user data when the component mounts or when `isLoggedIn`/`accessToken` changes
  useEffect(() => {
    if (isLoggedIn && accessToken) {
      getUser();
    }
  }, [isLoggedIn, accessToken]);

  return { getUser, loading: userLoading, error }; // Return userLoading as loading
}
