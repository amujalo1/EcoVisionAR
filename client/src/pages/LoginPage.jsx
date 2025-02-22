import React, { useState } from "react";
import { loginUser } from "../api/api";
import { NavLink, useNavigate } from "react-router-dom";

// Eco-friendly login page component
const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Handle form submission
  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage("");

    try {
      const response = await loginUser(username, password);
      console.log("User logged in:", response);
      // Redirect or perform actions on successful login
      navigate("/activity");
    } catch (error) {
      console.error("Login error:", error);
      setErrorMessage("Neispravno korisničko ime ili lozinka");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
        <h2 className="text-2xl font-semibold text-teal-600 text-center mb-6">
          Prijavi se
        </h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-2">
            <label
              htmlFor="username"
              className="block text-gray-700 font-medium"
            >
              Korisničko ime
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400"
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="password"
              className="block text-gray-700 font-medium"
            >
              Lozinka
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400"
            />
          </div>

          {errorMessage && (
            <p className="text-red-500 text-center">{errorMessage}</p>
          )}

          <button
            type="submit"
            className={`w-full py-2 bg-teal-600 text-white rounded-md font-semibold focus:outline-none ${
              isLoading ? "bg-teal-400 cursor-not-allowed" : ""
            }`}
            disabled={isLoading}
          >
            {isLoading ? "Prijavljivanje..." : "Prijavi se"}
          </button>
        </form>

        <p className="text-center text-md text-gray-500 mt-4">
          🌍 Nemate racun?{" "}
          <NavLink to="/register">
            <span className="text-green-500 bold">Registrirajte se</span>
          </NavLink>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
