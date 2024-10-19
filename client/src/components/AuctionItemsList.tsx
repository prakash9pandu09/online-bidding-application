import AuctionItem from './AuctionItem';
import { useAppSelector } from './common/hooks';

const AuctionItemsList = () => {
const {biddingItems} = useAppSelector(state => state.bidding);
  return (
    <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
        {biddingItems.map((item) => (
        <AuctionItem item={item} key={item.id} />
        ))}
    </div>
  )
}

export default AuctionItemsList