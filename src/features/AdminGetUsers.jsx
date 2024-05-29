import axios from 'axios'

export const getAllUsers = async () => {
    try {
        const url = `${import.meta.env.VITE_SERVER}/admin/users`
        console.log(`Fetching users from: ${url}`)
        const response = await axios.get(url, { withCredentials: true })
        return response.data.users
    } catch (error) {
        console.error('Error fetching users:', error.response ? error.response.data : error.message)
        throw error
    }
}
