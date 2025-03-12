import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AuthContext } from "@/context/AuthContext";
import axios from "axios";

export default function LoginPage() {
  const {
    setUser,
    setAccessToken,
    setRefreshToken,
    setCSRFToken,
    setIsLoggedIn,
  } = useContext(AuthContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/auth/login`,
        { email: email.trim(), password: password.trim() },
        { withCredentials: true },
      );

      const { access_token, refresh_token, csrf_token } = response.data;

      // Store tokens securely
      localStorage.setItem("accessToken", access_token); // Example: Store in localStorage
      setAccessToken(access_token);
      setRefreshToken(refresh_token);
      setCSRFToken(csrf_token);

      // Fetch and set user data
      const userResponse = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/auth/user`,
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        },
      );
      setUser(userResponse.data);

      setIsLoggedIn(true);
      setSuccess("ورود با موفقیت انجام شد! 🎉");
      setTimeout(() => navigate("/user"), 1500);
    } catch (err) {
      setError("ایمیل یا رمز عبور اشتباه است. ❌");
      console.error("Login error:", err.response || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[90vh]" dir="rtl">
      <form
        onSubmit={handleSubmit}
        className="space-y-6 p-5 border rounded-lg max-w-md w-full"
      >
        <h1 className="text-3xl font-bold mb-5">ورود به حساب کاربری 🚀</h1>

        <div className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium">
              ایمیل 📧
            </label>
            <Input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="ایمیل خود را وارد کنید"
              className="mt-1"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium">
              رمز عبور 🔒
            </label>
            <Input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="رمز عبور خود را وارد کنید"
              className="mt-1"
            />
          </div>
        </div>

        {error && <div className="text-red-500 text-sm">{error}</div>}
        {success && <div className="text-green-500 text-sm">{success}</div>}

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "در حال ورود..." : "ورود 🚪"}
        </Button>
      </form>
    </div>
  );
}
