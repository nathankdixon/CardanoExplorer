import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

// exports a table of fungible tokens with prices, price changes and values
export default function Fts (props){

    const [totalValue, setTotalValue] = useState(0);
    const [cardanoPrice, setCardanoPrice] = useState(0);

    const [combinedRows, setCombinedRows] = useState([]);
    const [itemsToShow, setItemsToShow] = useState(30);
    const [searchTerm, setSearchTerm] = useState("");

    const router = useRouter();

    function handleSearch(event) {
      setSearchTerm(event.target.value);
    }

    const filteredRows = combinedRows.filter((row) =>
    row.props.children[1].props.children.toLowerCase().includes(searchTerm.toLowerCase())
  );

    useEffect(() => {
      const getData = async () => {
        if (props.data == null) {
          //base
        } else {
          const sortedFts = [...props.data.fts].sort((a, b) => {
            const aHasPrice = a[0].prices !== null;
            const bHasPrice = b[0].prices !== null;
          
            if (aHasPrice && bHasPrice) {
              const aValue = a[0].prices.current * a[0].quantity;
              const bValue = b[0].prices.current * b[0].quantity;
              return bValue - aValue;
            } else if (aHasPrice) {
              return -1;
            } else if (bHasPrice) {
              return 1;
            } else {
              return 0;
            }
          });
          
    
          let combinedRows = [];
          let totalPrice = 0;
    
          for (const element of sortedFts) {
            let coin = element[0];
    
            const ticker = coin.metadata?.ticker || coin.metadata?.name || coin.metadata?.[0] || Buffer.from(coin.asset_name, 'hex').toString('utf8');
            let ipfs = '';
    
            if (coin.ipfs !== null || coin.ipfs !== '') {
              ipfs = coin.ipfs;
            } else if (coin.onchain_metadata.image != null) {
              ipfs = coin.onchain_metadata.image;
            } else {
              ipfs = '/black.jpeg';
            }
    
            const priceExists = coin.prices != null;
            let price = 0;
            let value = 0;
    
            if (priceExists) {
              if (cardanoPrice !== 0) {
                price = coin.prices.current / cardanoPrice;
              }
    
              // prices are in ada
              price = (price * props.currency.value.price).toFixed(2);
              value = (price * coin.quantity).toFixed(2);
              totalPrice += (price * coin.quantity);
            }

            let hour24 = coin.prices?.change24h;
            let day7 = coin.prices?.change7d;
            let day30 = coin.prices?.change30d;
            let year1 = coin.prices?.change1y;

            if (hour24 == null) {
              hour24 = 0;
            }
            if (day7 == null) {
              day7 = 0;
            }
            if (day30 == null) {
              day30 = 0;
            }
            if (year1 == null) {
              year1 = 0;
            }
    
            combinedRows.push(
              <tr key={coin.asset_name + (priceExists ? 'priced' : 'unpriced')} onClick={() => router.push('/'+coin.policy_id+coin.asset_name)}>
                <td><Image src={ipfs} height={50} width={50} alt={coin.asset_name} quality={10}/></td>
                <td>{ticker}</td>
                <td>{coin.quantity}</td>
                <td>{priceExists ? <span className="currency">{props.currency.symbol}</span> : ''}{priceExists ? price : ''}</td>
                <td style={{ color: priceExists ? getColor(coin.prices.change24h) : '' }}>{priceExists ? `${hour24.toFixed(2)}%` : ''}</td>
                <td style={{ color: priceExists ? getColor(coin.prices.change7d) : '' }}>{priceExists ? `${day7.toFixed(2)}%` : ''}</td>
                <td style={{ color: priceExists ? getColor(coin.prices.change30d) : '' }}>{priceExists ? `${day30.toFixed(2)}%` : ''}</td>
                <td style={{ color: priceExists ? getColor(coin.prices.change1y) : '' }}>{priceExists ? `${year1.toFixed(2)}%` : ''}</td>
                <td style={{ fontWeight: priceExists ? "bold" : "" }}>{priceExists ? <span className="currency">{props.currency.symbol}</span> : ''}{priceExists ? value : ''}</td>
              </tr>
            );
          }
    
          setCombinedRows(combinedRows);
          setTotalValue(totalPrice.toFixed(2));
        }
      };
      getData();
    }, [props.data, props.currency, cardanoPrice]);
    
    

    useEffect(() => {
      getCardanoPrice();
    }, []);

      // Function to get the color based on the value
    const getColor = (value) => {
      if (value > 0) {
        return "#39d839";
      } else if (value < 0) {
        return "red";
      }
      return "black";
    };

    async function getCardanoPrice(){

      try{  
        let response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=cardano&vs_currencies=usd');
        let data = await response.json();
        setCardanoPrice(data.cardano.usd);
      }
      catch(error){
        console.log(error);
      }

    }

    function handleShowMore() {
      setItemsToShow(itemsToShow + 30);
    }
    

    return (
      <div className="fts">
        <div style={{ fontSize: "30px" }}>
          Fungible Tokens (Coins)
        </div>
        <div
          style={{
            color: "white",
            fontSize: "25px",
          }}
        >
          Total Value:<span className="currency">{props.currency.symbol}</span>
          {totalValue}
        </div>
        <input
          type="text"
          placeholder="Search by coin ticker"
          value={searchTerm}
          onChange={handleSearch}
          className="search-ft"
        />
        <table className="coins-table">
          <thead>
            <tr>
              <th>Coin</th>
              <th>Ticker</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>24hr</th>
              <th>7d</th>
              <th>30d</th>
              <th>1y</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>{filteredRows.slice(0, itemsToShow)}</tbody>
        </table>
        {itemsToShow < combinedRows.length && (
          <button onClick={handleShowMore} className="show-button">Show more</button>
        )}
      </div>
    );
  
    
}