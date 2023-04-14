    import React from 'react';
    import './Profile.css';
    import EditProfile from "../../components/editProfile/EditProfile";


    interface ProfileProps {
        name: string;
        surname: string;
        providerType: string;
        profilePictureUrl: string;
    }
    const dummyProfile = {
        providerName: 'My Provider',
        ownerName: 'John Doe',
        description: 'Lorem ipsum dolor sit amet',
        address: '123 Main St',
        phoneNumber: '555-1234',
        profile_image: {},
        profile_image_url: 'https://example.com/profile.jpg',
        reservationGranulity: '15 minutes',
        workingStartTime: 8,
        workingEndTime: 17,
    };


    const handleSave = () => {
        console.log('Saving profile:');
        // do something with the updated profile data
    };
    const Profile: React.FC<ProfileProps> = ({
                                                 name,
                                                 surname,
                                                 providerType,
                                                 profilePictureUrl,
                                             }) => {

        return (
            <body className="body">
            <div className="profile-header"><h3 className="profile-headerh3">Your Profile</h3></div>
            <EditProfile profile={dummyProfile} onSave={handleSave} />
            </body>
        );
    };

    export default Profile;
