import React, { useEffect, useState } from "react";
import "./Profile.css";
import EditProfile from "../../components/editProfile/EditProfile";
import { useGetUserQuery } from "../../services/ApiService/authApi";
import { IProfile } from "../../types";
import { AppBlockingSharp } from "@mui/icons-material";

const handleSave = () => {
  console.log("Saving profile:");
};
const Profile: React.FC = ({}) => {
  const [userData, setUserData] = useState<IProfile>();
  const {
    data: Profiledata,
    isLoading: ProfileIsLoading,
    isError: ProfileIsError,
    error: ProfileError,
  } = useGetUserQuery({});

  useEffect(() => {
    if (ProfileIsError) console.log("ProfileError: ", ProfileError);
    if (Profiledata) {
      setUserData(Profiledata);
    }
  }, [ProfileIsLoading, ProfileError]);

  return (
    <>
      {!userData && <div className="centered-content">Loading...</div>}
      {userData && (
        <div className="centered-content">
          <EditProfile profile={userData} onSave={handleSave} />
        </div>
      )}
    </>
  );
};

export default Profile;
