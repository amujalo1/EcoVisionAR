import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { registerUser } from "../api/api"; // Importuj funkciju za registraciju

const RegisterPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate(); // Za navigaciju nakon uspješne registracije

  // Handler za registraciju
  const handleRegister = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage("");

    // Provjerava ako lozinke odgovaraju
    if (password !== confirmPassword) {
      setErrorMessage("Lozinke se ne podudaraju.");
      setIsLoading(false);
      return;
    }

    try {
      const response = await registerUser(username, password);
      console.log("User registered:", response);

      // Navigiraj na login stranicu nakon uspješne registracije
      navigate("/login");
    } catch (error) {
      console.error("Registration error:", error);
      setErrorMessage("Greška pri registraciji. Pokušaj ponovo.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
        <h2 className="text-2xl font-semibold text-teal-600 text-center mb-6">
          Registruj se
        </h2>
        <form onSubmit={handleRegister} className="space-y-4">
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

          <div className="space-y-2">
            <label
              htmlFor="confirmPassword"
              className="block text-gray-700 font-medium"
            >
              Potvrdi lozinku
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
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
            {isLoading ? "Registracija..." : "Registruj se"}
          </button>
        </form>

        <p className="text-center text-md text-gray-500 mt-4">
          🌍 Imate racun?{" "}
          <NavLink to="/login">
            <span className="text-green-500 bold">Prijavite se!</span>
          </NavLink>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
