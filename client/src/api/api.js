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
    const response = await fetch(`${API_URL}/users/${userId}/dailyActivity`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(state),
    });

    const data = await response.json();
    console.log(data);
    if (response.ok) {
      return data;
    } else {
      throw new Error(data.message || "Error updating activity");
    }
  } catch (err) {
    console.error(err);
    throw err;
  }
};

// api.js - Function to fetch all users
export const getAllUsers = async () => {
  try {
    const response = await fetch(`${API_URL}/users`);
    const data = await response.json();
    if (response.ok) {
      return data;
    } else {
      throw new Error(data.message || "Error fetching users");
    }
  } catch (err) {
    console.error(err);
    throw err;
  }
};

