import React, { useState } from 'react';
import useLogin from '../../hooks/useLogin';
import AdminGetUsers from '../../features/AdminGetUsers'; 
import AddQuestion from '../../features/AddQuestion';

const AdminPage = () => {
    useLogin();
    const [activeComponent, setActiveComponent] = useState(null);

    const handleToggleComponent = (component) => {
        if (activeComponent === component) {
            setActiveComponent(null);
        } else {
            setActiveComponent(component);
        }
    };

    return (
        <div>
            <h1 className="m-3">דף ניהול</h1>
            <nav className="nav">
                <button
                    id="but" className="btn btn-primary m-3"
                    onClick={() => handleToggleComponent('AdminGetUsers')}
                >
                    {activeComponent === 'AdminGetUsers' ? 'הסתר משתמשים' : 'הצג משתמשים'}
                </button>
                <button
                    id="but" className="btn btn-primary m-3"
                    onClick={() => handleToggleComponent('AddQuestion')}
                >
                    {activeComponent === 'AddQuestion' ? 'הסתר טופס' : 'הוסף שאלה'}
                </button>
            </nav>
            <div className="component-container">
                {activeComponent === 'AdminGetUsers' && <AdminGetUsers showUsers={true} />}
                {activeComponent === 'AddQuestion' && <AddQuestion showForm={true} />}
            </div>
        </div>
    );
};

export default AdminPage;
