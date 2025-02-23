import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import TopBar from "../components/TopBar";
import { getUserByUsername, addFriend, getAll } from "../api/api"; // Import your API functions
import { useAtom } from "jotai";
import { userAtom } from "../store/store";

function Calculator() {
  const [user, setUser] = useAtom(userAtom);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [friends, setFriends] = useState([]);

  const realFriends = JSON.parse(JSON.stringify(user.friends));

  // Fetch users based on search
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

  // Fetch and filter friends
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersData = await getAll(); // Fetch all users

        // Filter friends
        const friends = usersData.filter((eachOne) =>
          realFriends.some((friend) => friend._id === eachOne._id)
        );
        setFriends(friends); // Set filtered friends
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [user.friends]); // Re-run when user.friends changes

  // Add friend
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

      // Fetch updated user data
      const updatedUser = await getUserByUsername(user.username);
      setUser(updatedUser); // Update the user state

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
        {/* Search Bar */}
        <div className="flex gap-3 mb-6">
          <input
            type="text"
            className="border p-2 rounded w-64"
            placeholder="Add new friends"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Display Users or Friends */}
        <div className="w-full max-w-3xl overflow-x-auto bg-white rounded-lg shadow-lg">
          <table className="w-full table-auto border-separate border-spacing-0">
            <thead>
              <tr className="bg-gray-100">
                <th className="border-b p-3 text-left">Rank</th>
                <th className="border-b p-3 text-left">Username</th>
                <th className="border-b p-3 text-left">Exp</th>
                <th className="border-b p-3 text-left">Streak</th>
                {search && <th className="border-b p-3 text-left">Add</th>}
              </tr>
            </thead>
            <tbody>
              {search
                ? users.map((user, index) => (
                    <tr key={user._id} className="border-b">
                      <td className="p-3">{index + 1}</td>
                      <td className="p-3">{user.username}</td>
                      <td className="p-3">{Math.round(user.experience)}</td>
                      <td className="p-3">{user.streak}</td>
                      <td className="p-3">
                        <button
                          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition"
                          onClick={() => handleAddFriend(user.username)}
                        >
                          Dodaj
                        </button>
                      </td>
                    </tr>
                  ))
                : friends.map((friend, index) => {
                    let rowStyle = "bg-gray-50"; // Default background
                    let textStyle = "text-gray-800"; // Default text color
                    let medal = ""; // Default no medal

                    if (index === 0) {
                      rowStyle = "bg-yellow-100 font-semibold"; // Gold
                      medal = " 🏅";
                    } else if (index === 1) {
                      rowStyle = "bg-gray-200"; // Silver
                      medal = " 🥈";
                    } else if (index === 2) {
                      rowStyle = "bg-orange-100"; // Bronze
                      medal = " 🥉";
                    }

                    return (
                      <tr
                        key={friend._id}
                        className={`${rowStyle} transition-all`}
                      >
                        <td className={`p-3 text-md font-medium ${textStyle}`}>
                          {index + 1} {medal}
                        </td>
                        <td className={`p-3 text-md ${textStyle}`}>
                          {friend.username}
                        </td>
                        <td
                          className={`p-3 font-medium text-green-700 text-center`}
                        >
                          {Math.round(friend.experience)}
                        </td>
                        <td
                          className={`p-3 font-medium text-green-700 text-center`}
                        >
                          {friend.streak}
                        </td>
                      </tr>
                    );
                  })}
            </tbody>
          </table>
        </div>

        {/* Success Message */}
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

        {/* Error Message */}
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

export default Calculator;
