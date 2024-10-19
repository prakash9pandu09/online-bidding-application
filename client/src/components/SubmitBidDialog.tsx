import { Dollar, Minus, NavArrowRight, Plus, Xmark } from "iconoir-react";
import React, { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import Button from "./common/Button";
import { Type } from "./common/types";

type Props = {
  showDialog: boolean;
  setShowDialog: (val: boolean) => void;
  submitBid: () => void;
  minBid: number;
  currentBid: number;
  bidPrice: number;
  setBidPrice: Dispatch<SetStateAction<number>>;
  bidEndsBy: Date | undefined;
};

const SubmitBidDialog = ({
  showDialog,
  setShowDialog,
  submitBid,
  minBid,
  currentBid,
  setBidPrice,
  bidEndsBy,
}: Props) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [straightBid, setStraightBid] = useState<number>(currentBid);
  const [maxBid, setMaxBid] = useState<number>(currentBid);
  useEffect(() => {
    if (dialogRef.current?.open && !showDialog) {
      dialogRef.current?.close();
    } else if (!dialogRef.current?.open && showDialog) {
      dialogRef.current?.showModal();
    }
  }, [showDialog]);


  useEffect(() => {
    if(currentBid >= minBid) {
        if(straightBid >= currentBid) {
            if(maxBid >= straightBid) {
                setBidPrice(maxBid);
            } else {
                setBidPrice(straightBid);
            }
        } else {
            setBidPrice(currentBid);
        }
    } else {
        setBidPrice(minBid);
    }
  }, [maxBid, straightBid])

  return (
    <dialog
      ref={dialogRef}
      style={{
        display: "flex",
        flexFlow: "column",
        gap: "20px",
        width: "32%",
        border: "none",
        borderRadius: "4px",
        boxShadow:
          "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
          <div style={{ fontSize: "larger", fontWeight: "bold" }}>
            Submit Bid
          </div>
          <div
            style={{ width: "1px", backgroundColor: "grey", height: "16px" }}
          ></div>
          <div>Soney Black Headphones</div>
        </div>
        <Xmark
          height={16}
          width={16}
          strokeWidth={2}
          onClick={() => setShowDialog(false)}
          style={{ cursor: "pointer" }}
        />
      </div>
      <div style={{ display: "flex", flexFlow: "column", gap: "4px" }}>
        <div>Straight bid</div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            position: "relative",
          }}
        >
          <input
            type="number"
            style={{
              height: "24px",
              padding: "12px 72px 8px 32px",
              border: "1px solid grey",
              borderRadius: "4px",
              width: "100%",
            }}
            value={straightBid}
            onChange={(e) => setStraightBid(parseInt(e.target.value))}
          />
          <div
            style={{
              position: "absolute",
              display: "flex",
              alignItems: "center",
              left: "8px",
            }}
          >
            <Dollar height={16} />
          </div>
          <div
            style={{
              position: "absolute",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              right: "8px",
            }}
          >
            <Minus style={{ cursor: "pointer" }} onClick={() => setStraightBid(prev => prev - 1)} />
            <Plus style={{ cursor: "pointer" }} onClick={() => setStraightBid(prev => prev + 1)} />
          </div>
        </div>
      </div>
      <div style={{ display: "flex", flexFlow: "column", gap: "4px" }}>
        <div>Maximum bid</div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            position: "relative",
          }}
        >
          <input
            type="number"
            style={{
              height: "24px",
              padding: "12px 72px 8px 32px",
              border: "1px solid grey",
              borderRadius: "4px",
              width: "100%",
            }}
            value={maxBid}
            onChange={(e) => setMaxBid(parseInt(e.target.value))}
          />
          <div
            style={{
              position: "absolute",
              display: "flex",
              alignItems: "center",
              left: "8px",
            }}
          >
            <Dollar height={16} />
          </div>
          <div
            style={{
              position: "absolute",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              right: "8px",
            }}
          >
            <Minus style={{ cursor: "pointer" }} onClick={() => setMaxBid(prev => prev - 5)} />
            <Plus style={{ cursor: "pointer" }} onClick={() => setMaxBid(prev => prev + 5)} />
          </div>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div>Minimum bid</div>
        <div style={{ fontWeight: "bold" }}>${minBid}</div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div>Current bid</div>
        <div style={{ fontWeight: "bold" }}>${currentBid}</div>
      </div>
      <div style={{ display: "flex", alignItems: "center" }}>
        <div>Ends in : </div>
        <div>{new Date(bidEndsBy!).toLocaleString()}</div>
      </div>
      <div style={{ display: "flex", justifyContent: "end" }}>
        <Button type={Type.primary} onClick={submitBid}>
          Submit <NavArrowRight height={16} width={16} />
        </Button>
      </div>
    </dialog>
  );
};

export default SubmitBidDialog;
