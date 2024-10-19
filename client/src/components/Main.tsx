import Button from "./common/Button";
import { Type } from "./common/types";
import { Play } from "iconoir-react";
import HomeImage from "../assets/home-image.jpg";
import AuctionItemsList from "./AuctionItemsList";

type Props = {};

const Main = (props: Props) => {
  return (
    <main style={{ padding: "16px 80px" }}>
      <div style={{ display: "flex", flexFlow: "column", gap: "24px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div style={{ display: "flex", flexFlow: "column" }}>
            <div style={{ fontSize: "xxx-large", paddingTop: "40px" }}>
              Your Gateway to Extraordinary Finds
            </div>
            <div>
              Unlock deals, bid smart, and seize the moment with our online
              bidding bonanza!{" "}
            </div>
            <div style={{ padding: "24px 0" }}>
              <Button type={Type.primary} width="200px">
                <span
                  style={{
                    border: "1px solid white",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    height: "20px",
                    width: "20px",
                  }}
                >
                  <Play height={16} />
                </span>{" "}
                <span style={{ paddingLeft: "12px" }}>Watch Video</span>
              </Button>
            </div>
          </div>
          <div>
            <img src={HomeImage} alt="homeimage" />
          </div>
        </div>
        <div style={{ display: "flex", flexFlow: 'column', gap: '24px' }}>
            <div style={{fontSize: 'larger', fontWeight: 'bold', display: 'flex', gap: "4px"}}>Explore <div style={{color: 'dodgerblue'}}>Auctions</div></div>
            <AuctionItemsList />
        </div>
      </div>
    </main>
  );
};

export default Main;
