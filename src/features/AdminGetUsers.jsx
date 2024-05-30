import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminGetUsers = ({ showUsers }) => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (showUsers) {
            const fetchUsers = async () => {
                setLoading(true);
                setError(null);
                try {
                    const url = `${import.meta.env.VITE_SERVER}/admin/users`;
                    const response = await axios.get(url, { withCredentials: true })
                    .then(response =>{
                        console.log(response);
                        setUsers(response.data.users);
                    })
                } catch (error) {
                    console.error('Error fetching users:', error.response ? error.response.data : error.message);
                    setError('Failed to fetch users');
                } finally {
                    setLoading(false);
                }
            };

            fetchUsers();
        }
    }, [showUsers]);

    if (!showUsers) {
        return null;
    }

    return (
        <div>
            {loading && <div>Loading...</div>}
            {error && <div>{error}</div>}
            {!loading && !error && users.length>0 && (
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
};

export default AdminGetUsers;
