import React from 'react';
import axios from 'axios';
import useLogin from '../hooks/useLogin';

const UserProfileEdit = ({ userData, setUserData, setIsEditing }) => {
const user = useLogin();
const {_id} =user.data.user;
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserData( {
            ...userData,
            [name]: value,
        });
    };

    // דימוי פונקציית עדכון נתונים בשרת
    const updateUser = async () => {
        try {
            const response = await axios.patch(
                `${import.meta.env.VITE_SERVER}/users/personalArea/${_id}`,
                userData,
                { withCredentials: true }
            );
                 setIsEditing(false);

        } catch (error) {
            console.error('Error updating user data:', error);
        }
    };


    // const handleSave = async () => {
    //     try {
    //         const response = await updateUser(userData);
    //         if (response.status == "success") {
    //             console.log('User data saved successfully:', response.data);
    //             setIsEditing(false);
    //         } else {
    //             console.error('Failed to save user data');
    //         }
    //     } catch (error) {
    //         console.error('An error occurred while saving user data:', error);
    //     }
    // };

    return (
        <div>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">שם:</label>
                <input
                    type="text"
                    name="name"
                    value={userData.name}
                    onChange={handleInputChange}
                    className="border border-gray-300 rounded py-2 px-4 w-full"
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">אימייל:</label>
                <input
                    type="email"
                    name="email"
                    value={userData.email}
                    onChange={handleInputChange}
                    className="border border-gray-300 rounded py-2 px-4 w-full"
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">סיסמה:</label>
                <input
                    type="password"
                    name="password"
                    value={userData.password}
                    onChange={handleInputChange}
                    className="border border-gray-300 rounded py-2 px-4 w-full"
                />
            </div>
            <button onClick={updateUser} className="bg-blue-500 text-white py-2 px-4 rounded">
                שמור
            </button>
        </div>
    );
};

export default UserProfileEdit;
