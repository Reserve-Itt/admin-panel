import React from 'react';
import './Profile.css';

interface ProfileProps {
    name: string;
    surname: string;
    providerType: string;
    profilePictureUrl: string;
}

const Profile: React.FC<ProfileProps> = ({
                                             name,
                                             surname,
                                             providerType,
                                             profilePictureUrl,
                                         }) => {
    return (
        <div className="profile-container">

            <div className="sidebar">
                <div className="sidebar-header">
                    <img src="https://via.placeholder.com/40" alt="Profile Picture" />
                    <div>
                        <h3>John Doe</h3>
                        <p>Provider</p>
                    </div>
                </div>
                <ul>
                    <li>Link 1</li>
                    <li>Link 2</li>
                    <li>Link 3</li>
                </ul>
            </div>
            <div className="profile">
                <img className="profile-picture" src={profilePictureUrl} alt="Profile" />
                <div className="profile-info">
                    <h1>{name} {surname}</h1>
                    <h2>{providerType}</h2>
                </div>
            </div>
        </div>
    );
};

export default Profile;
