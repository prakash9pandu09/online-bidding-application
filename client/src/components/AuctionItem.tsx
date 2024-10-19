import { useState } from "react";
import { Product, Type } from "./common/types";
import { Heart, NavArrowRight } from "iconoir-react";
import Button from "./common/Button";
import { Link } from "react-router-dom";
import image1 from "../assets/1.jpg";
import image2 from "../assets/2.jpg";
import image3 from "../assets/3.jpg";
import image4 from "../assets/4.jpg";
import image5 from "../assets/5.jpg";
import image6 from "../assets/6.jpg";
import image7 from "../assets/7.jpg";
import { useAppDispatch } from "./common/hooks";
import { setItemAsFavorite } from "./store/biddingsSlice";

type Props = {
  item: Product;
};

const AuctionItem = ({ item }: Props) => {
  //const [isFavorite, setIsFavorite] = useState(item.isFavorite);
  const dispatch = useAppDispatch();
    const images = [image1, image2, image3, image4, image5, image6, image7];
  return (
    <div className="auction-item">
      <div
        style={{
          display: "flex",
          alignItems: "center",
          position: "relative",
        }}
      >
        <img
          src={images[item.id - 1]}
          alt="earbuds"
          width="100%"
          height="152"
          style={{ borderRadius: "4px" }}
        />
        <div
          style={{
            backgroundColor: item.isFavorite ? "red" : "white",
            borderRadius: "50%",
            height: "28px",
            width: "28px",
            position: "absolute",
            top: "8px",
            right: "8px",
            alignItems: "center",
            justifyContent: "center",
            display: "flex",
            cursor: "pointer",
          }}
          onClick={() => {
            //setIsFavorite(!isFavorite);
            dispatch(setItemAsFavorite(item.id));
        }}
        >
          <Heart
            height={16}
            color={item.isFavorite ? "white" : "black"}
            strokeWidth={2}
          />
        </div>
      </div>
      <div
        style={{
          backgroundColor: "green",
          color: "white",
          width: "fit-content",
          padding: "4px 8px",
          borderRadius: "4px",
          fontSize: "small",
        }}
      >
        Live Auction
      </div>
      <div style={{ fontWeight: "bold" }}>{item.name}</div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div>Minimum Bid</div>
        <div style={{ fontWeight: "bold" }}>${item.minBid}</div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div>Current Bid</div>
        <div style={{ fontWeight: "bold" }}>${item.currentBid}</div>
      </div>
      <div>Ends in: {new Date(item.bidEndsBy).toLocaleString()}</div>
      <Link to={`/biddings/${item.id}`}>
        <Button type={Type.secondary} width="100%">
          Bid now <NavArrowRight height={16} strokeWidth={4} />
        </Button>
      </Link>
    </div>
  );
};

export default AuctionItem;
