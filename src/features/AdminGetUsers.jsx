import React, { useState, useEffect } from "react";
import axios from "axios";
import AlertDialog from "./AlertDialog";
import LoadingAnimation from "./LoadingAnimation";

const AdminGetUsers = ({ showUsers }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const url = `${import.meta.env.VITE_SERVER}/admin/users`;
      const response = await axios.get(url, { withCredentials: true });
      setUsers(response.data.users);
    } catch (error) {
      console.error(
        "Error fetching users:",
        error.response ? error.response.data : error.message
      );
      setError("Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (showUsers) fetchUsers();
    if (!showUsers) return null;
  }, [showUsers]);

  return (
    <div>
      {loading && <LoadingAnimation />}
      {error && <div>{error}</div>}
      {!loading && !error && users.length > 0 && (
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th>שם משתמש</th>
              <th>מייל</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <AlertDialog userId={user._id} renderUsers={fetchUsers} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminGetUsers;
