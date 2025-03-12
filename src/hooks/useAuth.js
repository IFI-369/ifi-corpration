import { useContext, useDebugValue, useState } from "react";
import { AuthContext } from "@/context/AuthContext";

export default function useAuth() {
  const auth = useContext(AuthContext);
  const [userLoading, setUserLoading] = useState(true); // Initialize to true

  useDebugValue(auth, (auth) => (auth?.user ? "Logged In" : "Logged Out"));

  return {
    ...auth, // Spread existing auth context values
    userLoading, // Expose userLoading
    setUserLoading, // Expose setUserLoading for useUser to update it
  };
}
