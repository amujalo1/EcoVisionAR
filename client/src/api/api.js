// api.js - Functions to interact with the backend API

// const API_URL = process.env.API_URL || "http://localhost:5000/api"; // Define the base URL for the API
const API_URL = "http://localhost:5000/api"; // Define the base URL for the API

// Function to register a new user
export const registerUser = async (username, password) => {
  try {
    const response = await fetch(`${API_URL}/users/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();
    if (response.ok) {
      return data;
    } else {
      throw new Error(data.message || "Error registering user");
    }
  } catch (err) {
    console.error(err);
    throw err;
  }
};

// Function to login a user
export const loginUser = async (username, password) => {
  try {
    const response = await fetch(`${API_URL}/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();
    if (response.ok) {
      localStorage.setItem("id", data.user._id);
      return data;
    } else {
      throw new Error(data.message || "Error logging in");
    }
  } catch (err) {
    console.error(err);
    throw err;
  }
};

// Function to fetch a user by ID
export const getUserById = async (id) => {
  try {
    const response = await fetch(`${API_URL}/users/${id}`);
    const data = await response.json();
    if (response.ok) {
      return data;
    } else {
      throw new Error(data.message || "User not found");
    }
  } catch (err) {
    console.error(err);
    throw err;
  }
};
export const getUserByUsername = async (username) => {
  try {
    const response = await fetch(`${API_URL}/users/username/${username}`);
    const data = await response.json();
    if (response.ok) {
      return data;
    } else {
      throw new Error(data.message || "User not found");
    }
  } catch (err) {
    console.error(err);
    throw err;
  }
};
// Function to add a friend
export const addFriend = async (userId, friendId) => {
  try {
    const response = await fetch(`${API_URL}/users/${userId}/addFriend`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ friendId }),
    });

    const data = await response.json();
    if (response.ok) {
      return data;
    } else {
      throw new Error(data.message || "Error adding friend");
    }
  } catch (err) {
    console.error(err);
    throw err;
  }
};

// Function to update daily activity and CO2

export const updateDailyActivity = async (userId, state) => {
  try {
    console.log(state, userId);
    const response = await fetch(
      `${API_URL}/users/${userId}/dailyActivity`, // updated path
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(state), // Sending the state
      }
    );

    console.log(response);

    if (!response.ok) {
      throw new Error("Neuspješno ažuriranje stanja");
    }

    return response.json();
  } catch (error) {
    console.error("Greška pri slanju podataka na server:", error);
    throw error;
  }
};

// Function to update user's stats (experience, streak, points)
export const updateUserStats = async (
  userId,
  { experience, streak, points }
) => {
  try {
    const response = await fetch(`${API_URL}/users/${userId}/updateStats`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ experience, streak, points }),
    });
    console.log("what is go", body);
    const data = await response.json();
    if (response.ok) {
      return data;
    } else {
      throw new Error(data.message || "Error updating user stats");
    }
  } catch (err) {
    console.error(err);
    throw err;
  }
};
