import { useState } from "react";
import { X, Lock, Mail, User as UserIcon } from "lucide-react";
import { loginUser, registerUser } from "../services/api.js";

export default function AuthModal({ isOpen, onClose, onSuccess }) {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      let res;
      if (isLogin) {
        res = await loginUser({
          email: formData.email,
          password: formData.password,
        });
      } else {
        res = await registerUser(formData);
      }

      localStorage.setItem("applio_token", res.data.token);
      localStorage.setItem("applio_user", JSON.stringify(res.data.user));

      if (onSuccess) {
        onSuccess(res.data.user);
      }
      onClose();
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Authentication failed. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-md rounded-xl border border-brand-border bg-white p-6 shadow-xl">
        <div className="flex items-center justify-between border-b border-brand-border pb-4">
          <h2 className="text-lg font-bold text-brand-black">
            {isLogin ? "Sign In to Applio" : "Create an Account"}
          </h2>
          <button
            onClick={onClose}
            className="rounded-md p-1 text-brand-muted hover:bg-brand-bg hover:text-brand-black"
          >
            <X size={18} />
          </button>
        </div>

        <div className="mt-4 flex rounded-lg border border-[#E8E0D2] bg-[#F7F5F0] p-1">
          <button
            type="button"
            onClick={() => {
              setIsLogin(true);
              setError("");
            }}
            className={`flex-1 rounded-md py-1.5 text-sm font-semibold transition ${
              isLogin
                ? "bg-white text-[#111111] shadow-xs"
                : "text-[#6A665E] hover:text-[#111111]"
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => {
              setIsLogin(false);
              setError("");
            }}
            className={`flex-1 rounded-md py-1.5 text-sm font-semibold transition ${
              !isLogin
                ? "bg-white text-[#111111] shadow-xs"
                : "text-[#6A665E] hover:text-[#111111]"
            }`}
          >
            Register
          </button>
        </div>

        {error && (
          <div className="mt-4 rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-700">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          {!isLogin && (
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#6A665E]">
                Full Name
              </label>
              <div className="relative mt-1">
                <UserIcon
                  size={16}
                  className="absolute left-3 top-3 text-[#6A665E]"
                />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required={!isLogin}
                  placeholder="Alex Doe"
                  className="w-full rounded-lg border border-[#E8E0D2] bg-[#FAF8F5] py-2 pl-9 pr-3 text-sm text-[#111111] outline-none focus:border-[#111111] focus:bg-white"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#6A665E]">
              Email Address
            </label>
            <div className="relative mt-1">
              <Mail
                size={16}
                className="absolute left-3 top-3 text-[#6A665E]"
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="alex@example.com"
                className="w-full rounded-lg border border-[#E8E0D2] bg-[#FAF8F5] py-2 pl-9 pr-3 text-sm text-[#111111] outline-none focus:border-[#111111] focus:bg-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#6A665E]">
              Password
            </label>
            <div className="relative mt-1">
              <Lock
                size={16}
                className="absolute left-3 top-3 text-[#6A665E]"
              />
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                placeholder="••••••••"
                className="w-full rounded-lg border border-[#E8E0D2] bg-[#FAF8F5] py-2 pl-9 pr-3 text-sm text-[#111111] outline-none focus:border-[#111111] focus:bg-white"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-6 w-full rounded-lg bg-[#111111] py-2.5 text-sm font-semibold text-white transition hover:bg-[#262626] disabled:opacity-50"
          >
            {loading ? "Processing..." : isLogin ? "Sign In" : "Create Account"}
          </button>
        </form>
      </div>
    </div>
  );
}
