// hooks/useApiKeys.ts
import { useState, useEffect } from "react";
import usePrivate from "@/hooks/usePrivate";

interface ApiKeys {
  youtube: string;
  gemini: string;
  instagram: string;
  twitter: string;
}

export default function useApiKeys() {
  const privateFetch = usePrivate();
  const [apiKeys, setApiKeys] = useState<ApiKeys>({
    youtube: "",
    gemini: "",
    instagram: "",
    twitter: "",
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch API keys from the backend on component mount
  useEffect(() => {
    const fetchKeys = async () => {
      try {
        const response = await privateFetch(
          `${import.meta.env.VITE_BACKEND_URL}/auth/api-keys/`,
          {
            method: "GET",
          },
        );

        if (!response.ok) {
          throw new Error("Failed to fetch API keys");
        }

        const data = await response.json();
        setApiKeys({
          youtube: data.youtube || "",
          gemini: data.gemini || "",
          instagram: data.instagram || "",
          twitter: data.twitter || "",
        });
      } catch (error) {
        setError("Failed to fetch API keys");
      }
    };

    fetchKeys();
  }, [privateFetch]);

  // Handle updating API keys
  const handleApplyKeys = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await privateFetch(
        `${import.meta.env.VITE_BACKEND_URL}/auth/api-keys/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(apiKeys), // Send the updated keys in JSON format
        },
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Update failed");
      }

      alert("API Keys Updated!");
    } catch (error: any) {
      setError(`Failed to update API Keys: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return {
    apiKeys,
    setApiKeys,
    loading,
    error,
    handleApplyKeys,
  };
}
