import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import useAuth from "@/hooks/useAuth";
import useLogout from "@/hooks/useLogout";
import useUser from "@/hooks/useUser";

const User: React.FC = () => {
  const { user, loading: userLoading } = useAuth();
  const navigate = useNavigate();
  const logout = useLogout();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const { getUser, loading: userFetchLoading, error: userError } = useUser();
  const [apiKeys, setApiKeys] = useState<{ [key: string]: string }>({
    youtube: "",
    gemini: "",
    instagram: "",
    twitter: "",
  });

  useEffect(() => {
    console.log("User object:", user);
    console.log("is_staff value:", user?.is_staff);
    console.log("userLoading value:", userLoading); // Debugging: Check userLoading
    if (!userLoading && user && !user.is_staff) {
      console.log("User is not a staff member. Redirecting...");
      navigate("/");
    }
  }, [user, userLoading, navigate]);

  useEffect(() => {
    const fetchApiKeys = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/auth/api-keys/`,
        );
        if (!response.ok) {
          throw new Error("Failed to fetch API keys");
        }
        const data = await response.json();
        setApiKeys(data); // Set the fetched API keys as the default values
      } catch (err) {
        setError("Failed to fetch API keys. Please try again.");
        console.error(err);
      }
    };

    fetchApiKeys();
  }, []); // Fetch API keys only once

  const onLogout = async () => {
    setLoading(true);
    try {
      await logout();
      navigate("/login");
    } catch (err) {
      setError("Logout failed. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleApiKeyChange = (key: string, value: string) => {
    setApiKeys((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const onSave = async (event: React.FormEvent) => {
    event.preventDefault(); // Prevent the form from refreshing the page
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/auth/api-keys/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(apiKeys),
        },
      );

      if (!response.ok) {
        throw new Error("Failed to update API keys");
      }

      setSuccess("API keys updated successfully!");
    } catch (err) {
      setError("Failed to update API keys. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (userLoading || userFetchLoading) {
    return <p>Loading user data...</p>;
  }

  if (userError) {
    return <p className="text-red-500">{userError}</p>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">اطلاعات کاربری 👤</h1>

      {error && <div className="text-red-500 mb-4">{error}</div>}
      {success && <div className="text-green-500 mb-4">{success}</div>}

      {user ? (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">
            سلام، {user.first_name} {user.last_name}! 👋
          </h2>
          <p className="text-gray-700 dark:text-gray-300">
            <strong>ایمیل:</strong> {user.email}
          </p>
          <p className="text-gray-700 dark:text-gray-300">
            <strong>تاریخ ایجاد حساب:</strong>{" "}
            {new Date(user.created_at).toLocaleDateString("fa-IR")}
          </p>
          <p className="text-gray-700 dark:text-gray-300">
            <strong>آیا ادمین است؟:</strong>{" "}
            {user.is_superuser ? "بله ✅" : "خیر ❌"}
          </p>
          <p className="text-gray-700 dark:text-gray-300">
            <strong>آیا کارمند است؟:</strong>{" "}
            {user.is_staff ? "بله ✅" : "خیر ❌"}
          </p>

          <form onSubmit={onSave}>
            <div className="mt-4">
              <h3 className="text-xl font-bold mb-2">API Keys</h3>
              <div className="space-y-4">
                {Object.entries(apiKeys).map(([key, value]) => (
                  <div key={key}>
                    <label className="block text-gray-700 dark:text-gray-300">
                      {key.charAt(0).toUpperCase() + key.slice(1)} API Key:
                    </label>
                    <input
                      type="text"
                      value={value}
                      onChange={(e) => handleApiKeyChange(key, e.target.value)}
                      className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                ))}
              </div>
            </div>

            <Button type="submit" className="mt-4" disabled={loading}>
              {loading ? "در حال ذخیره..." : "ذخیره تغییرات 💾"}
            </Button>
          </form>
        </div>
      ) : (
        <p className="text-gray-700 dark:text-gray-300">
          در حال بارگذاری اطلاعات کاربری...
        </p>
      )}

      <Button className="mt-4" onClick={onLogout} disabled={loading}>
        {loading ? "در حال خروج..." : "خروج از حساب 🚪"}
      </Button>
    </div>
  );
};

export default User;
