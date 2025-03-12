import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import useAuth from "@/hooks/useAuth";
import useLogout from "@/hooks/useLogout";
import useUser from "@/hooks/useUser";

const User: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const logout = useLogout();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { getUser, loading: userLoading, error: userError } = useUser();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        await getUser();
      } catch (err) {
        setError("Failed to fetch user data. Please try again.");
        console.error(err);
      }
    };

    fetchUser();
  }, [getUser]);

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

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">اطلاعات کاربری 👤</h1>

      {(error || userError) && (
        <div className="text-red-500 mb-4">{error || userError}</div>
      )}

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
            {user.is_staff ? "بله ✅" : "خیر ❌"}
          </p>

          {/* Conditionally render the Admin Button */}
          {user.is_staff && (
            <Button
              className="mt-4"
              onClick={() => navigate("/admin")}
              disabled={loading}
            >
              پنل ادمین
            </Button>
          )}
        </div>
      ) : (
        <p className="text-gray-700 dark:text-gray-300">
          {userLoading
            ? "در حال بارگذاری اطلاعات کاربری..."
            : "No user data available."}
        </p>
      )}

      <Button className="mt-4" onClick={onLogout} disabled={loading}>
        {loading ? "در حال خروج..." : "خروج از حساب 🚪"}
      </Button>
    </div>
  );
};

export default User;
