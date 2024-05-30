import React, { useState } from 'react';
import axios from 'axios';

const AdminGetUsers = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [showTable, setShowTable] = useState(false);


    const fetchUsers = async () => {
        setLoading(true);
        setError(null);
        try {
            const url = `${import.meta.env.VITE_SERVER}/admin/users`;
            console.log(`Fetching users from: ${url}`);
            const response = await axios.get(url, { withCredentials: true });
            console.log('Users fetched successfully:', response.data.users);
            setUsers(response.data.users);
            setShowTable(true);
        } catch (error) {
            console.error('Error fetching users:', error.response ? error.response.data : error.message);
            setError('Failed to fetch users');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <button
                id="but"
                type="button"
                className="btn btn-primary m-3 w-5"
                onClick={fetchUsers}
            >
                הצג משתמשים
            </button>
            {loading && <div>Loading...</div>}
            {error && <div>{error}</div>}
            {showTable && (
                <table className="table table-striped table-hover">
                    <thead>
                        <tr>
                            <th>שם משתמש</th>
                            <th>מייל</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user.id}>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default AdminGetUsers;
