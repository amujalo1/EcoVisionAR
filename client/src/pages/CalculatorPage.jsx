import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import TopBar from "../components/TopBar";
import { getUserByUsername, addFriend, getAll } from "../api/api";
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

  useEffect(() => {
    const fetchUsers = async () => {
      if (search) {
        try {
          const userData = await getUserByUsername(search);
          setUsers(userData ? [userData] : []);
          setErrorMessage(null);
        } catch (err) {
          setUsers([]);
        }
      } else {
        setUsers([]);
      }
    };

    fetchUsers();
  }, [search]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersData = await getAll();
        const friends = usersData.filter((eachOne) =>
          realFriends.some((friend) => friend._id === eachOne._id)
        );
        setFriends(friends);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [user.friends]);

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
      const updatedUser = await getUserByUsername(user.username);
      setUser(updatedUser);
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
            className="border p-2 rounded w-64"
            placeholder="Add new friends"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

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
                        <motion.button
                          className="bg-green-500 text-white p-2 rounded-lg hover:bg-green-600 transition transform hover:scale-105"
                          whileTap={{ scale: 0.9 }}
                          onClick={() => handleAddFriend(user.username)}
                        >
                          Dodaj ✅
                        </motion.button>
                      </td>
                    </tr>
                  ))
                : friends.map((friend, index) => {
                    let rowStyle = "bg-gray-50";
                    let textStyle = "text-gray-800";
                    let medal = "";

                    if (index === 0) {
                      rowStyle = "bg-yellow-100 font-semibold";
                      medal = " 🏅";
                    } else if (index === 1) {
                      rowStyle = "bg-gray-200";
                      medal = " 🥈";
                    } else if (index === 2) {
                      rowStyle = "bg-orange-100";
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
                        <td className={`p-3 font-medium text-green-700 text-center`}>
                          {Math.round(friend.experience)}
                        </td>
                        <td className={`p-3 font-medium text-green-700 text-center`}>
                          {friend.streak}
                        </td>
                      </tr>
                    );
                  })}
            </tbody>
          </table>
        </div>
        <AnimatePresence>
          {successMessage && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="fixed top-20 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg"
            >
              {successMessage}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}

export default Calculator;
