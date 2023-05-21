import React from "react";
import "./Profile.css";
import EditProfile from "../../components/editProfile/EditProfile";

interface ProfileProps {
  name: string;
  surname: string;
  providerType: string;
  profilePictureUrl: string;
}
const dummyProfile = {
  providerName: "My Provider",
  ownerName: "John Doe",
  description: "Lorem ipsum dolor sit amet",
  address: "123 Main St",
  phoneNumber: "555-1234",
  profile_image: {},
  profile_image_url:
    'https://static.wixstatic.com/media/nsplsh_e146901c9b23447babcf72e12229a5a5~mv2.jpg" alt="Description of the image',
  reservationGranulity: "15 minutes",
  workingStartTime: 8,
  workingEndTime: 17,
};

const handleSave = () => {
  console.log("Saving profile:");
};
const Profile: React.FC<ProfileProps> = ({
  name,
  surname,
  providerType,
  profilePictureUrl,
}) => {
  return (
    <body className="body">
      <EditProfile profile={dummyProfile} onSave={handleSave} />
    </body>
  );
};

export default Profile;
