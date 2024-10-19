import { MultiBubbleSolid, NavArrowDown, ProfileCircle } from "iconoir-react";
import Button from "./common/Button";
import { Type } from "./common/types";
import { Link, useParams } from "react-router-dom";
import { useAppSelector, useSetHeaderBgColor } from "./common/hooks";
import { useState } from "react";
import UserProfile from "./UserProfile";

const NavItems = () => {
  const { isLoggedIn } = useAppSelector((state) => state.user);
  const [isProfileClicked, setIsProfileClicked] = useState(false);

  return (
    <nav style={{ display: "flex", gap: "20px" }}>
      <Link to="/auctions">
        <div>Auctions</div>
        <NavArrowDown height={16} />
      </Link>
      <Link to={`/biddings/1`}>
        <div>Bidding</div> <NavArrowDown height={16} />
      </Link>
      <Link to="/aboutus">
        <div>About us</div> <NavArrowDown height={16} />
      </Link>
      <Link to="/language">
        <MultiBubbleSolid color="grey" height={16} />
        <div>English</div> <NavArrowDown height={16} />
      </Link>

      {isLoggedIn && (
        <div style={{ display: "flex", alignItems: "center", cursor: 'pointer' }}>
          <ProfileCircle onClick={() => setIsProfileClicked(!isProfileClicked)} />
        </div>
      )}
      {!isLoggedIn && (
        <>
          <Link to="/login">
            <div style={{ color: "dodgerblue" }}>Login</div>
          </Link>
          <Link to="/signup">
            <Button type={Type.primary}>Get Started</Button>
          </Link>
        </>
      )}
      {isProfileClicked && <UserProfile />}
    </nav>
  );
};

export default NavItems;
