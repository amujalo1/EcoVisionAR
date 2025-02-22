import React, { useState, useEffect } from "react";
import TopBar from "../components/TopBar";
import { getUserByUsername, addFriend } from "../api/api"; // Uvezi tvoje funkcije

function UserPage() {
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      if (search) {
        try {
          // Ako postoji unos, pretraži korisnike prema username-u
          const userData = await getUserByUsername(search);
          setUsers([userData]); // Ažuriraj korisnike u tabeli sa jednim rezultatom
        } catch (err) {
          setError("Korisnik nije pronađen.");
          setUsers([]); // Ako nema korisnika, očisti tabelu
        }
      } else {
        setUsers([]); // Ako je search prazan, očisti tabelu
      }
    };

    fetchUsers();
  }, [search]); // Pozovi fetch kad god search vrednost bude promenjena

  const handleAddFriend = async (username) => {
    const userId = await handleSearchUser(username);
    if (!userId) return;

    try {
      const currentUserId = localStorage.getItem("id");
      const response = await addFriend(currentUserId, userId);
      console.log("Korisnik je uspešno dodat kao prijatelj", response);
    } catch (err) {
      setError("Došlo je do greške prilikom dodavanja prijatelja.");
    }
  };

  return (
    <>
      <TopBar />
      <div className="flex flex-col items-center p-5 mt-10">
        {/* Pretraga korisnika i dugme za dodavanje */}
        <div className="flex gap-3 mb-6">
          <input
            type="text"
            className="border p-2 rounded w-64"
            placeholder="Pretraži korisnike"
            value={search}
            onChange={(e) => setSearch(e.target.value)} // Promeni search stanje prilikom unosa
          />
        </div>

        {/* Prikazivanje korisnika u tabeli */}
        <div className="w-full max-w-3xl overflow-x-auto bg-white rounded-lg shadow-lg">
          <table className="w-full table-auto border-separate border-spacing-0">
            <thead>
              <tr className="bg-gray-100">
                <th className="border-b p-3 text-left">Username</th>
                <th className="border-b p-3 text-left">Akcija</th>
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
                <tr>
                  <td colSpan="2" className="p-3 text-center">
                    Nema rezultata
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Prikazivanje greške */}
        {error && <div className="text-red-500 mt-4">{error}</div>}
      </div>
    </>
  );
}

export default UserPage;
