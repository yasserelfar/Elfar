import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth, type User } from "../context/AuthContext";
import loginImage from "../assets/Login-bg2.jpg";

const Login = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user, login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (isAuthenticated && user) {
      if (user.role === "admin") {
        navigate("/Dashboard");
      } else {
        navigate("/");
      }
    }
  }, [isAuthenticated, user, navigate]);

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const usersStr = localStorage.getItem("users");
    const users = usersStr
      ? JSON.parse(usersStr)
      : [{ email: "admin@gmail.com", password: "123456", role: "admin" }];

    const foundUser = users.find(
      (user: User) => user.email === email && user.password === password,
    );

    if (!foundUser) {
      setError("Invalid Email or Password");
      return;
    }

    login(foundUser, remember);

    // تحويل حسب الـ role
    if (foundUser.role === "admin") {
      navigate("/Dashboard");
    } else {
      navigate("/");
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-gray-900"
      style={{
        backgroundImage: `url(${loginImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <form
        onSubmit={handleLogin}
        className="bg-gray-800 p-8 rounded-xl shadow-lg w-96"
      >
        <h2 className="text-2xl font-bold text-white mb-6 text-center">
          Login
        </h2>

        {error && (
          <p className="text-red-500 text-sm mb-4 text-center">{error}</p>
        )}

        <div className="mb-4">
          <label className="block text-gray-300 mb-2">Email</label>
          <input
            type="email"
            className="w-full px-4 py-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="mb-4 relative">
          <label className="block text-gray-300 mb-2">Password</label>
          <input
            type={showPassword ? "text" : "password"}
            className="w-full px-4 py-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <span
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-10 text-gray-400 cursor-pointer text-sm"
          >
            {showPassword ? "Hide" : "Show"}
          </span>
        </div>

        <div className="flex items-center mb-6">
          <input
            type="checkbox"
            checked={remember}
            onChange={() => setRemember(!remember)}
            className="mr-2"
          />
          <label className="text-gray-300 text-sm">Remember Me</label>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 transition text-white py-2 rounded font-semibold"
        >
          Login
        </button>

        <p className="text-gray-300 text-sm mt-6 text-center">
          Don't have an account?{" "}
          <span
            onClick={() => navigate("/register")}
            className="text-blue-400 hover:text-blue-500 cursor-pointer font-semibold"
          >
            Sign Up
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;
