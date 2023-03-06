import React from 'react';
import './Profile.css';
import Sidebar  from './Sidebar';
const links = [
    { label: 'Link 1', url: '#' },
    { label: 'Link 2', url: '#' },
    { label: 'Link 3', url: '#' },
    { label: 'Link 3', url: '#' },
    { label: 'Link 3', url: '#' },
    { label: 'Link 3', url: '#' },
    { label: 'Link 3', url: '#' },
];
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
        <body className="body">
        <Sidebar  />
        <div className="profile-container">
            <div className="profile">
                <img className="profile-picture" src={profilePictureUrl} alt="Profile"/>
                <div className="profile-info">
                    <h1>{name} {surname}</h1>
                    <h2>{providerType}</h2>
                </div>
            </div>
        </div>
        </body>
    );
};

export default Profile;
