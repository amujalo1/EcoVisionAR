import React, { useState, useEffect } from "react";
import TopBar from "../components/TopBar";
import { getUserByUsername, addFriend } from "../api/api"; // Uvezi tvoje funkcije

function UserPage() {
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      if (search) {
        try {
          const userData = await getUserByUsername(search);
          setUsers([userData]);
          setErrorMessage(null);
        } catch (err) {
          setUsers([]);
        }
      } else {
        setUsers([]);
        setErrorMessage(null);
      }
    };

    fetchUsers();
  }, [search]);

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const currentUserId = localStorage.getItem("id");
        const friendsList = await getFriendsList(currentUserId);
        setFriends(friendsList);
      } catch (err) {
        console.error("Greška pri dohvaćanju liste prijatelja", err);
      }
    };

    fetchFriends();
  }, []);

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
        {/* Pretraga korisnika */}
        <div className="flex gap-3 mb-6">
          <input
            type="text"
            className="border p-2 rounded w-64"
            placeholder="Pretraži korisnike"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Prikazivanje korisnika u tabeli */}
        <div className="w-full max-w-3xl overflow-x-auto bg-white rounded-lg shadow-lg">
          <table className="w-full table-auto border-separate border-spacing-0">
            <thead>
              <tr className="bg-gray-100">
                <th className="border-b p-3 text-left"></th>
                <th className="border-b p-3 text-left"></th>
              </tr>
            </thead>
            <tbody>
              {users.length > 0 ? (
                users.map((user, index) => (
                  <tr key={index} className="border-b">
                    <td className="p-3">{user.username}</td>
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
              ) : (
                errorMessage && (
                  <tr>
                    <td colSpan="2" className="p-3 text-center text-red-500">
                      {errorMessage}
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>

        {/* Alert za uspeh */}
        {successMessage && (
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-green-500 text-white p-4 rounded-lg shadow-lg">
            {successMessage}
            <button
              className="ml-4 bg-white text-green-500 px-2 py-1 rounded"
              onClick={() => setSuccessMessage(null)}
            >
              OK
            </button>
          </div>
        )}

        {/* Alert za grešku */}
        {errorMessage && (
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-red-500 text-white p-4 rounded-lg shadow-lg">
            {errorMessage}
            <button
              className="ml-4 bg-white text-red-500 px-2 py-1 rounded"
              onClick={() => setErrorMessage(null)}
            >
              OK
            </button>
          </div>
        )}
      </div>
    </>
  );
}

export default UserPage;
