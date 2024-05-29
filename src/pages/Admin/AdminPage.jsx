import React, { useEffect, useState } from 'react'
import useLogin from '../../hooks/useLogin'
import { getAllUsers } from '../../features/AdminGetUsers'

const AdminPage = () => {
    useLogin()
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const fetchUsers = async () => {
        setLoading(true)
        setError(null)
        try {
            console.log('Fetching users...')
            const usersData = await getAllUsers()
            console.log('Users fetched successfully:', usersData)
            setUsers(usersData)
        } catch (error) {
            console.error('Error fetching users:', error)
            setError('Failed to fetch users')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div>
            <h1 className="m-3">דף ניהול</h1>
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
    )
}

export default AdminPage
