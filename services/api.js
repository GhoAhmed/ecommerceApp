const BASE_URL = 'http://127.0.0.1:8000/api'; // Replace with your Laravel server address

export const signin = async (email, password) => {
  try {
    const response = await fetch(`${BASE_URL}/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

export const signup = async (name, email, password) => {
  try {
    const response = await fetch(`${BASE_URL}/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};


export const getProducts = async () => {
    try {
        const response = await fetch(`${BASE_URL}/products`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          }
        });    
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  };




export const fetchUsers = async (userId) => {
  try {
    const response = await fetch(`${BASE_URL}/users`);
    const data = await response.json();

    // Exclude the current user from the list
    const filteredUsers = data.users.filter(user => user.id !== userId);

    return { users: filteredUsers };
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};
