import { useEffect, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import {
  Heart,
  NavArrowLeft,
  NavArrowRight,
  StarSolid,
} from "iconoir-react";
import Button from "./common/Button";
import { Type } from "./common/types";
import SubmitBidDialog from "./SubmitBidDialog";
import { useAppDispatch, useAppSelector } from "./common/hooks";
import image1 from "../assets/1.jpg";
import image2 from "../assets/2.jpg";
import image3 from "../assets/3.jpg";
import image4 from "../assets/4.jpg";
import image5 from "../assets/5.jpg";
import image6 from "../assets/6.jpg";
import image7 from "../assets/7.jpg";
import { getBiddingItemById, getBids, placeBid, setCurrentBidPrice, setItemAsFavorite, updateCurrentItem } from "./store/biddingsSlice";
import { socket } from "../App";

const Biddings = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const {isLoggedIn, user}  = useAppSelector(state => state.user); 
  const { bids, currentItem: item} = useAppSelector(state => state.bidding);
  const [showDialog, setShowDialog] = useState(false);
  const images = [image1, image2, image3, image4, image5, image6, image7];
  const [bidPrice, setBidPrice] = useState(item?.currentBid!);

  const delay = (ms: number) => {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  };
  const submitBid = async () => {
    dispatch(setCurrentBidPrice({id: item?.id, bidPrice}));
    dispatch(placeBid({bidPrice, productId: item?.id!, email: user.email}));
    setShowDialog(false);
    await delay(1000);
    socket.emit('placeBid', ({type: 'NewBid', bidPrice}));
  };

  useEffect(() => {
    id && dispatch(getBiddingItemById(parseInt(id!)));
    id && dispatch(getBids(parseInt(id!)));
  }, [id]);

  useEffect(() => {
    socket.on('placeBid', async (message) => {
        if(message.type === "NewBid") {
            id && await dispatch(getBids(parseInt(id!)));
            id && await dispatch(getBiddingItemById(parseInt(id!)));
            id && dispatch(setCurrentBidPrice({id: parseInt(id!), bidPrice: message?.bidPrice}));
        }
    });
    //return () => {
    //    socket.disconnect();
    //}
  }, []);

 if(!isLoggedIn) return <Navigate to='/login' />;

  return isLoggedIn && item && (
    <div style={{ padding: "16px 80px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          gap: "32px",
          padding: "20px 0px",
        }}
      >
        <div style={{ display: "flex", gap: "12px", flexFlow: "column" }}>
          <Link to="/auctions">
            <div
              style={{
                display: "flex",
                gap: "12px",
                alignItems: "center",
                cursor: "pointer",
              }}
            >
              <span style={{ backgroundColor: "dodgerblue", display: "flex" }}>
                <NavArrowLeft
                  color="white"
                  strokeWidth={2}
                  height={16}
                  width={16}
                />
              </span>
              <span
                style={{
                  color: "dodgerblue",
                  fontWeight: "bold",
                  fontSize: "small",
                }}
              >
                Back to catalog
              </span>
            </div>
          </Link>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              position: "relative",
              marginTop: "12px",
            }}
          >
            <img
              src={images[item?.id! - 1]}
              alt="earbuds"
              width="220"
              height="152"
              style={{ borderRadius: "4px" }}
            />
            <div
              style={{
                backgroundColor: item?.isFavorite ? "red" : "white",
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
              onClick={() => dispatch(setItemAsFavorite(item?.id))}
            >
              <Heart
                height={16}
                color={item?.isFavorite ? "white" : "black"}
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
          <div style={{ fontWeight: "bold" }}>{item?.name}</div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div>Minimum Bid</div>
            <div style={{ fontWeight: "bold" }}>${item?.minBid}</div>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div>Current Bid</div>
            <div style={{ fontWeight: "bold" }}>${item?.currentBid}</div>
          </div>
          <div>Ends in: {new Date(item?.bidEndsBy!).toLocaleString()}</div>
        </div>
        <div style={{ display: "flex", flexFlow: "column", gap: "12px" }}>
          <div style={{ fontWeight: "bold" }}>Description</div>
          <div>{item?.description}</div>
          <div style={{ fontWeight: "bold" }}>Reviews</div>
          <div style={{ display: "flex", flexFlow: "column", gap: "24px" }}>
            {item?.reviews?.map((review, index) => (
              <div
                style={{
                  display: "flex",
                  gap: "12px",
                  borderBottom:
                    item.reviews?.length! > index + 1
                      ? "1px solid #e0e0e0"
                      : "",
                  paddingBottom: "20px",
                }}
                key={review.reviewerId}
              >
                <img
                  src={images[review.reviewerId]}
                  alt="reviewerphoto"
                  style={{ height: "40px", width: "40px", borderRadius: "50%" }}
                />
                <div
                  style={{ display: "flex", gap: "20px", flexFlow: "column" }}
                >
                  <div>
                    {Array.from({ length: 5 }, (_, i) =>
                      review.reviewerRating > i ? (
                        <StarSolid key={i} color="orange" height={20} />
                      ) : (
                        <StarSolid key={i} color="#e0e0e0" height={20} />
                      )
                    )}
                  </div>
                  <div>{review.reviewercomments}</div>
                  <div
                    style={{ display: "flex", flexFlow: "column", gap: "4px" }}
                  >
                    <span style={{ fontWeight: "bold", fontSize: "small" }}>
                      {review.reviewerName}
                    </span>
                    <span style={{ color: "grey", fontSize: "small" }}>
                      {new Date(review.reviewedDate).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ display: "flex", flexFlow: "column", gap: "24px", paddingTop: "32px" }}>
          {bids.length > 0 && <ul
            style={{
              display: "flex",
              flexFlow: "column",
              margin: "0",
              padding: "0",
              gap: "12px",
              width: "200px",
            }}
          >
            {bids.map((bid, i) => (
              <li
                key={i}
                style={{
                  display: "flex",
                  gap: "8px",
                  fontWeight: i === 0 ? "bold" : "normal",
                  alignItems: 'center'
                }}
              >
                <span style={{height: '4px', width: '4px', backgroundColor: 'black', borderRadius: '50%'}}></span>
                <span>{i === 0 && user.firstName === bid.user ? `Your bid is $${bid.bidPrice}` : `${bid.user} bids $${bid.bidPrice}`}</span>
              </li>
            ))}
          </ul>}
          <Button
            type={Type.primary}
            width="200px"
            onClick={() => setShowDialog(true)}
          >
            Bid now <NavArrowRight height={16} strokeWidth={4} />
          </Button>
        </div>
      </div>
      {showDialog && (
        <SubmitBidDialog
          showDialog={showDialog}
          setShowDialog={setShowDialog}
          submitBid={submitBid}
          minBid={item?.minBid!}
          currentBid={item?.currentBid!}
          bidPrice={bidPrice}
          setBidPrice={setBidPrice}
          bidEndsBy={item?.bidEndsBy}
        />
      )}
    </div>
  );
};

export default Biddings;
