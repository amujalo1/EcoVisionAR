import React, { useState } from "react";
import TopBar from "../components/TopBar";

function UserPage() {
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([
    { username: "user1" },
    { username: "user2" },
    { username: "user3" },
  ]);

  const handleAddUser = () => {
    // Logika za dodavanje novog korisnika
    const newUser = { username: `user${users.length + 1}` };
    setUsers([...users, newUser]);
  };

  return (
    <>
      <TopBar />
      <div className="flex flex-col items-center p-5 mt-10">
        {/* Search input and Add button */}
        <div className="flex gap-3 mb-6">
          <input
            type="text"
            className="border p-2 rounded w-64"
            placeholder="Pretraži korisnike"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button
            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition"
            onClick={handleAddUser}
          >
            Dodaj
          </button>
        </div>

        {/* User table */}
        <div className="w-full max-w-3xl overflow-x-auto bg-white rounded-lg shadow-lg">
          <table className="w-full table-auto border-separate border-spacing-0">
            <thead>
              <tr className="bg-gray-100">
                <th className="border-b p-3 text-left">Username</th>
                <th className="border-b p-3 text-left">Akcija</th>
              </tr>
            </thead>
            <tbody>
              {users
                .filter((user) =>
                  user.username.toLowerCase().includes(search.toLowerCase())
                )
                .map((user, index) => (
                  <tr key={index} className="border-b">
                    <td className="p-3">{user.username}</td>
                    <td className="p-3">
                      <button className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition">
                        Dodaj
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default UserPage;
