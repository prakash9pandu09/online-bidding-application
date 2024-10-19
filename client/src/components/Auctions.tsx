import { useAppSelector } from "./common/hooks";
import AuctionItemsList from "./AuctionItemsList";
import { Navigate } from "react-router-dom";

const Auctions = () => {
  const { user, isLoggedIn } = useAppSelector((state) => state.user);

  if (!isLoggedIn) return <Navigate to="/" />;

  return (
    isLoggedIn && (
      <div style={{ padding: "16px 80px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div style={{ display: "flex", gap: "8px" }}>
            <h2>Welcome</h2>
            <h2 style={{ color: "dodgerblue" }}>{user.firstName}!</h2>
          </div>
          <select style={{ padding: "4px" }}>
            <option value="showing all">Showing all</option>
          </select>
        </div>
        <AuctionItemsList />
      </div>
    )
  );
};

export default Auctions;
