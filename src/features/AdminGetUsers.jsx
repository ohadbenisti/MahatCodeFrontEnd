import React, { useState, useEffect } from "react";
import axios from "axios";
import AlertDialog from "./DeleteUserAlertDialog";
import LoadingAnimation from "./LoadingAnimation";
import "./AdminGetUsers.css";

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
      console.error("Error fetching users:", error.response ? error.response.data : error.message);
      setError("Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <section className="admin-users-container">
      {loading && <LoadingAnimation />}
      {error && <p className="error-message">{error}</p>}
      {!loading && !error && users.length > 0 && (
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th>שם משתמש</th>
              <th>מייל</th>
              <th className="actions-column">פעולות</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td className="actions-column">
                  <AlertDialog userId={user._id} renderUsers={fetchUsers} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {!loading && !error && users.length === 0 && (
        <p className="no-users-message">אין משתמשים להצגה</p>
      )}
    </section>
  );
};

export default AdminGetUsers;
