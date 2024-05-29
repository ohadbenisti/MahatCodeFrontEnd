import React, { useState } from 'react';
import axios from 'axios';

const AdminGetUsers = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchUsers = async () => {
        setLoading(true);
        setError(null);
        try {
            const url = `${import.meta.env.VITE_SERVER}/admin/users`;
            console.log(`Fetching users from: ${url}`);
            const response = await axios.get(url, { withCredentials: true });
            console.log('Users fetched successfully:', response.data.users);
            setUsers(response.data.users);
        } catch (error) {
            console.error('Error fetching users:', error.response ? error.response.data : error.message);
            setError('Failed to fetch users');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <button id="but" type="submit" className="btn btn-primary m-3 w-5" onClick={fetchUsers}>
                הצג משתמשים
            </button>
            {loading && <div>Loading...</div>}
            {error && <div>{error}</div>}
            <ul>
                {users.map(user => (
                    <li key={user.id}>
                        {user.name} - {user.email}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default AdminGetUsers;
