import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import TopBar from "../components/TopBar";
import { getUserByUsername, addFriend } from "../api/api";

function UserPage() {
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [friends, setFriends] = useState([]);
  const [noUserFound, setNoUserFound] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      if (search) {
        try {
          const userData = await getUserByUsername(search);
          if (userData) {
            setUsers([userData]);
            setErrorMessage(null);
            setNoUserFound(false);
          } else {
            setUsers([]);
            setNoUserFound(true);
          }
        } catch (err) {
          setUsers([]);
          setNoUserFound(true);
        }
      } else {
        setUsers([]);
        setNoUserFound(false);
      }
    };

    fetchUsers();
  }, [search]);

  const handleAddFriend = async (username) => {
    try {
      const userData = await getUserByUsername(username);
      if (!userData) return;

      const userId = userData._id;
      const currentUserId = localStorage.getItem("id");

      if (friends.some((friend) => friend._id === userId)) {
        setErrorMessage("Korisnik je već u listi prijatelja.");
        return;
      }

      await addFriend(currentUserId, userId);
      setSuccessMessage("Uspješno dodan korisnik.");
      setFriends([...friends, userData]);

      setSearch("");
      setUsers([]);
    } catch (err) {
      setErrorMessage("Došlo je do greške prilikom dodavanja prijatelja.");
    }
  };

  return (
    <>
      <TopBar />
      <div className="flex flex-col items-center p-5 mt-10">
        <div className="flex gap-3 mb-6">
          <input
            type="text"
            className="border border-gray-300 p-2 rounded-lg w-64 focus:outline-none focus:ring-2 focus:ring-green-400 transition"
            placeholder="Pretraži korisnike"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="w-full max-w-3xl bg-white rounded-lg shadow-lg p-4">
          {users.length > 0 ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              <div className="flex justify-between items-center p-3 border-b">
                <span className="text-gray-800 text-lg font-semibold">{users[0].username}</span>
                <button
                  className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
                  onClick={() => handleAddFriend(users[0].username)}
                >
                  Dodaj
                </button>
              </div>
            </motion.div>
          ) : noUserFound ? (
            <div className="text-center text-red-500 font-semibold p-3">
              Korisnik nije pronađen.
            </div>
          ) : null}
        </div>

        {successMessage && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="fixed top-20 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg"
          >
            {successMessage}
            <button
              className="ml-4 bg-white text-green-500 px-2 py-1 rounded"
              onClick={() => setSuccessMessage(null)}
            >
              OK
            </button>
          </motion.div>
        )}

        {errorMessage && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="fixed top-20 left-1/2 transform -translate-x-1/2 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg"
          >
            {errorMessage}
            <button
              className="ml-4 bg-white text-red-500 px-2 py-1 rounded"
              onClick={() => setErrorMessage(null)}
            >
              OK
            </button>
          </motion.div>
        )}
      </div>
    </>
  );
}

export default UserPage;
