import React from 'react';
import './Profile.css';
import Sidebar  from '../../Sidebar/Sidebar';

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
                <div className="box">
                    <h1>{name} {surname}</h1>
                    <h2>{providerType}</h2>
                </div>

        </body>
    );
};

export default Profile;
