import React, { useState } from 'react';
import './Sidebar.css';

const Sidebar: React.FC = () => {
    const [selection, setSelection] = useState<string>('Home');
    const [showSidebar, setShowSidebar] = useState<boolean>(true);

    const handleSelection = (option: string) => {
        setSelection(option);
    };

    const handleToggleSidebar = () => {
        setShowSidebar(!showSidebar);
    };

    return (
        <>
            <button className={`toggle-button ${showSidebar ? 'show' : 'hide'}`} onClick={handleToggleSidebar}>
                <i className="fas fa-bars"></i>
            </button>
            <div className={`sidebar ${showSidebar ? 'show' : 'hide'}`}>
                <h2>Settings</h2>
                <ul>
                    <li className={selection === 'Home' ? 'active' : ''} onClick={() => handleSelection('Home')}>
                        <a href="/">Home</a>
                    </li>
                    <li className={selection === 'Users' ? 'active' : ''} onClick={() => handleSelection('Users')}>
                        <a href="/users">Users</a>
                    </li>
                    <li className={selection === 'Analytics' ? 'active' : ''} onClick={() => handleSelection('Analytics')}>
                        <a href="/analytics">Analytics</a>
                    </li>
                    <li className={selection === 'Messages' ? 'active' : ''} onClick={() => handleSelection('Messages')}>
                        <a href="/messages">Messages</a>
                    </li>
                </ul>
                <button className="button">Upgrade</button>
            </div>
        </>
    );
};

export default Sidebar;
