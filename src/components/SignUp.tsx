import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate, Link } from "react-router-dom";

const SignUp: React.FC = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { signup } = useAuth();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Validation
    if (!email || !password || !username) {
      setError("Please fill in all required fields");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setLoading(true);

    try {
      await signup({
        email,
        username,
        password,
        first_name: firstName,
        last_name: lastName,
        phone,
        country,
        company_name: companyName
      });
      navigate("/");
    } catch (error: any) {
      setError(error.message || "Failed to create account");
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
            Create your account
          </h2>
          <p className="mt-2 text-center text-sm text-slate-600">
            Or{" "}
            <Link
              to="/signin"
              className="font-semibold text-sky-600 hover:text-sky-700 transition-colors"
            >
              sign in to your account
            </Link>
          </p>
        </div>

        {/* Form */}
        <form className="mt-8 space-y-6" onSubmit={handleSignUp}>
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

            <div className="border-b border-slate-100">
              <label htmlFor="username" className="sr-only">
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 bg-transparent text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-inset"
              />
            </div>

            <div className="border-b border-slate-100">
              <label htmlFor="first-name" className="sr-only">
                First Name
              </label>
              <input
                id="first-name"
                name="firstName"
                type="text"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full px-4 py-3 bg-transparent text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-inset"
              />
            </div>

            <div className="border-b border-slate-100">
              <label htmlFor="last-name" className="sr-only">
                Last Name
              </label>
              <input
                id="last-name"
                name="lastName"
                type="text"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full px-4 py-3 bg-transparent text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-inset"
              />
            </div>

            <div className="border-b border-slate-100">
              <label htmlFor="company-name" className="sr-only">
                Company Name
              </label>
              <input
                id="company-name"
                name="companyName"
                type="text"
                placeholder="Company Name"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                className="w-full px-4 py-3 bg-transparent text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-inset"
              />
            </div>

            <div className="border-b border-slate-100">
              <label htmlFor="phone" className="sr-only">
                Phone
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                autoComplete="tel"
                placeholder="Phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-4 py-3 bg-transparent text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-inset"
              />
            </div>

            <div className="border-b border-slate-100">
              <label htmlFor="country" className="sr-only">
                Country
              </label>
              <input
                id="country"
                name="country"
                type="text"
                autoComplete="country-name"
                placeholder="Country"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="w-full px-4 py-3 bg-transparent text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-inset"
              />
            </div>

            <div className="border-b border-slate-100">
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                placeholder="Password (min. 6 characters)"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-transparent text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-inset"
              />
            </div>

            <div>
              <label htmlFor="confirm-password" className="sr-only">
                Confirm Password
              </label>
              <input
                id="confirm-password"
                name="confirmPassword"
                type="password"
                autoComplete="new-password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
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
            {loading ? "Creating account..." : "Sign Up"}
          </button>
        </form>

        {/* Password Requirements */}
        <div className="bg-slate-50 border border-slate-200 p-4 rounded-lg shadow-sm">
          <p className="text-xs text-slate-600">
            <strong className="text-slate-700">Password Requirements:</strong>
            <br />• Minimum 6 characters
            <br />• Must match in both fields
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
