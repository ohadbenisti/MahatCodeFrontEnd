import React from 'react';
import useLogin from '../../hooks/useLogin';
import AdminGetUsers from '../../features/AdminGetUsers'; // הנחה שמסלול הקובץ נכון
import AddQuestion from '../../features/AddQuestion';

const AdminPage = () => {
    useLogin();

    return (
        <nav>
            <h1 className="m-3">דף ניהול</h1>
            <AdminGetUsers />
            <AddQuestion />
        </nav>
    );
}

export default AdminPage;
