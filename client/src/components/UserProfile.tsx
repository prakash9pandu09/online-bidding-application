import { ProfileCircle } from "iconoir-react";
import React from "react";
import { useAppDispatch, useAppSelector } from "./common/hooks";
import { useNavigate } from "react-router-dom";
import { logout } from "./store/userSlice";

type Props = {};

const UserProfile = (props: Props) => {
  const { user, isLoggedIn } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await dispatch(logout());
    navigate('/');
  }
  return isLoggedIn && (
    <div
      style={{
        display: "flex",
        flexFlow: "column",
        position: "absolute",
        boxShadow:
          "0 4px 8px 0 rgba(219, 212, 212, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
        width: "200px",
        top: "72px",
        right: "80px",
        backgroundColor: "white",
        padding: "12px",
        gap: "12px",
        borderRadius: "4px",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          borderBottom: "1px solid #e5dfdf",
          paddingBottom: "12px",
        }}
      >
        <ProfileCircle height={40} width={40} />
        <div style={{ display: "flex", flexFlow: "column", gap: "8px" }}>
          <span>{user.firstName + " " + user.lastName}</span>
          <span>{user.email}</span>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexFlow: "column",
          gap: "20px",
          borderBottom: "1px solid #e5dfdf",
          paddingBottom: "12px",
        }}
      >
        <span style={{ cursor: "pointer" }}>View Profile</span>
        <span style={{ cursor: "pointer" }}>Settings</span>
        <span style={{ cursor: "pointer" }}>My bids</span>
      </div>
      <div
        style={{
          display: "flex",
          flexFlow: "column",
          gap: "20px",
          borderBottom: "1px solid #e5dfdf",
          paddingBottom: "12px",
        }}
      >
        <span style={{ cursor: "pointer" }}>Credit cards</span>
        <span style={{ cursor: "pointer" }}>My Auctions</span>
        <span style={{ cursor: "pointer" }}>Invite Colleagues</span>
      </div>
      <div
        style={{
          display: "flex",
          flexFlow: "column",
          gap: "20px",
          borderBottom: "1px solid #e5dfdf",
          paddingBottom: "12px",
        }}
      >
        <span style={{ cursor: "pointer" }}>Notification</span>
        <span style={{ cursor: "pointer" }}>Community</span>
        <span style={{ cursor: "pointer" }}>Support</span>
        <span style={{ cursor: "pointer" }}>API</span>
      </div>
      <div style={{ display: "flex", flexFlow: "column", gap: "20px" }}>
        <span style={{ cursor: "pointer" }} onClick={handleLogout}>Logout</span>
      </div>
    </div>
  );
};

export default UserProfile;
