import React, { useEffect, useState } from "react";
import newAxios from "../components/Axios";

export const authContext = React.createContext();

export const UserContext = ({ children }) => {
  const [userDetails, setUserDetails] = useState(null);
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchUser();
  }, [userDetails]);

  const fetchUser = async () => {
    setIsLoading(true);
    try {
      const response = await newAxios.get("/users/player", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${document.cookie}`,
        },
        withCredentials: true,
      });
      if (response.status === 200) {
        const user = response.data;
        setUserDetails(user);
      }
    } catch (error) {
      console.error(error);
      setError("Failed to fetch user details");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      const res = await newAxios.get(`/users/players`, {
        withCredentials: true,
      });
      setUsers(res.data);
    } catch (error) {
      console.error(error);
      setError("Failed to fetch users");
    } finally {
      setIsLoading(false);
    }
  };

  const editUser = async (updatedUser) => {
    try {
      const res = await newAxios.put(`/users/update/`, updatedUser, {
        withCredentials: true,
      });
      setUserDetails(updatedUser);
    } catch (error) {
      console.error(error);
      setError("Failed to edit user");
      throw new Error("Failed to edit user");
    }
  };

  return (
    <authContext.Provider
      value={{
        setUserDetails,
        userDetails,
        fetchUser,
        users,
        setUsers,
        fetchUsers,
        currentUser,
        setCurrentUser,
        editUser,
        error,
        isLoading,
      }}
    >
      {error && <div>Error: {error}</div>}
      {isLoading ? <div>Loading...</div> : children}
    </authContext.Provider>
  );
};
