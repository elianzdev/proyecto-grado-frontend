import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LogIn, Mail, Lock, AlertCircle } from "lucide-react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // ============================================
  // Handle Login
  // ============================================

  const handleLogin = async (event) => {
    event.preventDefault();

    setMessage("");
    setLoading(true);

    try {
      const response = await fetch(
        "http://localhost:5000/api/users/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        if (
          response.status === 401 ||
          response.status === 403
        ) {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
        }

        setMessage(data.message || "Login failed");

        return;
      }

      // Save token and user

      if (data.token) {
        localStorage.setItem("token", data.token);
      }

      if (data.user) {
        localStorage.setItem(
          "user",
          JSON.stringify(data.user)
        );
      }

      setMessage("Login successful");

      navigate("/home");
    } catch (error) {
      console.error(error);

      setMessage("Cannot connect to server");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">
      {/* Background Blur */}

      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-cyan-500/20 blur-3xl rounded-full"></div>

        <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-500/20 blur-3xl rounded-full"></div>
      </div>

      {/* Login Card */}

      <div className="relative w-full max-w-md">
        <div className="bg-slate-900/90 backdrop-blur-xl border border-slate-800 rounded-3xl shadow-2xl p-8">
          {/* Header */}

          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-cyan-500/10 border border-cyan-500/30 rounded-2xl flex items-center justify-center mx-auto mb-5">
              <LogIn
                className="text-cyan-400"
                size={36}
              />
            </div>

            <h1 className="text-4xl font-black text-white mb-2">
              Welcome Back
            </h1>

            <p className="text-slate-400">
              Sign in to continue learning
            </p>
          </div>

          {/* Alert */}

          {message && (
            <div
              className={`mb-6 flex items-center gap-3 px-4 py-3 rounded-xl border ${
                message.toLowerCase().includes("successful")
                  ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
                  : "bg-red-500/10 border-red-500/30 text-red-400"
              }`}
            >
              <AlertCircle size={18} />

              <span className="text-sm font-medium">
                {message}
              </span>
            </div>
          )}

          {/* Form */}

          <form
            onSubmit={handleLogin}
            className="space-y-5"
          >
            {/* Email */}

            <div>
              <label className="block text-sm font-semibold text-slate-300 mb-2">
                Email Address
              </label>

              <div className="relative">
                <Mail
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
                />

                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) =>
                    setEmail(e.target.value)
                  }
                  required
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl py-3 pl-12 pr-4 text-white placeholder:text-slate-500 outline-none focus:border-cyan-400 transition"
                />
              </div>
            </div>

            {/* Password */}

            <div>
              <label className="block text-sm font-semibold text-slate-300 mb-2">
                Password
              </label>

              <div className="relative">
                <Lock
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
                />

                <input
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) =>
                    setPassword(e.target.value)
                  }
                  required
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl py-3 pl-12 pr-4 text-white placeholder:text-slate-500 outline-none focus:border-cyan-400 transition"
                />
              </div>
            </div>

            {/* Submit Button */}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-cyan-500 hover:bg-cyan-400 disabled:opacity-50 disabled:cursor-not-allowed text-slate-950 font-bold py-3 rounded-xl transition-all duration-300 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin"></div>

                  Signing In...
                </>
              ) : (
                <>
                  <LogIn size={18} />
                  Sign In
                </>
              )}
            </button>
          </form>

          {/* Footer */}

          <p className="text-center text-slate-400 mt-8">
            Don&apos;t have an account?{" "}
            <Link
              to="/register"
              className="text-cyan-400 hover:text-cyan-300 font-semibold transition"
            >
              Create Account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;