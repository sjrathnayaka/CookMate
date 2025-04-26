import React, { useState, useEffect } from 'react';

const UserProfile = () => {
  const [userData, setUserData] = useState({
    username: '',
    email: '',
    profilePicture: '',
  });

  const [profileImage, setProfileImage] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;
  
      try {
        const response = await fetch("http://localhost:8080/api/user/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }
  
        const data = await response.json();
        setUserData({
          username: data.username,
          email: data.email,
          profilePicture: data.profilePictureUrl || '',
        });
      } catch (err) {
        console.error("Fetch error:", err);
      }
    };
  
    fetchUserData();
  }, []);
  
  

  const handleInputChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setProfileImage(file);

    const reader = new FileReader();
    reader.onloadend = () => {
      setUserData({ ...userData, profilePicture: reader.result });
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
  
    try {
      const response = await fetch("http://localhost:8080/api/user/me", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          username: userData.username,
          fullName: "", // Fill if available
          bio: "",       // Fill if available
          cookingPreferences: "", // Fill if available
          profilePictureUrl: userData.profilePicture,
        }),
      });
  
      if (!response.ok) {
        throw new Error("Failed to update user data");
      }
  
      const result = await response.json();
      console.log("User Data Saved:", result);
    } catch (err) {
      console.error("Submit error:", err);
    }
  };
  
  

  return (
    <div style={styles.card}>
      <h2 style={styles.heading}>User Profile</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.imagePreview}>
          {userData.profilePicture ? (
            <img src={userData.profilePicture} alt="Profile" style={styles.image} />
          ) : (
            <div style={styles.placeholder}>No Image</div>
          )}
        </div>

        <input type="file" onChange={handleImageChange} style={styles.inputFile} />

        <label style={styles.label}>Username:</label>
        <input
          type="text"
          name="username"
          value={userData.username}
          onChange={handleInputChange}
          style={styles.input}
        />

        <label style={styles.label}>Email:</label>
        <input
          type="email"
          name="email"
          value={userData.email}
          onChange={handleInputChange}
          style={styles.input}
          disabled
        />

        <button type="submit" style={styles.button}>Save Changes</button>
      </form>
    </div>
  );
};

const styles = {
  card: {
    maxWidth: '500px',
    margin: '2rem auto',
    padding: '2rem',
    borderRadius: '10px',
    boxShadow: '0 0 10px rgba(0,0,0,0.1)',
    background: '#fff',
    fontFamily: 'sans-serif',
  },
  heading: {
    textAlign: 'center',
    marginBottom: '1rem',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  label: {
    fontWeight: 'bold',
  },
  input: {
    padding: '0.5rem',
    borderRadius: '5px',
    border: '1px solid #ccc',
  },
  inputFile: {
    padding: '0.3rem',
  },
  button: {
    padding: '0.6rem',
    borderRadius: '5px',
    border: 'none',
    background: '#4CAF50',
    color: '#fff',
    fontWeight: 'bold',
    cursor: 'pointer',
  },
  imagePreview: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '1rem',
  },
  image: {
    width: '100px',
    height: '100px',
    objectFit: 'cover',
    borderRadius: '50%',
  },
  placeholder: {
    width: '100px',
    height: '100px',
    borderRadius: '50%',
    background: '#eee',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#999',
  },
};

export default UserProfile;
