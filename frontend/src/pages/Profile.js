import React from "react";
import { useAuthContext } from "../hooks/useAuthContext";
export const Profile = () => {
  const { user } = useAuthContext();
  return (
<div className="profile-card">
    username: {user.username}
    email : {user.email}
</div>

  );
};
