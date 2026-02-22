import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate, Link } from "react-router-dom";

const SignIn: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    setLoading(true);

    try {
      await login(email, password);
      navigate("/");
    } catch (error: any) {
      setError(error.message || "Failed to sign in");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 py-12 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-md w-full space-y-8 relative z-10">
        {/* Logo/Brand */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-sky-600 mb-2">NODALWIRE</h1>
          <p className="text-slate-600 text-sm">Connectivity at the Speed of Light</p>
        </div>

        {/* Heading */}
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold text-slate-900">
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-sm text-slate-600">
            Or{" "}
            <Link
              to="/signup"
              className="font-semibold text-sky-600 hover:text-sky-700 transition-colors"
            >
              create a new account
            </Link>
          </p>
        </div>

        {/* Form */}
        <form className="mt-8 space-y-6" onSubmit={handleSignIn}>
          {error && (
            <div className="rounded-lg bg-red-50 border border-red-200 p-4">
              <p className="text-sm font-medium text-red-700">{error}</p>
            </div>
          )}

          <div className="rounded-lg border border-slate-200 bg-white overflow-hidden shadow-sm hover:shadow-md transition-shadow">
            <div className="border-b border-slate-100">
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-transparent text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-inset"
              />
            </div>

            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-transparent text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-inset"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-4 bg-sky-500 hover:bg-sky-600 text-white font-semibold rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg active:scale-95"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        {/* Info Box */}
        <div className="bg-slate-50 border border-slate-200 p-4 rounded-lg shadow-sm">
          <p className="text-xs text-slate-600">
            <strong className="text-slate-700">Demo Credentials:</strong> You can sign in with any email you previously signed up with.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
