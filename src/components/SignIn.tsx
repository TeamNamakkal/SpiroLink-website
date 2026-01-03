import React, { useState } from "react";
import { signIn } from "../lib/auth";
import { useNavigate, Link } from "react-router-dom";

const SignIn: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    setLoading(true);

    try {
      await signIn(email, password);
      navigate("/");
    } catch (error: any) {
      setError(error.message || "Failed to sign in");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0b0b0b] py-12 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-md w-full space-y-8 relative z-10">
        {/* Logo/Brand */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white mb-2">SPIROLINK</h1>
          <p className="text-slate-400 text-sm">Connectivity at the Speed of Light</p>
        </div>

        {/* Heading */}
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-sm text-slate-400">
            Or{" "}
            <Link
              to="/signup"
              className="font-medium text-cyan-400 hover:text-cyan-300 transition-colors"
            >
              create a new account
            </Link>
          </p>
        </div>

        {/* Form */}
        <form className="mt-8 space-y-6" onSubmit={handleSignIn}>
          {error && (
            <div className="rounded-lg bg-red-900/30 border border-red-700/50 p-4">
              <p className="text-sm font-medium text-red-300">{error}</p>
            </div>
          )}

          <div className="rounded-lg border border-slate-700 bg-slate-900/50 overflow-hidden focus-within:border-cyan-400/50 transition-colors">
            <div className="border-b border-slate-700">
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
                className="w-full px-4 py-3 bg-transparent text-white placeholder-slate-500 focus:outline-none"
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
                className="w-full px-4 py-3 bg-transparent text-white placeholder-slate-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-4 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white font-semibold rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-cyan-500/25"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        {/* Info Box */}
        <div className="bg-slate-900/50 border border-slate-700 p-4 rounded-lg">
          <p className="text-xs text-slate-400">
            <strong className="text-slate-300">Demo Credentials:</strong> You can sign in with any email you previously signed up with.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
